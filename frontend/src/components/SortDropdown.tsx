import * as Select from '@radix-ui/react-select'
import { cn } from '@/lib/utils'

export type SortOption = 'name' | 'flow' | 'burnout' | 'focus'

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const sortOptions = [
  { value: 'name' as const, label: 'Name (A-Z)', icon: '🔤' },
  { value: 'flow' as const, label: 'Flow Index (High to Low)', icon: '⚡' },
  { value: 'burnout' as const, label: 'Burnout Risk (High to Low)', icon: '⚠️' },
  { value: 'focus' as const, label: 'Focus Hours (High to Low)', icon: '🎯' },
]

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const selectedOption = sortOptions.find(opt => opt.value === value)

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className={cn(
          "inline-flex items-center gap-2 px-4 py-3 rounded-lg",
          "bg-white/5 backdrop-blur-sm border border-white/20",
          "hover:bg-white/10 hover:border-[#AAFF00]/50",
          "focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50",
          "transition-all duration-200 min-w-[200px]"
        )}
      >
        <span className="text-sm text-gray-500 font-mono">Sort by:</span>
        <Select.Value>
          <span className="font-medium text-white font-mono">
            {selectedOption?.icon} {selectedOption?.label}
          </span>
        </Select.Value>
        <Select.Icon className="ml-auto">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={cn(
            "overflow-hidden bg-[#171717] rounded-lg shadow-xl border border-white/20",
            "backdrop-blur-xl",
            "animate-in fade-in-0 zoom-in-95"
          )}
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="p-2">
            {sortOptions.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-3 rounded-lg",
                  "text-sm text-gray-300 cursor-pointer font-mono",
                  "hover:bg-white/10 hover:text-white",
                  "focus:bg-white/10 focus:text-white focus:outline-none",
                  "transition-colors duration-150",
                  "data-[state=checked]:bg-[#AAFF00]/20 data-[state=checked]:text-[#AAFF00] data-[state=checked]:font-semibold"
                )}
              >
                <Select.ItemText>
                  <span>{option.icon} {option.label}</span>
                </Select.ItemText>
                <Select.ItemIndicator className="ml-auto">
                  <svg className="w-4 h-4 text-[#AAFF00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
