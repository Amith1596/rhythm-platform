from rest_framework import serializers
from .models import (
    Repository, Issue, Commit, RepositoryWork, Contributor,
    ProductivityMetrics, TeamCollaboration, MockCalendarData
)

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'

class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = '__all__'

class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = '__all__'

class RepositoryWorkSerializer(serializers.ModelSerializer):
    issues = IssueSerializer(many=True, read_only=True)
    commits = CommitSerializer(many=True, read_only=True)

    class Meta:
        model = RepositoryWork
        fields = '__all__'

class ContributorSerializer(serializers.ModelSerializer):
    works = RepositoryWorkSerializer(many=True, read_only=True)

    class Meta:
        model = Contributor
        fields = '__all__'

class ProductivityMetricsSerializer(serializers.ModelSerializer):
    contributor_username = serializers.CharField(source='contributor.username', read_only=True)

    class Meta:
        model = ProductivityMetrics
        fields = '__all__'

class TeamCollaborationSerializer(serializers.ModelSerializer):
    contributor_a_username = serializers.CharField(source='contributor_a.username', read_only=True)
    contributor_b_username = serializers.CharField(source='contributor_b.username', read_only=True)

    class Meta:
        model = TeamCollaboration
        fields = '__all__'

class MockCalendarDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockCalendarData
        fields = '__all__'

class ContributorDetailSerializer(serializers.ModelSerializer):
    """Extended contributor serializer with productivity metrics"""
    works = RepositoryWorkSerializer(many=True, read_only=True)
    productivity = ProductivityMetricsSerializer(read_only=True)

    class Meta:
        model = Contributor
        fields = '__all__'

class DataSerializer(serializers.Serializer):
    repositories = RepositorySerializer(many=True, read_only=True)
    contributors = ContributorSerializer(many=True, read_only=True)

    def to_representation(self, instance):
        # Assuming 'instance' is not a single object but a way to access all data.
        # This serializer might need to be used differently, perhaps in a view
        # where you explicitly pass the querysets.
        return {
            'repositories': RepositorySerializer(Repository.objects.all(), many=True).data,
            'contributors': ContributorSerializer(Contributor.objects.all(), many=True).data
        }

    # If this serializer is meant to serialize a specific object that holds
    # references to all repositories and contributors, the implementation
    # would need to change based on that object's structure.
    # For now, it assumes it will be instantiated without an instance and
    # will fetch all data directly.