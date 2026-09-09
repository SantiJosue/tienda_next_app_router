import { Product } from '@/src/generated/prisma/client'
import { formatCurrency, getImagePath } from '@/src/utils'
import Image from 'next/image'
import React from 'react'
import AddProductButton from './AddProductButton'

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product}: ProductCardProps) {
    const imagePath = getImagePath(product.image)
  
    return (
    <section className='border bg-white relative'>
        <Image 
            src={imagePath}
            alt={`Imagen platillo ${product.name}`}
            width={400}
            height={500}
        />
        <article className='p-5'>
            <h3 className='text-2xl font-bold'>{product.name}</h3>
            <p className='mt-5 font-black text-4xl text-amber-500'>{formatCurrency(product.price)}</p>
            <AddProductButton product={product} />
        </article>
    </section>
  )
}
