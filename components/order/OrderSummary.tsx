"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function OrderSummary() {
  const order = useStore((state) => state.order)
  const clearOrder = useStore((state) => state.clearOrder)
  const [orderCreated, setOrderCreated] = useState(false)
  const router = useRouter()
  const total = order.reduce((total, item) => total + (item.quantity * item.price), 0)

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }
    
    const result = OrderSchema.safeParse(data)
    if(!result.success) {
      result.error.issues.forEach(issue => toast.error(issue.message))
      return
    }

    const response = await createOrder(data)
    if(response?.errors) {
      response.errors.forEach(issue => toast.error(issue.message))
      return
    }

    toast.success('Pedido realizado correctamente')
    clearOrder()
    setOrderCreated(true)
  }

  return (
    <aside className="md:h-screen md:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

        {order.length === 0 ? (
          <p className="text-center my-10">El pedido esta vacio</p>
        ) : (
          <section className="mt-10">
            {order.map(product => (
              <ProductDetails key={product.id} product={product} />
            ))}
            <p className="text-2xl text-center mt-20">
              Total a pagar: {''}
              <span className="font-bold">{formatCurrency(total)}</span>
            </p>

            <form
              className="w-full mt-10 space-y-5"
              action={handleCreateOrder}
            >
              <input 
                type="text"
                placeholder="Tu nombre"
                className="bg-white border border-gray-100 p-2 w-full"
                name="name"
              />
              <input
                type="submit"
                className="py-2 rounded uppercase text-white text-center font-bold bg-black w-full cursor-pointer"
                value={'Confirmar Pedido'}
              />
            </form>
          </section>
        )}

        {orderCreated && (
          <button
            onClick={() => router.push('/orders')}
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          >Ver órdenes listas</button>
        )}

    </aside>
  )
}
