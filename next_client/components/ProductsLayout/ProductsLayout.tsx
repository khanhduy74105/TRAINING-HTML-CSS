'use client'

import React from 'react'
import ProductItem from './ProductItem/ProductItem'
import { IProduct } from '@/src/types'

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