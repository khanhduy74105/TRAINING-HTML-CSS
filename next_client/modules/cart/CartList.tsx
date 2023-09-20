'use client'

import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { AiOutlineClose, AiFillTag, AiFillAlert, AiFillAccountBook, AiFillPieChart } from 'react-icons/ai'
import CartSlider from './cart-slider/CartSlider'
import { AuthContext } from '@/context/AuthContext'
import CartItem from './cart-item/CartItem'
import CartSubTotal from './cart-subtotal/CartSubTotal'
import { useSelector } from 'react-redux'
import { cartProductsSelector } from '@/redux/selectors'
const CartList
  = () => {
    const { setIsOpenCart, isOpenCart, getCartProducts } = useContext(AuthContext)
    const cartProducts = useSelector(cartProductsSelector)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
      async function fetchData() {
        if (!isOpenCart) {
          return;
        }
        try {
          setIsLoading(true)
          await getCartProducts()
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      fetchData()
        .finally(() => setIsLoading(false));
    }, [isOpenCart, getCartProducts])


    return isOpenCart && (
      <div id="cart-layout" onClick={() => setIsOpenCart(false)}>
        <div className="cart-section" onClick={e => e.stopPropagation()}>
          <div className="cart-header">
            <h4>Your cart</h4>
            <span onClick={() => setIsOpenCart(false)}>
              <AiOutlineClose />
            </span>
          </div>

          <div className="cart-products">
            {cartProducts?.map((cartProductItem: any) => {
              return <CartItem key={cartProductItem._id} data={cartProductItem} />
            })}
          </div>

          <div className="cart-labels">
            <div className="">
              <AiFillAlert />
            </div>
            <div className="">
              <AiFillTag />
            </div>
            <div className="">
              <AiFillAccountBook />
            </div>
            <div className="">
              <AiFillPieChart />
            </div>
            <div className="">
              <AiFillTag />
            </div>
          </div>

          <CartSlider />

          <CartSubTotal />
          {isLoading && <div className="cart-loader">
            <img src="./assets/90-ring.svg" alt="" className="loader-spinner show" />
          </div>}
        </div>
      </div>
    )
  }

export default CartList
