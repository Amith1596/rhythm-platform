import { useParams, Link } from 'react-router-dom'
import { useContributor } from '@/hooks/useContributor'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { ProductivityChart, FlowIndexChart, CalendarHeatmap } from '@/components/charts'

export default function DeveloperProfile() {
  const { id } = useParams<{ id: string }>()
  const {
    contributor,
    weeklyProductivity,
    dailyActivity,
    topCollaborators,
    isLoading
  } = useContributor(Number(id))

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <Card>
          <p className="text-gray-600">Loading...</p>
        </Card>
      </div>
    )
  }

  if (!contributor) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contributor Not Found</h2>
          <p className="text-gray-600 mb-6">
            The contributor you're looking for doesn't exist.
          </p>
          <Link to="/contributors">
            <Button>Back to Contributors</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const initials = contributor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  const metrics = contributor.productivity_metrics

  // Calculate insights
  const avgFocusHours = weeklyProductivity.reduce((acc, w) => acc + w.focusHours, 0) / weeklyProductivity.length
  const avgMeetingHours = weeklyProductivity.reduce((acc, w) => acc + w.meetingHours, 0) / weeklyProductivity.length
  const trend = weeklyProductivity.length >= 2
    ? weeklyProductivity[weeklyProductivity.length - 1].flowIndex - weeklyProductivity[0].flowIndex
    : 0

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <div>
        <Link to="/contributors">
          <Button variant="ghost" size="sm">← Back to Contributors</Button>
        </Link>
      </div>

      {/* Header */}
      <Card className="mb-8">
        <div className="flex items-start gap-6">
          <Avatar
            fallback={initials}
            src={contributor.avatar_url || undefined}
            alt={contributor.name}
            size="xl"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              {contributor.name}
            </h1>
            <p className="text-gray-600 mb-4">{contributor.email}</p>
            <p className="text-lg text-gray-700 mb-4">
              {contributor.expertise_summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {metrics && (
                <>
                  {metrics.flow_index >= 85 && (
                    <Badge variant="success">High Flow Index</Badge>
                  )}
                  {metrics.burnout_risk > 40 && (
                    <Badge variant="warning">Burnout Risk</Badge>
                  )}
                  {metrics.work_style && (
                    <Badge variant="info">{metrics.work_style}</Badge>
                  )}
                  {trend > 5 && (
                    <Badge variant="success">Improving Trend ↗</Badge>
                  )}
                  {trend < -5 && (
                    <Badge variant="danger">Declining Trend ↘</Badge>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {metrics && (
          <>
            <Card>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {metrics.focus_hours_per_week.toFixed(1)}h
                </div>
                <div className="text-gray-600 font-medium mb-1">Focus Hours / Week</div>
                <div className="text-sm text-gray-500">
                  {metrics.meeting_load_percentage}% in meetings
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary-600 mb-2">
                  {metrics.flow_index}%
                </div>
                <div className="text-gray-600 font-medium mb-1">Flow Index</div>
                <div className="text-sm text-gray-500">
                  {metrics.flow_index >= 85 ? 'Excellent' : metrics.flow_index >= 75 ? 'Good' : 'Needs attention'}
                </div>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${
                  metrics.burnout_risk > 40 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {metrics.burnout_risk}%
                </div>
                <div className="text-gray-600 font-medium mb-1">Burnout Risk</div>
                <div className="text-sm text-gray-500">
                  {metrics.burnout_risk > 40 ? 'High risk - intervention needed' : 'Healthy work-life balance'}
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Productivity Trends */}
      <Card>
        <h2 className="text-2xl font-bold text-primary-900 mb-6">Productivity Trends (Last 4 Weeks)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Focus vs Meeting Hours</h3>
            <ProductivityChart data={weeklyProductivity} height={250} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Flow Index Over Time</h3>
            <FlowIndexChart data={weeklyProductivity} height={250} />
          </div>
        </div>
      </Card>

      {/* Work Patterns & Insights */}
      <Card>
        <h2 className="text-2xl font-bold text-primary-900 mb-6">Work Patterns & Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-primary-50 rounded-2xl">
            <div className="text-2xl font-bold text-primary-900 mb-1">
              {avgFocusHours.toFixed(1)}h
            </div>
            <div className="text-sm text-gray-600">Avg Focus Hours</div>
          </div>
          <div className="text-center p-4 bg-secondary-50 rounded-2xl">
            <div className="text-2xl font-bold text-secondary-900 mb-1">
              {avgMeetingHours.toFixed(1)}h
            </div>
            <div className="text-sm text-gray-600">Avg Meeting Hours</div>
          </div>
          <div className="text-center p-4 bg-accent-50 rounded-2xl">
            <div className={`text-2xl font-bold mb-1 ${
              trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend > 0 ? '+' : ''}{trend.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">Flow Index Trend</div>
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">AI Insights</h3>
          <div className="space-y-2">
            {metrics && metrics.flow_index >= 85 && (
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                <div className="text-green-600 text-xl">✓</div>
                <div className="flex-1">
                  <div className="font-medium text-green-900">High Performance</div>
                  <div className="text-sm text-green-700">
                    {contributor.name} maintains excellent flow state with {metrics.focus_hours_per_week.toFixed(0)}h of weekly focus time.
                  </div>
                </div>
              </div>
            )}
            {metrics && metrics.burnout_risk > 40 && (
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                <div className="text-red-600 text-xl">!</div>
                <div className="flex-1">
                  <div className="font-medium text-red-900">Burnout Risk Detected</div>
                  <div className="text-sm text-red-700">
                    Meeting load at {metrics.meeting_load_percentage}% is impacting productivity. Consider reducing meetings or delegating.
                  </div>
                </div>
              </div>
            )}
            {trend > 10 && (
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <div className="text-blue-600 text-xl">↗</div>
                <div className="flex-1">
                  <div className="font-medium text-blue-900">Positive Trend</div>
                  <div className="text-sm text-blue-700">
                    Flow index improved by {trend.toFixed(0)}% over the last 4 weeks. Great progress!
                  </div>
                </div>
              </div>
            )}
            {trend < -10 && (
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl">
                <div className="text-yellow-600 text-xl">↘</div>
                <div className="flex-1">
                  <div className="font-medium text-yellow-900">Declining Performance</div>
                  <div className="text-sm text-yellow-700">
                    Flow index declined by {Math.abs(trend).toFixed(0)}% recently. Check in to identify blockers.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Calendar Heatmap */}
      <Card>
        <h2 className="text-2xl font-bold text-primary-900 mb-6">Activity Heatmap (Last 28 Days)</h2>
        <CalendarHeatmap data={dailyActivity} />
      </Card>

      {/* Code Expertise */}
      <Card>
        <h2 className="text-2xl font-bold text-primary-900 mb-6">Code Expertise</h2>
        {contributor.works && contributor.works.length > 0 ? (
          <div className="space-y-4">
            {contributor.works.map((work) => (
              <div
                key={work.id}
                className="border border-gray-200 rounded-2xl p-4 hover:border-primary-300 transition-colors"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {work.repository_name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {work.languages?.map((lang) => (
                    <Badge key={lang} variant="default">{lang}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-bold text-primary-600">{work.total_commits}</div>
                    <div className="text-gray-500">Commits</div>
                  </div>
                  <div>
                    <div className="font-bold text-secondary-600">{work.total_prs}</div>
                    <div className="text-gray-500">Pull Requests</div>
                  </div>
                  <div>
                    <div className="font-bold text-accent-600">{work.total_issues}</div>
                    <div className="text-gray-500">Issues</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No repository work found</p>
        )}
      </Card>

      {/* Top Collaborators */}
      {topCollaborators.length > 0 && (
        <Card>
          <h2 className="text-2xl font-bold text-primary-900 mb-6">Top Collaborators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {topCollaborators.map((collab) => {
              const collabInitials = collab.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()

              return (
                <Link
                  key={collab.id}
                  to={`/contributors/${collab.id}`}
                  className="flex flex-col items-center text-center hover:opacity-80 transition-opacity group"
                >
                  <div className="relative mb-3">
                    <Avatar
                      fallback={collabInitials}
                      src={collab.avatar_url || undefined}
                      alt={collab.name}
                      size="lg"
                      className="group-hover:ring-4 group-hover:ring-primary-200 transition-all"
                    />
                  </div>
                  <div className="font-medium text-sm text-gray-900 mb-1">{collab.name}</div>
                  <div className="text-xs text-gray-500 line-clamp-2">
                    {collab.expertise_summary?.split('|')[0]}
                  </div>
                </Link>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}
