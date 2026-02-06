import { useParams, Link } from 'react-router-dom'
import { useContributor } from '@/hooks/useContributor'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
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
        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-12">
          <p className="text-[#A8A89A] font-mono">Loading...</p>
        </div>
      </div>
    )
  }

  if (!contributor) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-12">
          <h2 className="text-2xl font-bold text-white mb-4">Contributor Not Found</h2>
          <p className="text-[#A8A89A] mb-6">
            The contributor you're looking for doesn't exist.
          </p>
          <Link
            to="/contributors"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#AAFF00] to-[#7ACC00] text-black font-bold rounded-lg hover:shadow-[0_0_30px_rgba(170,255,0,0.3)] transition-all duration-300"
          >
            Back to Contributors
          </Link>
        </div>
      </div>
    )
  }

  const displayName = contributor.name || contributor.username
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
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
        <Link
          to="/contributors"
          className="inline-flex items-center gap-2 text-[#A8A89A] hover:text-[#AAFF00] font-mono text-sm transition-colors duration-200"
        >
          <span>←</span> Back to Contributors
        </Link>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#AAFF00]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex items-start gap-6">
          <Avatar
            fallback={initials}
            src={contributor.avatar_url || undefined}
            alt={contributor.name}
            size="xl"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              {contributor.name}
            </h1>
            <p className="text-[#6B6B60] font-mono text-sm mb-4">{contributor.email}</p>
            <p className="text-lg text-[#A8A89A] mb-4">
              {contributor.expertise_summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {metrics && (
                <>
                  {metrics.flow_index >= 85 && (
                    <Badge variant="success">High Flow Index</Badge>
                  )}
                  {metrics.burnout_risk === 'high' && (
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
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {metrics && (
          <>
            <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-center">
                <div className="text-4xl font-black font-mono text-[#AAFF00] mb-2">
                  {metrics.focus_hours.toFixed(1)}h
                </div>
                <div className="text-[#A8A89A] font-medium mb-1">Focus Hours / Week</div>
                <div className="text-sm text-[#6B6B60] font-mono">
                  {metrics.meeting_load.toFixed(0)}% in meetings
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-center">
                <div className="text-4xl font-black font-mono text-[#FFB800] mb-2">
                  {metrics.flow_index}%
                </div>
                <div className="text-[#A8A89A] font-medium mb-1">Flow Index</div>
                <div className="text-sm text-[#6B6B60] font-mono">
                  {metrics.flow_index >= 85 ? 'Excellent' : metrics.flow_index >= 75 ? 'Good' : 'Needs attention'}
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="text-center">
                <div className={`text-4xl font-black font-mono mb-2 ${
                  metrics.burnout_risk === 'high' ? 'text-[#FF6B35]' : 'text-[#AAFF00]'
                }`}>
                  {metrics.burnout_risk?.toUpperCase() || 'LOW'}
                </div>
                <div className="text-[#A8A89A] font-medium mb-1">Burnout Risk</div>
                <div className="text-sm text-[#6B6B60] font-mono">
                  {metrics.burnout_risk === 'high' ? 'Intervention needed' : 'Healthy work-life balance'}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Productivity Trends */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Productivity Trends (Last 4 Weeks)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-[#A8A89A] mb-3 font-mono uppercase tracking-wider">Focus vs Meeting Hours</h3>
            <ProductivityChart data={weeklyProductivity} height={250} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#A8A89A] mb-3 font-mono uppercase tracking-wider">Flow Index Over Time</h3>
            <FlowIndexChart data={weeklyProductivity} height={250} />
          </div>
        </div>
      </div>

      {/* Work Patterns & Insights */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Work Patterns & Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-[#AAFF00]/5 border border-[#AAFF00]/10 rounded-xl">
            <div className="text-2xl font-black font-mono text-[#AAFF00] mb-1">
              {avgFocusHours.toFixed(1)}h
            </div>
            <div className="text-sm text-[#A8A89A] font-mono">Avg Focus Hours</div>
          </div>
          <div className="text-center p-4 bg-[#FFB800]/5 border border-[#FFB800]/10 rounded-xl">
            <div className="text-2xl font-black font-mono text-[#FFB800] mb-1">
              {avgMeetingHours.toFixed(1)}h
            </div>
            <div className="text-sm text-[#A8A89A] font-mono">Avg Meeting Hours</div>
          </div>
          <div className="text-center p-4 bg-white/[0.03] border border-white/10 rounded-xl">
            <div className={`text-2xl font-black font-mono mb-1 ${
              trend > 0 ? 'text-[#AAFF00]' : trend < 0 ? 'text-[#FF6B35]' : 'text-[#A8A89A]'
            }`}>
              {trend > 0 ? '+' : ''}{trend.toFixed(0)}%
            </div>
            <div className="text-sm text-[#A8A89A] font-mono">Flow Index Trend</div>
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <h3 className="font-semibold text-[#A8A89A] font-mono uppercase tracking-wider text-sm">AI Insights</h3>
          <div className="space-y-2">
            {metrics && metrics.flow_index >= 85 && (
              <div className="flex items-start gap-3 p-4 bg-[#AAFF00]/5 border border-[#AAFF00]/10 rounded-xl">
                <div className="text-[#AAFF00] text-lg">✓</div>
                <div className="flex-1">
                  <div className="font-bold text-[#AAFF00] text-sm">High Performance</div>
                  <div className="text-sm text-[#A8A89A]">
                    {displayName} maintains excellent flow state with {metrics.focus_hours.toFixed(0)}h of weekly focus time.
                  </div>
                </div>
              </div>
            )}
            {metrics && metrics.burnout_risk === 'high' && (
              <div className="flex items-start gap-3 p-4 bg-[#FF6B35]/5 border border-[#FF6B35]/10 rounded-xl">
                <div className="text-[#FF6B35] text-lg">!</div>
                <div className="flex-1">
                  <div className="font-bold text-[#FF6B35] text-sm">Burnout Risk Detected</div>
                  <div className="text-sm text-[#A8A89A]">
                    Meeting load at {metrics.meeting_load.toFixed(0)}% is impacting productivity. Consider reducing meetings or delegating.
                  </div>
                </div>
              </div>
            )}
            {trend > 10 && (
              <div className="flex items-start gap-3 p-4 bg-[#AAFF00]/5 border border-[#AAFF00]/10 rounded-xl">
                <div className="text-[#AAFF00] text-lg">↗</div>
                <div className="flex-1">
                  <div className="font-bold text-[#AAFF00] text-sm">Positive Trend</div>
                  <div className="text-sm text-[#A8A89A]">
                    Flow index improved by {trend.toFixed(0)}% over the last 4 weeks. Great progress!
                  </div>
                </div>
              </div>
            )}
            {trend < -10 && (
              <div className="flex items-start gap-3 p-4 bg-[#FFB800]/5 border border-[#FFB800]/10 rounded-xl">
                <div className="text-[#FFB800] text-lg">↘</div>
                <div className="flex-1">
                  <div className="font-bold text-[#FFB800] text-sm">Declining Performance</div>
                  <div className="text-sm text-[#A8A89A]">
                    Flow index declined by {Math.abs(trend).toFixed(0)}% recently. Check in to identify blockers.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Calendar Heatmap */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Activity Heatmap (Last 28 Days)</h2>
        <CalendarHeatmap data={dailyActivity} />
      </div>

      {/* Code Expertise */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Code Expertise</h2>
        {contributor.works && contributor.works.length > 0 ? (
          <div className="space-y-4">
            {contributor.works.map((work: any) => (
              <div
                key={work.id}
                className="border border-white/10 rounded-xl p-4 hover:border-[#AAFF00]/30 transition-colors"
              >
                <h3 className="font-bold text-lg text-white mb-2 font-mono">
                  {work.repository_name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {work.languages?.map((lang: string) => (
                    <Badge key={lang} variant="default">{lang}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-black font-mono text-[#AAFF00]">{work.total_commits}</div>
                    <div className="text-[#6B6B60] font-mono text-xs uppercase tracking-wider">Commits</div>
                  </div>
                  <div>
                    <div className="font-black font-mono text-[#FFB800]">{work.total_prs}</div>
                    <div className="text-[#6B6B60] font-mono text-xs uppercase tracking-wider">Pull Requests</div>
                  </div>
                  <div>
                    <div className="font-black font-mono text-[#FF6B35]">{work.total_issues}</div>
                    <div className="text-[#6B6B60] font-mono text-xs uppercase tracking-wider">Issues</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#6B6B60] font-mono">No repository work found</p>
        )}
      </div>

      {/* Top Collaborators */}
      {topCollaborators.length > 0 && (
        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-white mb-6" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Top Collaborators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {topCollaborators.map((collab: any) => {
              const collabDisplayName = collab.name || collab.username
              const collabInitials = collabDisplayName
                .split(' ')
                .map((n: string) => n[0])
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
                      className="group-hover:ring-2 group-hover:ring-[#AAFF00]/40 transition-all"
                    />
                  </div>
                  <div className="font-medium text-sm text-white mb-1">{collab.name}</div>
                  <div className="text-xs text-[#6B6B60] font-mono line-clamp-2">
                    {collab.expertise_summary?.split('|')[0]}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
