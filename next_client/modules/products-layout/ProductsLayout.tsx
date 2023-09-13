'use client'

import React, { Suspense } from 'react'
import ProductItem from './product-item/ProductItem'
import { IProduct } from '@/types'

interface ProductsLayout {
    products: IProduct[]
}
const ProductsLayout: React.FC<ProductsLayout> = ({ products }) => {
    return (
        <div className='row'>
            {products && products.map((product: IProduct) => (
                <ProductItem  {...product} key={product._id} />
            ))}
        </div>
    )
}

export default ProductsLayout