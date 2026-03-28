import LinkItem from './link'

export default function Header() {
  return (
    <header className="mx-5 flex gap-8 p-5">
      <LinkItem href="/shop">Shop</LinkItem>
      <div className="border-l-2 border-l-gray-400" />
      <LinkItem href="/cart">Shopping Cart</LinkItem>
    </header>
  )
}
