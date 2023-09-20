"use client"

import React, { Suspense, useContext, useState } from 'react'
import {  IProduct } from '@/types'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import './style.css'
import Button from '@/components/core/button/Button'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { userSelector } from '@/redux/selectors'

type ProductItemProps =IProduct
const ProductItem: React.FC<ProductItemProps> = (props) => { 
    const { setIsOpenCart, addToCart } = useContext(AuthContext)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const user = useSelector(userSelector)

    const handleAddProduct = async (_id: string | undefined) => {
        if (!user.username) {
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
        <div className={`col-item col-4 product_item_${props._id}`}>
            <div className="product_item">
                <div className="product_wrapper group">
                        <Image src={props.images[0]} sizes='100%' fill={true} alt="image" blurDataURL='/90-ring.svg'/>
                        <div className="product_wrapper--layout">
                            <Image src={props.images[1]} sizes='100%' fill={true} alt="image" />
                            <div className="btn-group">
                                <Button type={'filled'} text='Quick view'/>

                                <Button type={'filled'} text='Add to cart' action={() => handleAddProduct(props._id)} isLoading={loading}/>
                            </div>
                        </div>
                </div>
                <div className="product_item--title">
                    <span>{props.name}</span>
                    <span>{props.price}</span>
                </div>
            </div>
        </div >
    )
}

export default ProductItem