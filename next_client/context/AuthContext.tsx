'use client'

import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import CartProductsApi from '@/apis/CartProductsApi';
import { useDispatch, useSelector } from 'react-redux';
import ProductApi from '@/apis/ProductApi';
import { userSelector } from '@/redux/selectors';
import cartProductsSlice from '@/redux/slices/cartProductsSlice';

interface AuthContextType {
    isOpenCart: boolean,
    setIsOpenCart: any
}
export const AuthContext = createContext<AuthContextType & any>({
    isOpenCart: false,
    setIsOpenCart: () => { }
})

interface AuthContextProps {
    children: React.ReactNode
}
const AuthContextProvider: React.FC<AuthContextProps> = ({
    children
}) => {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()
    const [isOpenCart, setIsOpenCart] = useState<boolean>(false)

    const addToCart = async (_id: string) => {
        const data = await CartProductsApi.addProduct(_id)
        if (data.success) {
            const response = await ProductApi.getProductById(data.data.product_id)
            dispatch(cartProductsSlice.actions.add({
                _id: data.data._id,
                item: response.data,
                amount: data.data.quantity
            }))
        }else{
            console.log('Cannot add')
        }
    }
    const updateCartProduct = async (_id: string, newAmount: number) => {
        if (newAmount <= 0) {
            await removeItem(_id)
            return
        }
        const respone = await CartProductsApi.updateCartProduct(_id, newAmount)
        if (respone.success) {
            console.log(respone)
            dispatch(cartProductsSlice.actions.update({_id : _id,quantity:  respone.data.quantity}))
        }
    }

    const removeItem = async (_id: string) => {
        const respone = await CartProductsApi.deleteCartProduct(_id)
        if (respone.success) {
            dispatch(cartProductsSlice.actions.delete(_id))
        }
    }

    useEffect(()=>{
        if (user && isOpenCart) {
          
        }
    },[isOpenCart, user])

    const valueObj: AuthContextType & any = {
        isOpenCart,
        setIsOpenCart,
        addToCart,
        updateCartProduct,
        removeItem,
    }

    return (
        <AuthContext.Provider value={valueObj}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider