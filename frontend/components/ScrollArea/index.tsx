import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string
}

export default function ScrollArea({ className, children }: Props) {
  return <div className={`${className} h-96 overflow-y-auto`}>{children}</div>
}
