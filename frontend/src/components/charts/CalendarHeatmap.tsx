import { DayActivity } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface CalendarHeatmapProps {
  data: DayActivity[]
}

export default function CalendarHeatmap({ data }: CalendarHeatmapProps) {
  // Calculate max hours for scaling
  const maxHours = Math.max(...data.map(d => d.focusHours + d.meetingHours))

  // Get intensity class based on total hours
  const getIntensityClass = (focusHours: number, meetingHours: number) => {
    const total = focusHours + meetingHours
    const percentage = (total / maxHours) * 100

    if (percentage === 0) return 'bg-gray-100'
    if (percentage < 25) return 'bg-primary-200'
    if (percentage < 50) return 'bg-primary-400'
    if (percentage < 75) return 'bg-primary-600'
    return 'bg-primary-800'
  }

  // Get color based on focus vs meeting ratio
  const getRatioColor = (focusHours: number, meetingHours: number) => {
    if (focusHours === 0 && meetingHours === 0) return 'bg-gray-100'
    const focusRatio = focusHours / (focusHours + meetingHours)

    if (focusRatio > 0.7) return 'bg-primary-600' // High focus - indigo
    if (focusRatio > 0.4) return 'bg-secondary-500' // Balanced - teal
    return 'bg-accent-400' // High meetings - pink
  }

  // Group by weeks (7 days each)
  const weeks: DayActivity[][] = []
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7))
  }

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded bg-gray-100"></div>
            <div className="w-3 h-3 rounded bg-primary-200"></div>
            <div className="w-3 h-3 rounded bg-primary-400"></div>
            <div className="w-3 h-3 rounded bg-primary-600"></div>
            <div className="w-3 h-3 rounded bg-primary-800"></div>
          </div>
          <span>More</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-primary-600"></div>
            <span>High Focus</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-secondary-500"></div>
            <span>Balanced</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-accent-400"></div>
            <span>Meeting Heavy</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="space-y-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex gap-2">
            <div className="text-xs text-gray-500 w-16 flex items-center">
              Week {weekIndex + 1}
            </div>
            <div className="flex gap-1 flex-1">
              {week.map((day) => {
                const date = new Date(day.date)
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
                const total = day.focusHours + day.meetingHours

                return (
                  <div key={day.date} className="flex-1 group relative">
                    <div
                      className={cn(
                        "w-full aspect-square rounded transition-all duration-200 hover:ring-2 hover:ring-primary-500 hover:scale-110",
                        getRatioColor(day.focusHours, day.meetingHours)
                      )}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                        <div className="font-semibold mb-1">{dayName}, {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        <div className="space-y-0.5">
                          <div>Focus: {day.focusHours.toFixed(1)}h</div>
                          <div>Meetings: {day.meetingHours.toFixed(1)}h</div>
                          <div className="font-semibold pt-0.5 border-t border-gray-700">Total: {total.toFixed(1)}h</div>
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Day Labels */}
      <div className="flex gap-2">
        <div className="w-16"></div>
        <div className="flex gap-1 flex-1 text-xs text-gray-500">
          <div className="flex-1 text-center">Sun</div>
          <div className="flex-1 text-center">Mon</div>
          <div className="flex-1 text-center">Tue</div>
          <div className="flex-1 text-center">Wed</div>
          <div className="flex-1 text-center">Thu</div>
          <div className="flex-1 text-center">Fri</div>
          <div className="flex-1 text-center">Sat</div>
        </div>
      </div>
    </div>
  )
}
