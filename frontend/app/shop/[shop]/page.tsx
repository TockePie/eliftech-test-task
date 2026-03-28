import ProductCard from '@/components/ProductCard'
import ScrollArea from '@/components/ScrollArea'
import { getProducts } from '@/lib/get-products'
import { getShops } from '@/lib/get-shops'

interface Props {
  params: Promise<{ shop: string }>
}

export default async function ShopPage({ params }: Props) {
  const { shop: slug } = await params

  const shops = await getShops()
  const currentShop = shops.find((s) => s.href === slug)
  if (!currentShop) {
    return <div className="p-10 text-center">Shop not found</div>
  }

  const products = await getProducts(currentShop.id)

  return (
    <section className="h-full rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
      <ScrollArea className="h-full flex-1">
        <h1 className="mb-6 text-2xl font-bold capitalize">
          {currentShop.name} Menu
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </ScrollArea>

      {products.length === 0 && (
        <p className="text-gray-500">No products available in this shop yet.</p>
      )}
    </section>
  )
}
