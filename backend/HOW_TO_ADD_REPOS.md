# How to Add New GitHub Repositories to Rhythm

## Current Data Ingestion Process

Rhythm currently uses a **command-line script** to fetch data from GitHub repositories. Here's how it works:

### Step 1: Get a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Rhythm Data Fetcher"
4. Select scopes:
   - `repo` (Full control of private repositories)
   - `read:user` (Read user profile data)
5. Click "Generate token" and **copy the token**

### Step 2: Configure Environment Variable

Create or update `.env` file in the `backend/` directory:

```bash
GITHUB_TOKEN=ghp_your_token_here
```

### Step 3: Edit fetch.py

Open `backend/fetch.py` and modify the `repository_urls` list (around line 453):

```python
repository_urls = [
    "https://github.com/your-org/your-repo-1",
    "https://github.com/your-org/your-repo-2",
    "https://github.com/another-org/another-repo",
]
```

### Step 4: Run the Fetch Script

```bash
cd backend
source venv/bin/activate
python fetch.py
```

This will:
- Fetch all contributors from the specified repos
- Download commit history (up to 500 commits per repo)
- Download closed issues (up to 500 per repo)
- Save everything to `github_contributors_simplified_issues_commits_v4.json`

**Note:** This can take 10-30 minutes depending on repo size and API rate limits.

### Step 5: Import Data into Django

**Currently, there's no automated import pipeline.** You need to manually create a management command or use Django shell to import the JSON data.

Here's a quick example using Django shell:

```python
cd backend
source venv/bin/activate
python manage.py shell

# Inside shell:
import json
from api.models import Repository, Contributor, RepositoryWork, Commit, Issue

# Load JSON
with open('github_contributors_simplified_issues_commits_v4.json') as f:
    data = json.load(f)

# Process repositories
for repo_url in data['metadata']['processed_repos']:
    owner, name = repo_url.replace('https://github.com/', '').split('/')
    repo, created = Repository.objects.get_or_create(
        name=f"{owner}/{name}",
        defaults={'url': repo_url, 'description': ''}
    )
    print(f"{'Created' if created else 'Found'} repo: {repo.name}")

# Process contributors (simplified example)
for contributor_data in data['contributors']:
    contributor, created = Contributor.objects.get_or_create(
        github_id=contributor_data['id'],
        defaults={
            'username': contributor_data['username'],
            'name': contributor_data.get('name', ''),
            'email': '',
            'avatar_url': contributor_data.get('avatar_url', ''),
            'profile_url': contributor_data.get('url', ''),
        }
    )
    print(f"{'Created' if created else 'Found'} contributor: {contributor.username}")

    # Process works (commits, issues, etc.)
    # ... (this would be more complex)
```

**Better Approach:** Create a Django management command:

```python
# backend/api/management/commands/import_github_data.py
from django.core.management.base import BaseCommand
import json
from api.models import Repository, Contributor, RepositoryWork

class Command(BaseCommand):
    help = 'Import GitHub data from fetch.py JSON output'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='Path to JSON file')

    def handle(self, *args, **options):
        # Implementation here
        pass
```

Then run:
```bash
python manage.py import_github_data github_contributors_simplified_issues_commits_v4.json
```

## Limitations & Future Improvements

### Current Limitations

1. **Manual Process**: No UI for adding repos
2. **No Incremental Updates**: Re-fetches all data each time
3. **No Scheduled Sync**: Must manually run fetch.py
4. **Rate Limits**: GitHub API limits to 5,000 requests/hour (authenticated)
5. **No Validation**: Doesn't check if repo exists or is accessible

### Proposed Future Features

1. **Admin UI for Repo Management**
   - Add repos via Django admin
   - Trigger data fetch from UI
   - View sync status and errors

2. **Automated Sync**
   - Celery task to fetch data daily
   - Webhooks to update in real-time
   - Incremental updates (only fetch new commits/issues)

3. **Better Error Handling**
   - Validate repo URL before fetching
   - Show progress during fetch
   - Retry failed requests

4. **Multi-Tenant Support**
   - Different organizations see only their repos
   - Role-based access control

## API Endpoints for Viewing Data

Once data is imported, you can access it via:

- **GET /api/repositories/** - List all repos
- **GET /api/contributors/** - List all contributors
- **GET /api/contributors/{id}/** - Get contributor details with productivity metrics
- **GET /api/productivity/{contributor_id}/** - Get productivity metrics and calendar data
- **GET /api/collaboration/graph/** - Get collaboration network data
- **POST /api/project-match/** - Get AI project matching recommendations

## Questions?

For questions or issues with data ingestion, check:
1. GitHub token has correct permissions
2. Repos are public or token has access
3. API rate limits aren't exceeded
4. Django database migrations are up to date

---

**Last Updated:** 2026-02-05
**Current Demo Data:** fastapi/fastapi (7 contributors, loaded via `python manage.py load_demo_data`)
