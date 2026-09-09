"use server"
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(formData: FormData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.product.delete({
        where: {
            id
        }
    })

    revalidatePath('/admin/products')
    
    return {
        success: true,
        message: 'Producto eliminado correctamente'
    }
    } catch (error) {
        return {
            success: false,
            message: 'No se pudo eliminar el producto'
        }
    }
}