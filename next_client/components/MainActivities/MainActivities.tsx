'use client'
import React, { useContext } from 'react'
import ProductsHeader from '../ProductsHeader/ProductsHeader'
import ProductsLayout from '../ProductsLayout/ProductsLayout'
import { IProduct } from '@/src/types'
import CartLayout from '../Cart/CartLayout'
import { AuthContext } from '@/src/context/AuthContext'

const MainActivities = ({ products }: { products: IProduct[] }) => {
  const { isOpenCart } = useContext(AuthContext)

  return (
    <div className="" style={{ width: '100%', backgroundColor: 'whitesmoke' }}>
      <ProductsHeader />
      <ProductsLayout products={products} />
      {isOpenCart && <CartLayout />}
    </div>
  )
}

export default MainActivities