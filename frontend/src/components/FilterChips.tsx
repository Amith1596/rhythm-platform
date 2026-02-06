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
  { value: 'high-flow' as const, label: 'High Flow', icon: '⚡', color: 'lime' },
  { value: 'at-risk' as const, label: 'At Risk', icon: '⚠️', color: 'coral' },
  { value: 'balanced' as const, label: 'Balanced', icon: '⚖️', color: 'amber' },
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
              "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent",
              isSelected ? [
                option.color === 'gray' && "bg-white/20 text-white border border-white/30 shadow-lg focus:ring-white/50",
                option.color === 'lime' && "bg-[#AAFF00]/20 text-[#AAFF00] border border-[#AAFF00]/40 shadow-lg shadow-[#AAFF00]/20 focus:ring-[#AAFF00]/50",
                option.color === 'coral' && "bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/40 shadow-lg shadow-[#FF6B35]/20 focus:ring-[#FF6B35]/50",
                option.color === 'amber' && "bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40 shadow-lg shadow-[#FFB800]/20 focus:ring-[#FFB800]/50",
              ] : [
                "bg-white/5 backdrop-blur-sm border border-white/10 text-[#A8A89A]",
                "hover:bg-white/10 hover:border-white/20 hover:text-white",
                "focus:ring-white/20",
              ]
            )}
            style={{ fontFamily: "'Source Code Pro', monospace" }}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
            {count !== null && (
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-bold",
                isSelected
                  ? "bg-white/20 text-white"
                  : "bg-white/10 text-[#6B6B60]"
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
