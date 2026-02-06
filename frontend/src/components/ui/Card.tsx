import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-white border border-gray-200",
      glass: "bg-white/80 backdrop-blur-md border border-white/50 shadow-lg",
      elevated: "bg-white shadow-xl border border-gray-100"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl p-6 transition-all duration-200",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
