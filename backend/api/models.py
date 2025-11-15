from django.db import models

# Create your models here.


class Repository(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    avatar_url = models.URLField()
    url = models.URLField()
    summary = models.TextField()
    raw_data = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

    
class Contributor(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    url = models.URLField()
    avatar_url = models.URLField()
    summary = models.TextField()    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

class RepositoryWork(models.Model):
    id = models.AutoField(primary_key=True)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    contributor = models.ForeignKey(Contributor, on_delete=models.CASCADE, related_name='works')
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.contributor.username} - {self.repository.name}"
    
class Issue(models.Model):
    id = models.AutoField(primary_key=True)
    work = models.ForeignKey(RepositoryWork, on_delete=models.CASCADE, related_name='issues')
    url = models.URLField()
    raw_data = models.JSONField()
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Commit(models.Model):
    id = models.AutoField(primary_key=True)
    work = models.ForeignKey(RepositoryWork, on_delete=models.CASCADE, related_name='commits')
    url = models.URLField()
    raw_data = models.JSONField()
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ProductivityMetrics(models.Model):
    """Track developer productivity and well-being metrics"""
    id = models.AutoField(primary_key=True)
    contributor = models.OneToOneField(Contributor, on_delete=models.CASCADE, related_name='productivity')
    focus_hours = models.FloatField(default=0.0, help_text="Average weekly focus hours")
    meeting_load = models.FloatField(default=0.0, help_text="Percentage of time in meetings")
    flow_index = models.IntegerField(default=0, help_text="Flow state productivity score (0-100)")
    productivity_peak = models.CharField(max_length=100, blank=True, null=True, help_text="Best productivity time (e.g., 'Wednesday mornings')")
    work_style = models.CharField(max_length=50, blank=True, null=True, help_text="Maker vs Manager schedule")
    well_being_score = models.IntegerField(default=70, help_text="Overall well-being score (0-100)")
    burnout_risk = models.CharField(max_length=20, default='low', choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High')
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Productivity Metrics"

    def __str__(self):
        return f"{self.contributor.username} - Productivity"


class TeamCollaboration(models.Model):
    """Track collaboration patterns between contributors"""
    id = models.AutoField(primary_key=True)
    contributor_a = models.ForeignKey(Contributor, on_delete=models.CASCADE, related_name='collaborations_from')
    contributor_b = models.ForeignKey(Contributor, on_delete=models.CASCADE, related_name='collaborations_to')
    interaction_count = models.IntegerField(default=0, help_text="Number of interactions")
    interaction_type = models.CharField(max_length=50, help_text="Type of interaction (pr_review, issue_mention, etc.)")
    last_interaction = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['contributor_a', 'contributor_b', 'interaction_type']
        verbose_name_plural = "Team Collaborations"

    def __str__(self):
        return f"{self.contributor_a.username} <-> {self.contributor_b.username} ({self.interaction_type})"


class MockCalendarData(models.Model):
    """Mock calendar/meeting data for productivity analytics"""
    id = models.AutoField(primary_key=True)
    contributor = models.ForeignKey(Contributor, on_delete=models.CASCADE, related_name='calendar_events')
    date = models.DateField()
    event_type = models.CharField(max_length=50, choices=[
        ('meeting', 'Meeting'),
        ('focus', 'Focus Time'),
        ('break', 'Break')
    ])
    duration_hours = models.FloatField(help_text="Duration in hours")
    title = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Mock Calendar Data"
        ordering = ['-date']

    def __str__(self):
        return f"{self.contributor.username} - {self.event_type} on {self.date}"
