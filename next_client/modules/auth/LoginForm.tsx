import AuthApi from '@/apis/AuthApi'
import Input from '@/components/core/input/Input'
import { UserSlice } from '@/redux/slices/authSlice'
import { setUserDataToLocal } from '@/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'

interface LoginFormProps {
    changeAction: () => void
}
const LoginForm: React.FC<LoginFormProps> = ({
    changeAction
}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const { setUser } = useContext(AuthContext)
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
        setIsLoading(true)
        if (loginData.username && loginData.password) {
            const data = await AuthApi.loginUser(loginData)
            if (data.success) {
                const resInfo = await AuthApi.getUserInfo()
                if (resInfo.success) {
                    console.log(resInfo.data)
                    dispatch(UserSlice.actions.set(resInfo.data))
                    setUserDataToLocal(resInfo.data)
                    router.push('/')
                }
            } else {
                alert(data.msg)
            }
        }
        setIsLoading(false)

    }
    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Username</label>
                        <Input onChange={onChangeInput} placehoder='Enter username' name='username' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <Input onChange={onChangeInput} placehoder='Enter password' name='password' type='password' />

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
            {isLoading && <div className="absolute right-0 left-0 bottom-0 top-0 bg-[#0000002a] flex items-center justify-center">
                <Image src='/assets/90-ring.svg' alt='a' width={80} height={80} />
            </div>}
        </div>
    )
}

export default LoginForm