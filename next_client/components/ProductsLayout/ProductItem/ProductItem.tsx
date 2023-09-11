"use client"


import React, { useContext, useState } from 'react'
import { ICartProduct, IProduct } from '@/src/types'
import { AuthContext } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
import './style.css'
import ClientService from '@/src/actions/ClientService'

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
                <div className="product_wrapper">
                    <img src={images && images[0]} alt="" />

                    <div className="product_wrapper--layout">
                        <img src={images && images[1]} alt="" />

                        <div className="btn-group">
                            <button>Quick view</button>

                            <button className="btn-add-to-cart" style={{ display: 'flex', alignItems: "center", justifyContent: "center", gap: "8px" }}
                                onClick={() => handleAddProduct(_id)}
                            >
                                {loading && <img src="./assets/90-ring.svg" alt="" className="loader-spinner" style={{ width: '16px', height: '16px', }} />}
                                Add to cart
                            </button>
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