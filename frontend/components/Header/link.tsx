'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  href: string
}

export default function LinkItem({ href, children }: Props) {
  const pathname = usePathname()
  const currentPath = `/${pathname.split('/')[1]}`

  return (
    <Link
      href={href}
      className={
        currentPath === href ? 'font-bold text-orange-600' : 'text-gray-600'
      }
    >
      {children}
    </Link>
  )
}
