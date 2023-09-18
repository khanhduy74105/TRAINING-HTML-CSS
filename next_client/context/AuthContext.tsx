'use client'

import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { ICartProduct, IUser } from '../types';
import AuthApi from '@/apis/AuthApi';
import CartProductsApi from '@/apis/CartProductsApi';

interface AuthContextType {
    user: Partial<IUser> | null,
    setUser: any,
    cartProducts: ICartProduct[],
    setcartProducts: any,
    isOpenCart: boolean,
    setIsOpenCart: any
}
export const AuthContext = createContext<AuthContextType & any>({
    user: null,
    setUser: () => { },
    cartProducts: [],
    setcartProducts: () => { },
    isOpenCart: false,
    setIsOpenCart: () => { }
})

interface AuthContextProps {
    children: React.ReactNode
}
const AuthContextProvider: React.FC<AuthContextProps> = ({
    children
}) => {
    const [user, setUser] = useState<Partial<IUser> | null>(null)
    const [cartProducts, setcartProducts] = useState<ICartProduct[]>([])
    const [isOpenCart, setIsOpenCart] = useState<boolean>(false)



    const getCartProducts = async () => {
        const data = await CartProductsApi.getCartProducts();
        setcartProducts((prev: any) => [...data])
    }

    const addToCart = async (_id: string) => {
        const data = await CartProductsApi.addProduct(_id)
        if (data.success) {
            setcartProducts((prev: ICartProduct[]) => {
                return prev.map((cartProduct) => {
                    return cartProduct.item._id === _id ? {
                        ...cartProduct,
                        amount: data.data.quantity
                    } : cartProduct
                })
            })
        }
    }
    const updateCartProduct = async (_id: string, newAmount: number) => {
        if (newAmount <= 0) {
            await removeItem(_id)
        }

        const respone = await CartProductsApi.updateCartProduct(_id, newAmount)
        if (respone.success) {
            setcartProducts((prev: ICartProduct[]) => {
                return prev.map(current => current._id === _id ? {
                    ...current,
                    amount: respone.data.quantity
                }
                    :
                    current
                )
            })
        }
    }

    const removeItem = async (_id: string) => {
        const respone = await CartProductsApi.deleteCartProduct(_id)
        if (respone.success) {
            setcartProducts((prev: ICartProduct[]) => {
                return prev.filter(current => current._id !== _id)
            })
        }
    }

    const logoutUser = async ()=>{
        await AuthApi.logoutUser()
        setUser(null)
        localStorage.removeItem('user')
    }
    const valueObj: AuthContextType & any = {
        user,
        setUser,
        cartProducts,
        setcartProducts,
        isOpenCart,
        setIsOpenCart,
        getCartProducts,
        addToCart,
        updateCartProduct,
        removeItem,
        logoutUser
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            AuthApi.getUserInfo()
                .then(data => {
                    if (data.success) {
                        setUser(data.data)
                    }
                })
        }
    }, [])
    return (
        <AuthContext.Provider value={valueObj}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider