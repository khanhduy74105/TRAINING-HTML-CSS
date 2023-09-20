"use client"

import AuthApi from "@/apis/AuthApi"
import Button from "@/components/core/button/Button"
import { AuthContext } from "@/context/AuthContext"
import { setUser } from "@/redux/actions"
import { userSelector } from "@/redux/selectors"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const UserAccount = () => {
    const dispatch = useDispatch()
    const user = useSelector((state:any) => state.user)
    const router = useRouter()

    const onLogout = async ()=>{
        await AuthApi.logoutUser()
        dispatch(setUser(null))
        localStorage.removeItem('user')
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