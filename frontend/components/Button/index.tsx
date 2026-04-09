import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-orange-500 text-white hover:bg-orange-600',
        'green-secondary': 'bg-green-100 text-green-700',
        'orange-secondary': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
        'blue-secondary': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
        outline:
          'border border-orange-500 bg-orange-50 text-orange-600 hover:bg-orange-100',
        secondary:
          'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200',
        ghost:
          'bg-transparent hover:bg-gray-100 text-gray-400 hover:text-red-500'
      },
      size: {
        default: 'h-12 px-8',
        md: 'h-10 px-4 text-sm',
        sm: 'h-8 px-3 text-xs',
        icon: 'size-8 rounded-lg'
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: true
    }
  }
)

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({
  className,
  variant,
  size,
  fullWidth,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  )
}
