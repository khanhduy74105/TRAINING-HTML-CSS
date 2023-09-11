'use client'

import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { AiOutlineClose, AiFillTag, AiFillAlert, AiFillAccountBook, AiFillPieChart } from 'react-icons/ai'
import CartSlider from './CartSlider/CartSlider'
import { AuthContext } from '@/src/context/AuthContext'
import CartItem from './CartItem/CartItem'
import getCartProducts from '@/src/actions/getCartProducts'
import CartSubTotal from './CartSubtotal/CartSubTotal'
const CartLayout = () => {
  const { setIsOpenCart, isOpenCart, cartProducts, setcartProducts } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    async function fetchData() {
      if (!isOpenCart) {
        return;
      }
      try {
        setIsLoading(true)
        const data = await getCartProducts(cartProducts);
        setcartProducts((prev: any) => [...prev, ...data])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData()
      .finally(() => setIsLoading(false));
  }, [isOpenCart])

  useEffect(() => {
    const body = document.querySelector('body')
    if (isOpenCart) {
      // body?.setAttribute('over')
    }
  }, [isOpenCart])

  return (
    <div id="cart-layout" onClick={() => setIsOpenCart(false)}>
      <div className="cart-section" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h4>Your cart</h4>
          <span onClick={() => setIsOpenCart(false)}>
            <AiOutlineClose />
          </span>
        </div>

        <div className="cart-products">
          {cartProducts?.map((cartProductItem) => {
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

export default CartLayout