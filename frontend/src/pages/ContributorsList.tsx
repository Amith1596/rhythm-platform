import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { mockContributors } from '@/lib/mockData'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import SearchBar from '@/components/SearchBar'
import SortDropdown, { SortOption } from '@/components/SortDropdown'
import FilterChips, { FilterOption } from '@/components/FilterChips'

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
        contributor.name.toLowerCase().includes(query) ||
        contributor.expertise_summary.toLowerCase().includes(query) ||
        contributor.email.toLowerCase().includes(query)
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
            return metrics.burnout_risk > 40
          case 'balanced':
            return metrics.flow_index >= 70 && metrics.flow_index < 85 && metrics.burnout_risk <= 40
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
        return result.sort((a, b) => a.name.localeCompare(b.name))
      case 'flow':
        return result.sort((a, b) =>
          (b.productivity_metrics?.flow_index || 0) - (a.productivity_metrics?.flow_index || 0)
        )
      case 'burnout':
        return result.sort((a, b) =>
          (b.productivity_metrics?.burnout_risk || 0) - (a.productivity_metrics?.burnout_risk || 0)
        )
      case 'focus':
        return result.sort((a, b) =>
          (b.productivity_metrics?.focus_hours_per_week || 0) - (a.productivity_metrics?.focus_hours_per_week || 0)
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
      atRisk: mockContributors.filter(c => c.productivity_metrics && c.productivity_metrics.burnout_risk > 40).length,
      balanced: mockContributors.filter(c =>
        c.productivity_metrics &&
        c.productivity_metrics.flow_index >= 70 &&
        c.productivity_metrics.flow_index < 85 &&
        c.productivity_metrics.burnout_risk <= 40
      ).length,
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary-900 mb-2">Contributors</h1>
        <p className="text-gray-600">
          Browse and discover {mockContributors.length} developers and their expertise
        </p>
      </div>

      {/* Controls Bar */}
      <Card className="space-y-4">
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
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {sortedContributors.length === mockContributors.length ? (
              <span>Showing all <span className="font-semibold">{sortedContributors.length}</span> contributors</span>
            ) : (
              <span>
                Showing <span className="font-semibold">{sortedContributors.length}</span> of <span className="font-semibold">{mockContributors.length}</span> contributors
              </span>
            )}
          </div>
          {(searchQuery || filterBy !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setFilterBy('all')
              }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      </Card>

      {/* Contributors Grid */}
      {sortedContributors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedContributors.map((contributor) => {
            const initials = contributor.name
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()

            const metrics = contributor.productivity_metrics
            const burnoutRisk = metrics?.burnout_risk || 0
            const flowIndex = metrics?.flow_index || 0

            return (
              <Link
                key={contributor.id}
                to={`/contributors/${contributor.id}`}
                className="block transition-transform hover:scale-105"
              >
                <Card className="hover:shadow-2xl cursor-pointer h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar
                      fallback={initials}
                      src={contributor.avatar_url || undefined}
                      alt={contributor.name}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-primary-900 mb-1 truncate">
                        {contributor.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {contributor.expertise_summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {flowIndex >= 85 && (
                      <Badge variant="success">High Flow</Badge>
                    )}
                    {burnoutRisk > 40 && (
                      <Badge variant="warning">At Risk</Badge>
                    )}
                    {flowIndex >= 70 && flowIndex < 85 && burnoutRisk <= 40 && (
                      <Badge variant="info">Balanced</Badge>
                    )}
                    {metrics?.work_style && (
                      <Badge variant="default">{metrics.work_style}</Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-sm font-bold text-primary-600">
                        {contributor.works?.[0]?.total_commits || 0}
                      </div>
                      <div className="text-xs text-gray-500">Commits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-secondary-600">
                        {metrics?.focus_hours_per_week?.toFixed(0) || 0}h
                      </div>
                      <div className="text-xs text-gray-500">Focus/Week</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-bold ${
                        flowIndex >= 85 ? 'text-green-600' :
                        flowIndex >= 75 ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {flowIndex}%
                      </div>
                      <div className="text-xs text-gray-500">Flow</div>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No contributors found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery ? (
              <>
                No results for "<span className="font-semibold">{searchQuery}</span>"
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
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            Clear filters
          </button>
        </Card>
      )}
    </div>
  )
}
