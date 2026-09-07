'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/Button'

export default function ActiveFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const categories = searchParams.getAll('category')
  const sortBy = searchParams.get('sortBy')

  if (categories.length === 0 && !sortBy) return null

  const removeCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.getAll('category').filter((c) => c !== cat)
    params.delete('category')
    current.forEach((c) => params.append('category', c))
    router.push(`${pathname}?${params.toString()}`)
  }

  const removeSort = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('sortBy')
    params.delete('sortOrder')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-gray-500">Active:</span>
      {categories.map((cat) => (
        <Button
          key={cat}
          variant="orange-secondary"
          size="sm"
          fullWidth={false}
          onClick={() => removeCategory(cat)}
          className="gap-1 rounded-full"
        >
          {cat}
        </Button>
      ))}

      {sortBy && (
        <Button
          variant="blue-secondary"
          size="sm"
          fullWidth={false}
          onClick={removeSort}
          className="gap-2 rounded-full"
        >
          Sorted by: {sortBy}
        </Button>
      )}
    </div>
  )
}
