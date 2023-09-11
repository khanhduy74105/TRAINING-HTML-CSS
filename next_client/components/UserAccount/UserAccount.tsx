"use client"

import React, { useContext } from 'react'
import { AuthContext } from '@/src/context/AuthContext'
import './style.css'
import ClientService from '@/src/actions/ClientService'

const UserAccount = () => {
    const { user, setUser } = useContext(AuthContext)
    return (
        <div className="">
            {user ? (
                <div className="auth_block" >
                    <span>{user?.username}</span>
                    <span id='logout-btn' onClick={async () => {
                        setUser(null)
                        await ClientService.logoutUser()
                        localStorage.removeItem('user')
                    }}>logout</span>
                </div>
            )
                : (
                    <a href="/auth">Login</a>
                )
            }
        </div>
    )
}

export default UserAccount