'use client'
import withAuth from '@/HOCs/withAuth'
import { AuthContext } from '@/context/AuthContext'
import LoginForm from '@/modules/auth/LoginForm'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

type Props = {}

const Page = (props: Props) => {
    
    const router= useRouter()
    let page = <></>
    const {user} = useContext(AuthContext)

    if (!user) {
        page = (
            <div>
                <LoginForm changeAction={() => router.push('./register')} />
            </div>
        )
    }
    return page
}

export default withAuth(Page)