import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from api.models import Contributor, ProductivityMetrics, TeamCollaboration, MockCalendarData, RepositoryWork


class Command(BaseCommand):
    help = 'Generate mock productivity and collaboration data for existing contributors'

    def handle(self, *args, **kwargs):
        self.stdout.write('Generating mock productivity data...')

        contributors = Contributor.objects.all()

        if not contributors.exists():
            self.stdout.write(self.style.ERROR('No contributors found. Please run fetch.py first.'))
            return

        # Generate ProductivityMetrics
        self.stdout.write(f'Creating productivity metrics for {contributors.count()} contributors...')
        for contributor in contributors:
            # Skip if already has productivity data
            if hasattr(contributor, 'productivity'):
                self.stdout.write(f'  Skipping {contributor.username} - already has productivity data')
                continue

            # Generate realistic productivity metrics
            focus_hours = round(random.uniform(15, 35), 1)  # 15-35 hours per week
            meeting_load = round(random.uniform(15, 45), 1)  # 15-45% of time
            flow_index = random.randint(60, 95)  # 60-95 flow score

            productivity_peaks = [
                'Monday mornings', 'Tuesday afternoons', 'Wednesday mornings',
                'Thursday mornings', 'Friday afternoons'
            ]

            work_styles = ['Maker Schedule', 'Manager Schedule', 'Hybrid']
            burnout_risks = ['low', 'low', 'low', 'medium', 'high']  # weighted towards low

            ProductivityMetrics.objects.create(
                contributor=contributor,
                focus_hours=focus_hours,
                meeting_load=meeting_load,
                flow_index=flow_index,
                productivity_peak=random.choice(productivity_peaks),
                work_style=random.choice(work_styles),
                well_being_score=random.randint(65, 90),
                burnout_risk=random.choice(burnout_risks)
            )
            self.stdout.write(f'  Created productivity metrics for {contributor.username}')

        # Generate TeamCollaboration from PR reviews and issue mentions
        self.stdout.write('\nGenerating team collaboration data from repository work...')

        # Clear existing collaboration data to avoid duplicates
        TeamCollaboration.objects.all().delete()

        # Analyze RepositoryWork to find collaboration patterns
        for work in RepositoryWork.objects.select_related('contributor', 'repository').all():
            # Get other contributors in the same repository
            other_works = RepositoryWork.objects.filter(
                repository=work.repository
            ).exclude(contributor=work.contributor).select_related('contributor')

            for other_work in other_works:
                # Create collaboration between these two contributors
                # Simulate PR reviews and issue discussions
                interaction_types = ['pr_review', 'issue_mention', 'code_review']

                for interaction_type in interaction_types:
                    interaction_count = random.randint(1, 15)

                    # Ensure consistent ordering (a, b) where a.id < b.id
                    if work.contributor.id < other_work.contributor.id:
                        contributor_a = work.contributor
                        contributor_b = other_work.contributor
                    else:
                        contributor_a = other_work.contributor
                        contributor_b = work.contributor

                    TeamCollaboration.objects.get_or_create(
                        contributor_a=contributor_a,
                        contributor_b=contributor_b,
                        interaction_type=interaction_type,
                        defaults={
                            'interaction_count': interaction_count,
                            'last_interaction': datetime.now() - timedelta(days=random.randint(1, 30))
                        }
                    )

        collaboration_count = TeamCollaboration.objects.count()
        self.stdout.write(f'Created {collaboration_count} collaboration relationships')

        # Generate Mock Calendar Data for past 4 weeks
        self.stdout.write('\nGenerating mock calendar data for past 4 weeks...')

        # Clear existing calendar data
        MockCalendarData.objects.all().delete()

        for contributor in contributors:
            # Generate 4 weeks of calendar data
            for week in range(4):
                for day in range(5):  # Mon-Fri
                    date = datetime.now().date() - timedelta(weeks=week, days=day)

                    # Morning focus time
                    MockCalendarData.objects.create(
                        contributor=contributor,
                        date=date,
                        event_type='focus',
                        duration_hours=round(random.uniform(2, 4), 1),
                        title='Deep Work'
                    )

                    # Meetings
                    num_meetings = random.randint(1, 4)
                    for _ in range(num_meetings):
                        meeting_types = ['Stand-up', 'Planning', '1:1', 'Review', 'Team Sync']
                        MockCalendarData.objects.create(
                            contributor=contributor,
                            date=date,
                            event_type='meeting',
                            duration_hours=round(random.uniform(0.5, 2), 1),
                            title=random.choice(meeting_types)
                        )

                    # Afternoon focus time
                    if random.random() > 0.3:  # 70% of days have afternoon focus
                        MockCalendarData.objects.create(
                            contributor=contributor,
                            date=date,
                            event_type='focus',
                            duration_hours=round(random.uniform(1, 3), 1),
                            title='Coding Session'
                        )

        calendar_count = MockCalendarData.objects.count()
        self.stdout.write(f'Created {calendar_count} calendar events')

        self.stdout.write(self.style.SUCCESS('\n✓ Mock data generation complete!'))
        self.stdout.write(f'  - Productivity metrics: {contributors.count()}')
        self.stdout.write(f'  - Collaboration relationships: {collaboration_count}')
        self.stdout.write(f'  - Calendar events: {calendar_count}')
