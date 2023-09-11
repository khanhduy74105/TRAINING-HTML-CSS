'use client'

import React, { useState } from 'react'
import './style.css'
import RegisterForm from './Form/RegisterForm'
import LoginForm from './Form/LoginForm'
const page = () => {
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true)
    return (
        <div className="form">
            {!isLoginForm ?
                <RegisterForm changeAction={() => setIsLoginForm(prev => !prev)} />
                :
                <LoginForm changeAction={() => setIsLoginForm(prev => !prev)} />
            }

        </div>
    )
}

export default page