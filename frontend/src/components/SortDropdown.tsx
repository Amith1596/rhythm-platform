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
          "inline-flex items-center gap-2 px-4 py-3 rounded-2xl",
          "bg-white/80 backdrop-blur-sm border border-gray-300",
          "hover:bg-white hover:border-primary-400",
          "focus:outline-none focus:ring-2 focus:ring-primary-500",
          "transition-all duration-200 min-w-[200px]"
        )}
      >
        <span className="text-sm text-gray-600">Sort by:</span>
        <Select.Value>
          <span className="font-medium text-gray-900">
            {selectedOption?.icon} {selectedOption?.label}
          </span>
        </Select.Value>
        <Select.Icon className="ml-auto">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={cn(
            "overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-200",
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
                  "relative flex items-center gap-2 px-4 py-3 rounded-xl",
                  "text-sm text-gray-700 cursor-pointer",
                  "hover:bg-primary-50 hover:text-primary-900",
                  "focus:bg-primary-50 focus:text-primary-900 focus:outline-none",
                  "transition-colors duration-150",
                  "data-[state=checked]:bg-primary-100 data-[state=checked]:text-primary-900 data-[state=checked]:font-medium"
                )}
              >
                <Select.ItemText>
                  <span>{option.icon} {option.label}</span>
                </Select.ItemText>
                <Select.ItemIndicator className="ml-auto">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
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
