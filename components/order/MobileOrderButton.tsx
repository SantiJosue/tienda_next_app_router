"use client"

import { useState } from "react"
import OrderSummary from "./OrderSummary"

export default function MobileOrderButton() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <section className="md:hidden">
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="fixed bottom-5 right-5 z-40 rounded-full bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg"
            >
                Mostrar pedido
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex">

                    {/* Fondo oscuro */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel */}
                    <div className="relative ml-auto h-full w-full max-w-72 bg-white shadow-xl">

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-900"
                        >
                            ✕
                        </button>

                        <OrderSummary />

                    </div>
                </div>
            )}
        </section>
    )
}