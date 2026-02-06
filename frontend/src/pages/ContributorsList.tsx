import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { mockContributors } from '@/lib/mockData'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import SearchBar from '@/components/SearchBar'
import SortDropdown, { type SortOption } from '@/components/SortDropdown'
import FilterChips, { type FilterOption } from '@/components/FilterChips'
import DemoDataBanner from '@/components/DemoDataBanner'

export default function ContributorsList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')

  // Filter contributors based on search and filter
  const filteredContributors = useMemo(() => {
    let result = [...mockContributors]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(contributor =>
        contributor.name?.toLowerCase().includes(query) ||
        contributor.expertise_summary?.toLowerCase().includes(query) ||
        contributor.email?.toLowerCase().includes(query) ||
        contributor.username.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (filterBy !== 'all') {
      result = result.filter(contributor => {
        const metrics = contributor.productivity_metrics
        if (!metrics) return false

        switch (filterBy) {
          case 'high-flow':
            return metrics.flow_index >= 85
          case 'at-risk':
            return metrics.burnout_risk === 'high'
          case 'balanced':
            return metrics.flow_index >= 70 && metrics.flow_index < 85 && metrics.burnout_risk === 'low'
          default:
            return true
        }
      })
    }

    return result
  }, [searchQuery, filterBy])

  // Sort contributors
  const sortedContributors = useMemo(() => {
    const result = [...filteredContributors]

    switch (sortBy) {
      case 'name':
        return result.sort((a, b) => (a.name || a.username).localeCompare(b.name || b.username))
      case 'flow':
        return result.sort((a, b) =>
          (b.productivity_metrics?.flow_index || 0) - (a.productivity_metrics?.flow_index || 0)
        )
      case 'burnout':
        return result.sort((a, b) => {
          const burnoutOrder = { high: 3, medium: 2, low: 1 }
          const aRisk = a.productivity_metrics?.burnout_risk || 'low'
          const bRisk = b.productivity_metrics?.burnout_risk || 'low'
          return burnoutOrder[bRisk] - burnoutOrder[aRisk]
        })
      case 'focus':
        return result.sort((a, b) =>
          (b.productivity_metrics?.focus_hours || 0) - (a.productivity_metrics?.focus_hours || 0)
        )
      default:
        return result
    }
  }, [filteredContributors, sortBy])

  // Calculate filter counts
  const filterCounts = useMemo(() => {
    return {
      all: mockContributors.length,
      highFlow: mockContributors.filter(c => c.productivity_metrics && c.productivity_metrics.flow_index >= 85).length,
      atRisk: mockContributors.filter(c => c.productivity_metrics && c.productivity_metrics.burnout_risk === 'high').length,
      balanced: mockContributors.filter(c =>
        c.productivity_metrics &&
        c.productivity_metrics.flow_index >= 70 &&
        c.productivity_metrics.flow_index < 85 &&
        c.productivity_metrics.burnout_risk === 'low'
      ).length,
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Demo Data Banner */}
      <DemoDataBanner />

      {/* Header */}
      <div className="relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(170,255,0,0.08),transparent_70%)] blur-3xl pointer-events-none" />
        <div className="relative">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-3 bg-gradient-to-r from-white via-[#AAFF00] to-white bg-clip-text text-transparent">
            Contributors
          </h1>
          <p className="text-lg text-gray-400 font-mono">
            Browse and discover <span className="text-[#AAFF00] font-bold">{mockContributors.length}</span> developers and their expertise
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
        {/* Search and Sort Row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              onSearch={setSearchQuery}
              value={searchQuery}
            />
          </div>
          <div>
            <SortDropdown
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div>
          <FilterChips
            selected={filterBy}
            onChange={setFilterBy}
            counts={filterCounts}
          />
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="text-sm text-gray-400 font-mono">
            {sortedContributors.length === mockContributors.length ? (
              <span>Showing all <span className="font-bold text-[#AAFF00]">{sortedContributors.length}</span> contributors</span>
            ) : (
              <span>
                Showing <span className="font-bold text-[#AAFF00]">{sortedContributors.length}</span> of <span className="font-bold text-white">{mockContributors.length}</span> contributors
              </span>
            )}
          </div>
          {(searchQuery || filterBy !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setFilterBy('all')
              }}
              className="text-sm text-[#AAFF00] hover:text-white font-mono font-medium transition-colors duration-200"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Contributors Grid */}
      {sortedContributors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedContributors.map((contributor) => {
            const displayName = contributor.name || contributor.username
            const initials = displayName
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()

            const metrics = contributor.productivity_metrics
            const burnoutRisk = metrics?.burnout_risk || 'low'
            const flowIndex = metrics?.flow_index || 0

            return (
              <Link
                key={contributor.id}
                to={`/contributors/${contributor.id}`}
                className="block group"
              >
                <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#AAFF00]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(170,255,0,0.15)] cursor-pointer h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#AAFF00]/5 rounded-full blur-2xl group-hover:bg-[#AAFF00]/10 transition-all duration-500" />

                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar
                        fallback={initials}
                        src={contributor.avatar_url || undefined}
                        alt={displayName}
                        size="lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-white mb-1 truncate group-hover:text-[#AAFF00] transition-colors duration-300">
                          {displayName}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                          {contributor.expertise_summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {flowIndex >= 85 && (
                        <Badge variant="success">High Flow</Badge>
                      )}
                      {burnoutRisk === 'high' && (
                        <Badge variant="warning">At Risk</Badge>
                      )}
                      {flowIndex >= 70 && flowIndex < 85 && burnoutRisk === 'low' && (
                        <Badge variant="info">Balanced</Badge>
                      )}
                      {metrics?.work_style && (
                        <Badge variant="default">{metrics.work_style}</Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-lg font-black font-mono text-[#AAFF00] mb-1">
                          {contributor.works?.[0]?.total_commits || 0}
                        </div>
                        <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Commits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-black font-mono text-[#FFB800] mb-1">
                          {metrics?.focus_hours?.toFixed(0) || 0}h
                        </div>
                        <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Focus</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-black font-mono mb-1 ${
                          flowIndex >= 85 ? 'text-[#AAFF00]' :
                          flowIndex >= 75 ? 'text-[#AAFF00]' :
                          'text-[#FFB800]'
                        }`}>
                          {flowIndex}%
                        </div>
                        <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Flow</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-16 text-center">
          <div className="text-6xl mb-6 opacity-50">🔍</div>
          <h3 className="text-2xl font-black text-white mb-3">No contributors found</h3>
          <p className="text-gray-400 mb-8 font-mono">
            {searchQuery ? (
              <>
                No results for "<span className="font-bold text-[#AAFF00]">{searchQuery}</span>"
              </>
            ) : (
              <>No contributors match the selected filters</>
            )}
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setFilterBy('all')
            }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#AAFF00] to-[#7ACC00] text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(170,255,0,0.3)] transition-all duration-300 hover:scale-105"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
