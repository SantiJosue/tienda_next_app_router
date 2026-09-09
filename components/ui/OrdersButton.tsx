"use client"
import { useRouter } from "next/navigation"

export default function OrdersButton() {
  const router = useRouter()

  return (
    <button 
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
      onClick={() => router.push('/orders')}
    >
      Ver órdenes listas
    </button>
  )
}
