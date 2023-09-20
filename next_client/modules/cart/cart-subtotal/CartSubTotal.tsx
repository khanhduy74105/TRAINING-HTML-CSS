'use client'

import { AuthContext } from '@/context/AuthContext'
import { ICartProduct } from '@/types'
import React, {  useContext, useMemo, useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import { cartProductsSelector } from '@/redux/selectors'

const CartSubTotal = () => {

    const cartProducts = useSelector(cartProductsSelector)
    const subtotalPrice = useMemo(() => {
        const calculateSubtotal = cartProducts.reduce((total: number, current: ICartProduct) => {
            return total + current.amount * current.item.price
        }, 0)
        return calculateSubtotal
    }, [cartProducts])
    return (
        <div className="cart-subtotal">
            <div className="subtotal-header">
                <span>Subtotal</span>
                <span className="subtotal-price">{subtotalPrice} $</span>
            </div>
            <p>Taxes and shipping calculated at checkout</p>
            <div>
                <input type="checkbox" name="" id=" " />
                <span>I agree with the terms and conditions.</span>
            </div>
            <div className="">
                <div className="btn">View cart</div>
                <div className="btn btn-add-to-cart">Check out</div>
            </div>
        </div>
    )
}

export default CartSubTotal