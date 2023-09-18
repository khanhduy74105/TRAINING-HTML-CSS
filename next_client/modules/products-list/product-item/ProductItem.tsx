"use client"

import React, { Suspense, useContext, useState } from 'react'
import {  IProduct } from '@/types'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import './style.css'
import Button from '@/components/core/button/Button'
import Image from 'next/image'
import { imageLoader } from '@/components/core/imageLoader/imageLoader'

type ProductItemProps = Partial<IProduct>
const ProductItem: React.FC<ProductItemProps> = ({
    _id,
    images =[],
    name,
    price
}) => { 
    const { user, setIsOpenCart, addToCart } = useContext(AuthContext)
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    const handleAddProduct = async (_id: string | undefined) => {
        if (!user) {
            router.push('/auth/login')
            return
        }
        if (typeof _id === 'undefined') {
            return
        }
        setLoading(true)
        await addToCart(_id)
        setLoading(false)
        setIsOpenCart(true)
    }
    return (
        <div className={`col-item col-4 product_item_${_id}`}>
            <div className="product_item">
                <div className="product_wrapper group">
                    <Suspense fallback={<div>Loading image</div>}>
                        <Image src={images[0]} sizes='auto' fill={true} alt="image" blurDataURL='/90-ring.svg'/>
                        <div className="product_wrapper--layout">
                            <Image src={images[1]} sizes='auto' fill={true} alt="image" />
                            <div className="btn-group">
                                <Button type={'filled'} text='Quick view'/>

                                <Button type={'filled'} text='Add to cart' action={() => handleAddProduct(_id)} isLoading={loading}/>
                            </div>
                        </div>
                    </Suspense>
                </div>
                <div className="product_item--title">
                    <span>{name}</span>
                    <span>{price}</span>
                </div>
            </div>
        </div >
    )
}

export default ProductItem