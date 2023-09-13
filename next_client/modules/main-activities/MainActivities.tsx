'use client'
import React, { useContext } from 'react'
import ProductsLayout from '../products-layout/ProductsLayout'
import { IProduct } from '@/types'
import CartLayout from '../cart/CartLayout'
import { AuthContext } from '@/context/AuthContext'

const MainActivities = ({ products }: { products: IProduct[] }) => {
  const { isOpenCart } = useContext(AuthContext)

  return (
    <div className="" style={{ width: '100%', backgroundColor: 'whitesmoke' }}>
      <ProductsLayout products={products} />
      {isOpenCart && <CartLayout />}
    </div>
  )
}

export default MainActivities