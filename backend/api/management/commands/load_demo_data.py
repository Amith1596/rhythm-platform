from django.core.management.base import BaseCommand
from django.db import transaction
from api.models import (
    Repository, Contributor, RepositoryWork, Commit, Issue,
    ProductivityMetrics, TeamCollaboration, MockCalendarData
)
from datetime import datetime, timedelta, date
import random

class Command(BaseCommand):
    help = 'Load demo data using FastAPI repository as example'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Clearing existing data...'))

        with transaction.atomic():
            # Clear all existing data
            MockCalendarData.objects.all().delete()
            TeamCollaboration.objects.all().delete()
            ProductivityMetrics.objects.all().delete()
            Commit.objects.all().delete()
            Issue.objects.all().delete()
            RepositoryWork.objects.all().delete()
            Contributor.objects.all().delete()
            Repository.objects.all().delete()

            self.stdout.write(self.style.SUCCESS('✓ Cleared existing data'))

            # Create FastAPI repository
            repo = Repository.objects.create(
                name='fastapi/fastapi',
                url='https://github.com/fastapi/fastapi',
                avatar_url='https://avatars.githubusercontent.com/u/65574339',
                summary='FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. Core contributors work on async patterns, type safety, validation, documentation, and developer experience.'
            )
            self.stdout.write(self.style.SUCCESS(f'✓ Created repository: {repo.name}'))

            # Create 7 core FastAPI contributors
            contributors_data = [
                {
                    'username': 'tiangolo',
                    'name': 'Sebastián Ramírez',
                    'role': 'Creator & Maintainer',
                    'expertise': 'Creator of FastAPI. Expert in Python async, web frameworks, API design, and developer experience.',
                    'commits': 450,
                    'focus_hours': 28.5,
                    'meeting_load': 15.0,
                    'flow_index': 92,
                    'burnout_risk': 'low',
                    'work_style': 'Deep Work',
                },
                {
                    'username': 'dmontagu',
                    'name': 'David Montagu',
                    'role': 'Core Contributor',
                    'expertise': 'Pydantic integration, type safety, validation, and schema generation.',
                    'commits': 280,
                    'focus_hours': 25.0,
                    'meeting_load': 20.0,
                    'flow_index': 88,
                    'burnout_risk': 'low',
                    'work_style': 'Collaborative',
                },
                {
                    'username': 'Kludex',
                    'name': 'Marcelo Trylesinski',
                    'role': 'Core Contributor',
                    'expertise': 'ASGI servers, Starlette integration, performance optimization, and async patterns.',
                    'commits': 195,
                    'focus_hours': 22.0,
                    'meeting_load': 25.0,
                    'flow_index': 85,
                    'burnout_risk': 'medium',
                    'work_style': 'Balanced',
                },
                {
                    'username': 'euri10',
                    'name': 'Euri Rodriguez',
                    'role': 'Documentation Lead',
                    'expertise': 'Documentation, examples, tutorials, and community support.',
                    'commits': 160,
                    'focus_hours': 20.0,
                    'meeting_load': 30.0,
                    'flow_index': 78,
                    'burnout_risk': 'low',
                    'work_style': 'Collaborative',
                },
                {
                    'username': 'tokusumi',
                    'name': 'Yuki Okushi',
                    'role': 'Testing & QA',
                    'expertise': 'Testing frameworks, CI/CD pipelines, and quality assurance.',
                    'commits': 142,
                    'focus_hours': 24.5,
                    'meeting_load': 18.0,
                    'flow_index': 82,
                    'burnout_risk': 'low',
                    'work_style': 'Deep Work',
                },
                {
                    'username': 'aminalaee',
                    'name': 'Amin Alaee',
                    'role': 'Security Contributor',
                    'expertise': 'Security features, OAuth2, JWT authentication, and middleware.',
                    'commits': 118,
                    'focus_hours': 19.5,
                    'meeting_load': 35.0,
                    'flow_index': 72,
                    'burnout_risk': 'medium',
                    'work_style': 'Balanced',
                },
                {
                    'username': 'adriangb',
                    'name': 'Adrian Garcia',
                    'role': 'Core Contributor',
                    'expertise': 'Dependency injection, background tasks, WebSocket support.',
                    'commits': 105,
                    'focus_hours': 18.0,
                    'meeting_load': 40.0,
                    'flow_index': 68,
                    'burnout_risk': 'high',
                    'work_style': 'Meeting-Heavy',
                },
            ]

            contributors = []
            for idx, data in enumerate(contributors_data, start=1):
                # Create contributor
                contributor = Contributor.objects.create(
                    username=data['username'],
                    url=f'https://github.com/{data["username"]}',
                    avatar_url=f'https://avatars.githubusercontent.com/u/{1000000 + idx}',
                    summary=f'{data["name"]} - {data["role"]}. {data["expertise"]}'
                )

                # Create repository work
                work = RepositoryWork.objects.create(
                    contributor=contributor,
                    repository=repo,
                    summary=f'{data["role"]} - {data["commits"]} commits. {data["expertise"][:100]}'
                )

                # Create sample commits
                for i in range(min(5, data['commits'])):
                    Commit.objects.create(
                        work=work,
                        url=f'https://github.com/fastapi/fastapi/commit/abc{idx}{i}{"0"*35}',
                        raw_data={'sha': f'abc{idx}{i}{"0"*35}', 'message': self._get_commit_message(i)},
                        summary=self._get_commit_message(i)
                    )

                # Create sample issues
                for i in range(3):
                    Issue.objects.create(
                        work=work,
                        url=f'https://github.com/fastapi/fastapi/issues/{1000 + idx * 10 + i}',
                        raw_data={'number': 1000 + idx * 10 + i, 'title': self._get_issue_title(i)},
                        summary=f'{self._get_issue_title(i)} - Resolved'
                    )

                # Create productivity metrics
                ProductivityMetrics.objects.create(
                    contributor=contributor,
                    focus_hours=data['focus_hours'],
                    meeting_load=data['meeting_load'],
                    flow_index=data['flow_index'],
                    burnout_risk=data['burnout_risk'],
                    work_style=data['work_style'],
                    well_being_score=random.randint(65, 95),
                    productivity_peak='Wednesday mornings' if random.random() > 0.5 else 'Thursday afternoons'
                )

                # Create calendar data (weekly pattern)
                self._create_calendar_data(contributor)

                contributors.append(contributor)
                self.stdout.write(self.style.SUCCESS(f'✓ Created contributor: {contributor.summary.split(" - ")[0]} (@{contributor.username})'))

            # Create collaboration relationships
            self._create_collaborations(contributors)

            self.stdout.write(self.style.SUCCESS('\n' + '='*60))
            self.stdout.write(self.style.SUCCESS('✓ Demo data loaded successfully!'))
            self.stdout.write(self.style.SUCCESS(f'  Repository: {repo.name}'))
            self.stdout.write(self.style.SUCCESS(f'  Contributors: {len(contributors)}'))
            self.stdout.write(self.style.SUCCESS(f'  Total Commits: {Commit.objects.count()}'))
            self.stdout.write(self.style.SUCCESS(f'  Total Issues: {Issue.objects.count()}'))
            self.stdout.write(self.style.SUCCESS(f'  Collaborations: {TeamCollaboration.objects.count()}'))
            self.stdout.write(self.style.SUCCESS(f'  Calendar Events: {MockCalendarData.objects.count()}'))
            self.stdout.write(self.style.SUCCESS('='*60))

    def _get_commit_message(self, idx):
        messages = [
            'Add new endpoint for async data processing',
            'Fix: Resolve type hints in dependency injection',
            'Docs: Update API documentation with examples',
            'Refactor: Improve error handling middleware',
            'Feat: Add support for WebSocket compression',
        ]
        return messages[idx % len(messages)]

    def _get_issue_title(self, idx):
        titles = [
            'Add support for custom response models',
            'Improve OAuth2 token validation',
            'Document best practices for background tasks',
        ]
        return titles[idx % len(titles)]

    def _create_calendar_data(self, contributor):
        """Create realistic weekly calendar pattern"""
        base_date = date.today() - timedelta(days=30)

        # Typical work week pattern
        for day in range(30):
            current_date = base_date + timedelta(days=day)
            weekday = current_date.weekday()

            if weekday < 5:  # Monday-Friday
                # Morning focus block
                MockCalendarData.objects.create(
                    contributor=contributor,
                    date=current_date,
                    event_type='focus',
                    duration_hours=3.0,
                    title='Deep Work - Coding'
                )

                # Afternoon meetings (some days)
                if random.random() > 0.4:
                    MockCalendarData.objects.create(
                        contributor=contributor,
                        date=current_date,
                        event_type='meeting',
                        duration_hours=1.0,
                        title='Team Sync' if weekday == 1 else 'Code Review'
                    )

                # Late afternoon focus
                if random.random() > 0.3:
                    MockCalendarData.objects.create(
                        contributor=contributor,
                        date=current_date,
                        event_type='focus',
                        duration_hours=2.0,
                        title='Documentation & Review'
                    )

    def _create_collaborations(self, contributors):
        """Create realistic collaboration patterns"""
        # Creator collaborates with everyone
        tiangolo = contributors[0]
        for contributor in contributors[1:]:
            TeamCollaboration.objects.create(
                contributor_a=tiangolo,
                contributor_b=contributor,
                interaction_type='pr_review',
                interaction_count=random.randint(20, 50),
                last_interaction=datetime.now() - timedelta(days=random.randint(1, 30))
            )

        # Security expert works closely with core contributors
        aminalaee = contributors[5]
        for contributor in contributors[1:4]:
            if contributor != aminalaee:
                TeamCollaboration.objects.create(
                    contributor_a=aminalaee,
                    contributor_b=contributor,
                    interaction_type='pr_review',
                    interaction_count=random.randint(15, 30),
                    last_interaction=datetime.now() - timedelta(days=random.randint(1, 20))
                )

        # Documentation lead works with everyone on docs
        euri10 = contributors[3]
        for contributor in [contributors[1], contributors[4], contributors[6]]:
            TeamCollaboration.objects.create(
                contributor_a=euri10,
                contributor_b=contributor,
                interaction_type='issue_mention',
                interaction_count=random.randint(10, 25),
                last_interaction=datetime.now() - timedelta(days=random.randint(1, 15))
            )
