"use client"

import { deleteProduct } from "@/actions/delete-product-action"
import { useState } from "react"
import { toast } from "react-toastify"

type DeleteProductButtonProps = {
    productId: number
    productName: string
}

export default function DeleteProductButton({
    productId,
    productName
}: DeleteProductButtonProps) {

    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)

        const formData = new FormData()
        formData.append("id", productId.toString())

        const result = await deleteProduct(formData)

        if (result.success) {
            toast.success(result.message)
            setIsOpen(false)
        } else {
            toast.error(result.message)
        }

        setIsDeleting(false)
    }

    return (
        <>
            {/* Botón eliminar */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-red-600 hover:text-red-800 font-bold cursor-pointer"
            >
                Eliminar
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2
                            id="delete-title"
                            className="text-lg font-semibold text-gray-900"
                        >
                            Eliminar producto
                        </h2>

                        <p className="mt-3 text-sm text-gray-600">
                            ¿Estás seguro que querés eliminar{" "}
                            <span className="font-semibold text-gray-900">
                                {productName}
                            </span>
                            ?
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Esta acción no se puede deshacer.
                        </p>

                        <div className="mt-6 flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                disabled={isDeleting}
                                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isDeleting ? "Eliminando..." : "Eliminar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}