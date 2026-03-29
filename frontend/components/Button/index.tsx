import { PropsWithChildren } from 'react'

import { cn } from '@/lib/cn'

interface Props
  extends PropsWithChildren, React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'green-secondary' | 'outline' | 'secondary'
  size: 'default' | 'md'
}

export const STYLES: Record<Props['variant'] | Props['size'], string> = {
  primary: 'bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300',
  'green-secondary': 'bg-green-100 text-green-700',
  outline:
    'border-orange-500 bg-orange-50 text-orange-600 ring-1 ring-orange-500',
  secondary:
    'border-transparent bg-gray-50 text-gray-600 hover:border-gray-200 hover:bg-gray-100',
  default: 'py-4',
  md: 'py-2'
}

export default function Button({
  variant = 'primary',
  size = 'default',
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        'w-full cursor-pointer rounded-2xl font-bold transition-all duration-200',
        STYLES[variant],
        STYLES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
