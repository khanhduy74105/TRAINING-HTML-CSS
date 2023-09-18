'use client'

import React from 'react'
import AuthLayout from '@/layouts/auth/AuthLayout'
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