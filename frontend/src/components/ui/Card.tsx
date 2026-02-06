import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-[#171717] border border-white/10",
      glass: "bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10",
      elevated: "bg-[#1a1a1a] border border-white/10 shadow-xl shadow-black/20"
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-6 transition-all duration-200",
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
