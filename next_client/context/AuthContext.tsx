'use client'

import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { ICartProduct, IUser } from '../types';
import AuthApi from '@/apis/AuthApi';
import CartProductsApi from '@/apis/CartProductsApi';
import { useDispatch, useSelector } from 'react-redux';
import { addCartProduct, removeCartProductAction, setCartPropducts, updateCartProductAction } from '@/redux/actions';
import ProductApi from '@/apis/ProductApi';
import { userSelector } from '@/redux/selectors';

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

    const getCartProducts = async () => {
        const data = await CartProductsApi.getCartProducts();
        dispatch(setCartPropducts(data))
    }

    const addToCart = async (_id: string) => {
        const data = await CartProductsApi.addProduct(_id)
        if (data.success) {
            const response = await ProductApi.getProductById(data.data.product_id)
            dispatch(addCartProduct({
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
            dispatch(updateCartProductAction(_id, respone.data.quantity))
        }
    }

    const removeItem = async (_id: string) => {
        const respone = await CartProductsApi.deleteCartProduct(_id)
        if (respone.success) {
            dispatch(removeCartProductAction(_id))
        }
    }

    useEffect(()=>{
        if (user && isOpenCart) {
            const fetchCarts = async ()=>{
                await getCartProducts()
            }
    
            fetchCarts()
        }
    },[isOpenCart, user])

    const valueObj: AuthContextType & any = {
        isOpenCart,
        setIsOpenCart,
        getCartProducts,
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