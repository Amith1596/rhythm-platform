from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router for ViewSets
router = DefaultRouter()
router.register(r'repositories', views.RepositoryViewSet, basename='repository')
router.register(r'contributors', views.ContributorViewSet, basename='contributor')

urlpatterns = [
    # ViewSet routes (auto-generates list and detail endpoints)
    path('', include(router.urls)),

    # Custom endpoints
    path('productivity/<int:contributor_id>/', views.productivity_detail, name='productivity-detail'),
    path('collaboration/graph/', views.collaboration_graph, name='collaboration-graph'),
    path('project-match/', views.project_match, name='project-match'),
    path('claude-chat/', views.llm_stream_view, name='claude-chat'),

    # Legacy endpoint (for backwards compatibility)
    path('get_data/', views.get_data, name='get_data'),
]
