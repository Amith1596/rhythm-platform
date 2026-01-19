import { cn } from '@/lib/utils'

export type FilterOption = 'all' | 'high-flow' | 'at-risk' | 'balanced'

interface FilterChipsProps {
  selected: FilterOption
  onChange: (filter: FilterOption) => void
  counts?: {
    all: number
    highFlow: number
    atRisk: number
    balanced: number
  }
}

const filterOptions = [
  { value: 'all' as const, label: 'All', icon: '👥', color: 'gray' },
  { value: 'high-flow' as const, label: 'High Flow', icon: '⚡', color: 'green' },
  { value: 'at-risk' as const, label: 'At Risk', icon: '⚠️', color: 'red' },
  { value: 'balanced' as const, label: 'Balanced', icon: '⚖️', color: 'blue' },
]

export default function FilterChips({ selected, onChange, counts }: FilterChipsProps) {
  const getCount = (filter: FilterOption) => {
    if (!counts) return null
    switch (filter) {
      case 'all': return counts.all
      case 'high-flow': return counts.highFlow
      case 'at-risk': return counts.atRisk
      case 'balanced': return counts.balanced
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => {
        const isSelected = selected === option.value
        const count = getCount(option.value)

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              isSelected ? [
                option.color === 'gray' && "bg-gray-900 text-white shadow-lg focus:ring-gray-500",
                option.color === 'green' && "bg-green-600 text-white shadow-lg focus:ring-green-500",
                option.color === 'red' && "bg-red-600 text-white shadow-lg focus:ring-red-500",
                option.color === 'blue' && "bg-blue-600 text-white shadow-lg focus:ring-blue-500",
              ] : [
                "bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-700",
                "hover:bg-white hover:border-gray-400 hover:shadow-md",
                option.color === 'gray' && "focus:ring-gray-400",
                option.color === 'green' && "focus:ring-green-400",
                option.color === 'red' && "focus:ring-red-400",
                option.color === 'blue' && "focus:ring-blue-400",
              ]
            )}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
            {count !== null && (
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-semibold",
                isSelected
                  ? "bg-white/20"
                  : "bg-gray-100 text-gray-600"
              )}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
