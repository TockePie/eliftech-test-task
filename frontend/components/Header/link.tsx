'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  href: string
}

export default function LinkItem({ href, children }: Props) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={
        pathname === href ? 'font-bold text-blue-600' : 'text-gray-600'
      }
    >
      {children}
    </Link>
  )
}
