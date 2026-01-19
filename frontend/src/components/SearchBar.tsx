import { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void
}

export default function SearchBar({ onSearch, className, ...props }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        className={cn(
          "w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-300",
          "bg-white/80 backdrop-blur-sm",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          "placeholder:text-gray-400",
          "transition-all duration-200",
          className
        )}
        placeholder="Search by name or expertise..."
        onChange={(e) => onSearch(e.target.value)}
        {...props}
      />
    </div>
  )
}
