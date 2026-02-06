import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
}

export default function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-white/10 text-[#A8A89A] border-white/20',
    success: 'bg-[#AAFF00]/10 text-[#AAFF00] border-[#AAFF00]/30',
    warning: 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30',
    danger: 'bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/30',
    info: 'bg-[#AAFF00]/8 text-[#AAFF00] border-[#AAFF00]/20'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider',
        variantStyles[variant],
        className
      )}
      style={{ fontFamily: "'Source Code Pro', monospace" }}
      {...props}
    >
      {children}
    </span>
  )
}
