import os
import time # Optional: for slight delay if needed during testing
from django.http import StreamingHttpResponse, JsonResponse, HttpResponseBadRequest
from rest_framework import viewsets, filters
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from anthropic import Anthropic, APIError
from django.conf import settings
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import (
    DataSerializer, RepositorySerializer, ContributorSerializer,
    ContributorDetailSerializer, ProductivityMetricsSerializer,
    TeamCollaborationSerializer, MockCalendarDataSerializer
)

try:
    client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
except Exception as e:
    print(f"Error initializing Anthropic client: {e}")
    client = None # Set client to None if initialization fails


# --- Simple Test View ---
@api_view(['GET'])
def get_data(request):
    """
    A simple endpoint to return the data.
    """
    data = DataSerializer()
    data = data.to_representation(data)
    return Response(data)


# --- LLM Streaming View ---

def generate_claude_stream(system_prompt, user_prompt):
    """
    Generator function to stream responses from Claude API.
    Yields chunks of text content.
    """
    if not client:
        yield "Error: Claude client not initialized. Check API key."
        return
    if not system_prompt or not user_prompt:
        yield "Error: No prompt provided."
        return

    try:
        with client.messages.stream(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}],
        ) as stream:
            for text in stream.text_stream:
                yield text

    except APIError as e:
        print(f"Claude API Error: {e}")
        yield f"\n\nError communicating with Claude: {str(e)}"
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        yield f"\n\nAn unexpected error occurred: {str(e)}"

def get_system_prompt():
    return """
    You are a helpful assistant that helps engineers, product managers and managers understand a codebase of multiple repositories.
    You will be given a list of repositiories with a description, as well as a list of contributors with their contributions.
    You will be asked to answer questions about the codebase, and you should find which contributor(s) are the most relevant to answer the question.
    Each contributor has a unique id that you will use to refer to them.
    Your answer should be markdown formatted, explain your reasoning and mention the contributor(s) you are referring to.
    When mentionning a contributor, use the format: <contributor id="id">contributor name</contributor>.
    For example: <contributor id="1">John Doe</contributor>. Do not start the tags with `.
    """


def get_user_prompt(user_question):
    """
    Formats repository and contributor data along with the user question
    into a structured prompt for the LLM.
    """
    data = DataSerializer()
    data = data.to_representation(data)
    repositories_data = data.get('repositories', [])
    contributors_data = data.get('contributors', [])

    # Create a lookup for repository names by ID for easy access later
    repo_id_to_name = {repo['id']: repo['name'] for repo in repositories_data}

    prompt_parts = []

    # --- Repositories Section ---
    prompt_parts.append("## Repositories\n")
    if repositories_data:
        for repo in repositories_data:
            prompt_parts.append(f"### Repository: {repo.get('name', 'N/A')} (ID: {repo.get('id', 'N/A')})")
            prompt_parts.append(f"**URL:** {repo.get('url', 'N/A')}")
            prompt_parts.append(f"**Summary:**\n{repo.get('summary', 'No summary provided.')}\n")
    else:
        prompt_parts.append("No repository data available.\n")

    prompt_parts.append("\n----------\n") # Separator

    # --- Contributors Section ---
    prompt_parts.append("## Contributors\n")
    if contributors_data:
        for contributor in contributors_data:
            prompt_parts.append(f"### Contributor: {contributor.get('username', 'N/A')} (ID: {contributor.get('id', 'N/A')})")
            prompt_parts.append(f"**URL:** {contributor.get('url', 'N/A')}")
            prompt_parts.append(f"**Overall Summary:**\n{contributor.get('summary', 'No summary provided.')}\n")

            works = contributor.get('works', [])
            if works:
                prompt_parts.append("**Contributions by Repository:**")
                for work in works:
                    repo_id = work.get('repository')
                    repo_name = repo_id_to_name.get(repo_id, f"Unknown Repo (ID: {repo_id})")
                    prompt_parts.append(f"- **Repository:** {repo_name}")
                    prompt_parts.append(f"  - **Work Summary:** {work.get('summary', 'No summary provided.')}")
                    # Optionally add Issue/Commit summaries if needed and available
                    issues = work.get('issues', [])
                    commits = work.get('commits', [])
                    if issues: 
                        prompt_parts.append("    - Relevant Issues:")
                        for issue in issues: # Limit for brevity
                            prompt_parts.append(f"      - {issue.get('summary', 'N/A')}")
                    if commits:
                        prompt_parts.append("    - Relevant Commits:")
                        for commit in commits: # Limit for brevity
                            prompt_parts.append(f"      - {commit.get('summary', 'N/A')}")
                prompt_parts.append("") # Add a newline after each contributor's works
            else:
                prompt_parts.append("No specific repository contributions listed.\n")
            prompt_parts.append("\n---\n") # Separator between contributors

    else:
        prompt_parts.append("No contributor data available.\n")

    prompt_parts.append("\n----------\n") # Separator

    # --- User Question Section ---
    prompt_parts.append("## User Question\n")
    prompt_parts.append(user_question)

    return "\n".join(prompt_parts)



@api_view(['POST'])
def llm_stream_view(request):
    """
    Handles POST requests containing a 'prompt' and returns a StreamingHttpResponse
    with the Claude completion stream.
    """
    user_question = request.data.get('prompt')

    if not user_question:
        return HttpResponseBadRequest("Missing 'prompt' in request body.")

    if not client:
         return JsonResponse({"error": "Claude client not configured"}, status=503) # 503 Service Unavailable

    system_prompt = get_system_prompt()

    user_prompt = get_user_prompt(user_question)

    print(f"System Prompt: {system_prompt}")
    print(f"User Prompt: {user_prompt}")

    try:
        # Create the generator
        stream_generator = generate_claude_stream(system_prompt, user_prompt)


        response = StreamingHttpResponse(
            stream_generator,
            content_type='text/plain; charset=utf-8' # Simpler for basic fetch handling
        )
        return response

    except Exception as e:
        # Catch potential errors during generator setup (though most are handled inside)
        print(f"Error setting up stream view: {e}")
        return JsonResponse({"error": f"Failed to start stream: {str(e)}"}, status=500)


# --- REST API ViewSets ---

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class RepositoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for listing and retrieving repositories.

    GET /api/repositories/ - List all repositories
    GET /api/repositories/:id/ - Retrieve repository detail
    """
    queryset = Repository.objects.all().order_by('-created_at')
    serializer_class = RepositorySerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'summary']
    ordering_fields = ['name', 'created_at']


class ContributorViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for listing and retrieving contributors.

    GET /api/contributors/ - List all contributors
    GET /api/contributors/:id/ - Retrieve contributor detail with productivity metrics
    """
    queryset = Contributor.objects.all().select_related('productivity').prefetch_related('works').order_by('-created_at')
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['username', 'summary']
    ordering_fields = ['username', 'created_at']

    def get_serializer_class(self):
        """Use detailed serializer for detail view"""
        if self.action == 'retrieve':
            return ContributorDetailSerializer
        return ContributorSerializer


@api_view(['GET'])
def productivity_detail(request, contributor_id):
    """
    Get productivity metrics for a specific contributor.

    GET /api/productivity/:id/

    Returns:
        - Productivity metrics
        - Calendar events (last 4 weeks)
        - Weekly aggregated data
    """
    contributor = get_object_or_404(Contributor, id=contributor_id)

    try:
        productivity = ProductivityMetrics.objects.get(contributor=contributor)
        calendar_events = MockCalendarData.objects.filter(contributor=contributor).order_by('-date')[:28]

        data = {
            'metrics': ProductivityMetricsSerializer(productivity).data,
            'calendar_events': MockCalendarDataSerializer(calendar_events, many=True).data,
            'contributor': {
                'id': contributor.id,
                'username': contributor.username,
                'url': contributor.url,
            }
        }
        return Response(data)
    except ProductivityMetrics.DoesNotExist:
        return Response({
            'error': 'Productivity metrics not found for this contributor',
            'contributor': {
                'id': contributor.id,
                'username': contributor.username,
            }
        }, status=404)


@api_view(['GET'])
def collaboration_graph(request):
    """
    Get collaboration network data for visualization.

    GET /api/collaboration/graph/

    Returns:
        {
            'nodes': [{'id': 1, 'username': 'user1', ...}],
            'edges': [{'from': 1, 'to': 2, 'weight': 12, ...}]
        }
    """
    # Get all contributors as nodes
    contributors = Contributor.objects.all()
    nodes = [
        {
            'id': c.id,
            'username': c.username,
            'avatar_url': c.avatar_url,
            'url': c.url,
        }
        for c in contributors
    ]

    # Get all collaborations as edges
    collaborations = TeamCollaboration.objects.all().select_related('contributor_a', 'contributor_b')
    edges = [
        {
            'from': collab.contributor_a.id,
            'to': collab.contributor_b.id,
            'weight': collab.interaction_count,
            'interaction_type': collab.interaction_type,
        }
        for collab in collaborations
    ]

    return Response({
        'nodes': nodes,
        'edges': edges,
        'total_nodes': len(nodes),
        'total_edges': len(edges),
    })


@api_view(['POST'])
def project_match(request):
    """
    AI-powered project-to-developer matching.

    POST /api/project-match/
    Body: { "project_description": "string", "required_skills": ["Python", "Django"], "max_results": 5 }

    Returns:
        [
            {
                'contributor': {...},
                'fit_score': 0.95,
                'reasoning': 'AI-generated explanation',
                'skills_match': ['Python', 'Django']
            }
        ]
    """
    project_description = request.data.get('project_description', '')
    required_skills = request.data.get('required_skills', [])
    max_results = request.data.get('max_results', 5)

    if not project_description:
        return Response({'error': 'project_description is required'}, status=400)

    # For now, return a simple match based on summary keywords
    # In production, this would use Claude API for intelligent matching
    contributors = Contributor.objects.all().select_related('productivity')

    # Simple keyword matching (can be enhanced with Claude API)
    matches = []
    for contributor in contributors:
        summary_lower = contributor.summary.lower()
        desc_lower = project_description.lower()

        # Calculate simple relevance score
        score = 0
        for skill in required_skills:
            if skill.lower() in summary_lower:
                score += 0.3

        # Check for keyword overlap
        desc_words = set(desc_lower.split())
        summary_words = set(summary_lower.split())
        overlap = len(desc_words & summary_words)
        score += min(overlap * 0.05, 0.4)

        if score > 0:
            matches.append({
                'contributor': ContributorSerializer(contributor).data,
                'fit_score': min(score, 1.0),
                'reasoning': f'Matches {int(score*100)}% based on skills and expertise',
                'skills_match': [s for s in required_skills if s.lower() in summary_lower]
            })

    # Sort by fit score and limit results
    matches.sort(key=lambda x: x['fit_score'], reverse=True)
    matches = matches[:max_results]

    return Response({
        'matches': matches,
        'total_matches': len(matches),
        'project_description': project_description,
        'required_skills': required_skills,
    })