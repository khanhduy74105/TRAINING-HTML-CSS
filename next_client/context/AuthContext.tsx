'use client'

import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { ICartProduct, IUser } from '../types';
import ClientService from '../actions/ClientService';

interface AuthContextType {
    user: Partial<IUser> | null,
    setUser: any,
    cartProducts: ICartProduct[],
    setcartProducts: any,
    isOpenCart: boolean,
    setIsOpenCart: any
}
export const AuthContext = createContext<AuthContextType>({
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

    useEffect(() => {
        if (localStorage.getItem('user')) {
            ClientService.getUserInfo()
                .then(data => { 
                    if (data.success) {
                        setUser(data.data)
                    }
                })
        }
    }, [])

    const valueObj: AuthContextType = {
        user,
        setUser,
        cartProducts,
        setcartProducts,
        isOpenCart,
        setIsOpenCart
    }

    return (
        <AuthContext.Provider value={valueObj}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider