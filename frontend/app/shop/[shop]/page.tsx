import FilterModal from '@/components/FilterModal'
import ProductCard from '@/components/ProductCard'
import ScrollArea from '@/components/ScrollArea'
import { getProducts } from '@/lib/get-products'
import { getShops } from '@/lib/get-shops'

interface Props {
  params: Promise<{ shop: string }>
  searchParams: Promise<{
    category?: string | string[]
    sortBy?: string
    sortOrder?: string
  }>
}

export default async function ShopPage({ params, searchParams }: Props) {
  const [{ shop: slug }, query] = await Promise.all([params, searchParams])

  const shops = await getShops()
  const currentShop = shops.find((s) => s.href === slug)
  if (!currentShop)
    return <div className="p-10 text-center">Shop not found</div>

  const allProducts = await getProducts(currentShop.id)

  const categories = [...new Set(allProducts.map((p) => p.category))]
    .filter(Boolean)
    .sort()

  const selectedCats = query.category ? [query.category].flat() : undefined

  const displayProducts = await getProducts(
    currentShop.id,
    selectedCats,
    query.sortBy,
    query.sortOrder
  )

  return (
    <section className="h-full rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
      <ScrollArea className="h-full flex-1">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold capitalize">
            {currentShop.name} Menu
          </h1>

          <FilterModal categories={categories} />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </ScrollArea>

      {displayProducts.length === 0 && (
        <p className="text-gray-500">No products available in this shop yet.</p>
      )}
    </section>
  )
}
