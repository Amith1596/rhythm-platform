import * as RadixAvatar from '@radix-ui/react-avatar'
import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string
  alt?: string
  fallback: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  }

  return (
    <RadixAvatar.Root
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-500 to-secondary-500",
        sizeStyles[size],
        className
      )}
    >
      <RadixAvatar.Image
        src={src}
        alt={alt || fallback}
        className="w-full h-full object-cover"
      />
      <RadixAvatar.Fallback
        className="w-full h-full flex items-center justify-center text-white font-semibold"
        delayMs={600}
      >
        {fallback}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}
