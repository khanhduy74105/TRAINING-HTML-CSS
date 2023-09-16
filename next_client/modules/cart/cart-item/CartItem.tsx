'use client'

import { AuthContext } from '@/context/AuthContext'
import { ICartProduct } from '@/types'
import { useState, useContext } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { GrNext, GrPrevious } from 'react-icons/gr'
import './style.css'
interface CartItemProps {
  data: ICartProduct
}
const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {updateCartProduct, removeItem} = useContext(AuthContext)
  const [amount, setAmount] = useState<number>(data.amount)
  const onUpdateAmount = async (newAmount: number) => {
    setIsLoading(true)
    await updateCartProduct(data._id, newAmount)
    setAmount(newAmount)
    setIsLoading(false)
  }

  const onRemoveItem = async () => {
    setIsLoading(true)
    await removeItem(data._id)
    setIsLoading(false)
  }
  return (
    <div className={`cart-products-item product_${data._id} row`}>
      <div className="img-wrapper col-4 col-item">
        <img src={`${data.item.images[0]}`} alt="" />
        {isLoading && <div className="loader-spinner-wrapper">
          <img src="./assets/90-ring.svg" alt="" className="loader-spinner" />
        </div>}
      </div>
      <div className="item-content col-7 col-item">
        <p>{data.item.name} </p>
        <span>{data.item.price} </span>
        <div className="amount-box">
          <button className="decrease-btn" onClick={() => onUpdateAmount(amount - 1)}>
            <GrPrevious />
          </button>
          <input className='blur-listener-input appearance-none ' type="number" 
            value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} onBlur={() => {onUpdateAmount(amount)}} disabled={isLoading} />
          <button className="increase-btn" onClick={() => onUpdateAmount(amount + 1)}>
            <GrNext />
          </button>
        </div>
      </div>
      <div className="col-1 col-item" onClick={() => onRemoveItem()}>
        <AiOutlineClose />
      </div>
    </div>
  )
}

export default CartItem