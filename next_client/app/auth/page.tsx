'use client'

import React, { useContext, useEffect, useState } from 'react'
import RegisterForm from '../../modules/form/RegisterForm'
import LoginForm from '../../modules/form/LoginForm'
import AuthLayout from '@/layouts/auth/AuthLayout'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
const page = () => {
    const router = useRouter()
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true)
    const {user} = useContext(AuthContext)
    
    useEffect(()=>{
        if (user) {
            router.push('/')
        }
    },[user])

    return (<AuthLayout>
            <div className="form flex items-center justify-center mt-10">
                {!isLoginForm ?
                    <RegisterForm changeAction={() => setIsLoginForm(true)}/>
                    :
                    <LoginForm changeAction={() => setIsLoginForm(false)} />
                }
            </div>
        </AuthLayout>)
}

export default page