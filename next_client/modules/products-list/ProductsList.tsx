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
                // <Suspense fallback={<div>Loading product..</div>} key={product._id} >
                    <ProductItem  {...product}  key={product._id}/>
                // </Suspense>
            ))}
        </div>
    )
}

export default ProductsLayout