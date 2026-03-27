import LinkItem from './link'

export default function Header() {
  return (
    <header className="flex gap-8 p-5">
      <LinkItem href="/">Shop</LinkItem>
      <div className="border-l-2 border-l-gray-600" />
      <LinkItem href="/cart">Shopping Cart</LinkItem>
    </header>
  )
}
