'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '../Button'

interface Props {
  categories: string[]
}

export default function FilterModal({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentSort = `${searchParams.get('sortBy') || ''}:${searchParams.get('sortOrder') || ''}`

  const updateUrl = (updater: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString())
    updater(params)
    router.push(`${pathname}?${params.toString()}`)
  }

  const toggleCategory = (category: string) => {
    updateUrl((params) => {
      const current = params.getAll('category')
      params.delete('category')

      const next = current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category]

      next.forEach((c) => params.append('category', c))
    })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrl((params) => {
      const [sortBy, sortOrder] = e.target.value.split(':')
      if (sortBy && sortOrder) {
        params.set('sortBy', sortBy)
        params.set('sortOrder', sortOrder)
      } else {
        ;['sortBy', 'sortOrder'].forEach((k) => params.delete(k))
      }
    })
  }

  const clearFilters = () => {
    router.push(pathname)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="secondary"
        size="md"
        fullWidth={false}
        onClick={() => setIsOpen(true)}
        className="px-4"
      >
        Filters & Sort
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="mb-6 text-xl font-bold">Filters</h2>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Sort By
                </label>
                <select
                  value={currentSort === ':' ? '' : currentSort}
                  onChange={handleSortChange}
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Default</option>
                  <option value="price:ASC">Price (Low to High)</option>
                  <option value="price:DESC">Price (High to Low)</option>
                  <option value="name:ASC">Name (A-Z)</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      size="md"
                      fullWidth={false}
                      variant={
                        searchParams.getAll('category').includes(cat)
                          ? 'primary'
                          : 'secondary'
                      }
                      className="rounded-full"
                      onClick={() => toggleCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button
                size="md"
                variant="secondary"
                onClick={clearFilters}
                className="flex-1 font-semibold"
              >
                Clear All
              </Button>
              <Button
                size="md"
                variant="primary"
                onClick={() => setIsOpen(false)}
                className="flex-1 font-semibold"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
