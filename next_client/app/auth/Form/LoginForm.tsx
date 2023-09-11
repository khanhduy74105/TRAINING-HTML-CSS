import ClientService from '@/src/actions/ClientService'
import { API_URL } from '@/src/constants'
import { AuthContext } from '@/src/context/AuthContext'
import { setUserDataToLocal } from '@/src/utils'
import React, { useContext, useState } from 'react'

interface LoginFormProps {
    changeAction: () => void
}
const LoginForm: React.FC<LoginFormProps> = ({
    changeAction
}) => {
    const { setUser } = useContext(AuthContext)
    const [loginData, setLoginData] = useState<any>({
        username: null,
        password: null
    })

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async () => {
        if (loginData.username && loginData.password) {
            const response = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(loginData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                const resInfo = await ClientService.getUserInfo()
                if (resInfo.success) {
                    setUser(resInfo.data)
                    setUserDataToLocal(resInfo.data)

                }
            } else {
                alert(data.msg)
            }
        }
    }
    return (
        <form className="login-form" onSubmit={(e) => { e.preventDefault() }} method='POST' action='/'>
            <input onChange={onChangeInput} type="text" placeholder="username" name="username" />
            <input onChange={onChangeInput} type="password" placeholder="password" name="password" />
            <button id="login-btn" onClick={onSubmit}>login</button>
            <p className="message">Not registered? <a href="#" id="switch-to-register" onClick={changeAction}>Create an account</a></p>
        </form>
    )
}

export default LoginForm