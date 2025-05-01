import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$uid/shop/custom/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$uid/shop/custom/"!</div>
}
