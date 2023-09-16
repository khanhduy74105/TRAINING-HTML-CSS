'use client'

import React, { useContext, useEffect, useState } from 'react'
import RegisterForm from '../../modules/form/RegisterForm'
import LoginForm from '../../modules/form/LoginForm'
import AuthLayout from '@/layouts/auth/AuthLayout'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
const Page = ({children}:{children: React.ReactNode} ) => {


    return (<AuthLayout>
            <div className="form flex items-center justify-center mt-10">
                {
                    children
                }
            </div>
        </AuthLayout>)
}

export default Page