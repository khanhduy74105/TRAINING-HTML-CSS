"use client"

import Button from "@/components/core/button/Button"
import { AuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useContext } from "react"


const UserAccount = () => {
    const {logoutUser, user} = useContext(AuthContext)
    const router = useRouter()

    const onLogout = async ()=>{
        await logoutUser
    }
    return (
        <div className="flex items-center justify-end gap-21"> 
        {!user 
        ?   
        <Button type="label" text="Login" action={() => {
                router.push('/auth/login')
        }}/>
        :
        <>
            <span className="mr-2">
                Hi, {user.username}
            </span>
            <Button type="label" text="Logout" action={onLogout}/>
         </>
        } 
        </div>
    )
}

export default UserAccount