'use client'
import withAuth from '@/HOCs/withAuth'
import RegisterForm from '@/modules/auth/RegisterForm'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const router = useRouter()
    return (
        <div>
            <RegisterForm changeAction={() => router.push('./login')} />
        </div>
    )
}

export default withAuth(Page)