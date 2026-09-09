import { OrderWithProducts } from "@/src/types"

type LatestOrderItemProps = {
    order: OrderWithProducts
}

export default function LatestOrderItem({ order }: LatestOrderItemProps) {
  return (
    <section className="bg-white border-l-4 border-lime-400 shadow p-5 space-y-5 rounded-lg">
        <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-slate-600">
                Cliente: {order.name}
            </p>

            <span className="bg-lime-400 text-white px-3 py-1 rounded-full text-sm font-bold">
                ✓ Lista
            </span>
        </div>

        <ul
            className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
            role="list"
        >
            {order.orderProducts.map(product => (
                <li
                    key={product.id}
                    className="flex py-6 text-lg"
                >
                    <p>
                        <span className="font-bold">
                            ({product.quantity}){" "}
                        </span>
                        {product.product.name}
                    </p>
                </li>
            ))}
        </ul>
    </section>
  )
}