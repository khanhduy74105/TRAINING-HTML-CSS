import ClientService from '@/actions/ClientService'
import Input from '@/components/core/input/Input'
import { API_URL } from '@/constants'
import { AuthContext } from '@/context/AuthContext'
import { setUserDataToLocal } from '@/utils'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

interface LoginFormProps {
    changeAction: () => void
}
const LoginForm: React.FC<LoginFormProps> = ({
    changeAction
}) => {
    const router = useRouter()
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
                    router.push('/')
                }
            } else {
                alert(data.msg)
            }
        }
    }
    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Username</label>
                        <Input onChange={ onChangeInput} placehoder='Enter username' name='username' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <Input onChange={ onChangeInput} placehoder='Enter password' name='password' type='password'/>

                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <button type="submit" 

                            className="bg-blue-500 text-white hover:bg-blue-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={onSubmit}
                        >Login</button>
                        <p>or <a href="#" id="switch5-to-register" className='hover:text-dark-blue' onClick={changeAction}>Create an account</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm