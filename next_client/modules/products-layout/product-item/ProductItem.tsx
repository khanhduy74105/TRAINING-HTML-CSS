"use client"


import React, { useContext, useState } from 'react'
import { ICartProduct, IProduct } from '@/types'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import './style.css'
import ClientService from '@/apis/ClientService'
import Button from '@/components/core/button/Button'

type ProductItemProps = Partial<IProduct> & {
    images: string[]
}
const ProductItem: React.FC<ProductItemProps> = ({
    _id,
    images,
    name,
    price
}) => { 
    const { user, setIsOpenCart, setcartProducts } = useContext(AuthContext)
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    const handleAddProduct = async (_id: string | undefined) => {
        if (!user) {
            router.push('/auth')
            return
        }
        if (typeof _id === 'undefined') {
            return
        }
        setLoading(true)
        const data = await ClientService.addProduct(_id)

        if (data.success) {
            setcartProducts((prev: ICartProduct[]) => {
                return prev.map((cartProduct) => {
                    return cartProduct.item._id === _id ? {
                        ...cartProduct,
                        amount: data.data.quantity
                    } : cartProduct
                })
            })
            setLoading(false)
            setIsOpenCart(true)
        }
    }
    return (
        <div className={`col-item col-4 product_item_${_id}`}>
            <div className="product_item">
                <div className="product_wrapper group">
                    <img src={images && images[0]} alt="" />
                    <div className="product_wrapper--layout">
                        <img src={images && images[1]} alt="" />
                        <div className="btn-group">
                            <Button type={'filled'} text='Quick view'/>

                            <Button type={'filled'} text='Add to cart' action={() => handleAddProduct(_id)} isLoading={loading}/>
                        </div>
                    </div>
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