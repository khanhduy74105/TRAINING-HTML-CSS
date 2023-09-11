'use client'
import { API_URL } from '@/src/constants'
import { AuthContext } from '@/src/context/AuthContext'
import { setUserDataToLocal } from '@/src/utils'
import { useContext, useState } from 'react'
interface RegisterFormProps {
    changeAction: () => void
}
const RegisterForm: React.FC<RegisterFormProps> = ({
    changeAction
}) => {
    const { setUser } = useContext(AuthContext)
    const [reigsterData, setReigsterData] = useState<any>({
        username: null,
        password: null,
    })

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReigsterData((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async () => {
        if (reigsterData.password !== reigsterData.confirm_password) {
            alert('Password not match')
            return
        }

        if (reigsterData.username && reigsterData.password) {
            const response = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(reigsterData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                setUserDataToLocal(data.data)
                setUser(data.data)
            } else {
                alert(data.msg)
            }
        }
    }
    return (
        <form className="register-form" onSubmit={(e) => { e.preventDefault() }}>
            <input type="text" placeholder="name" onChange={onChangeInput} name='username' />
            <input type="password" placeholder="password" className="password" onChange={onChangeInput} name='password' />
            <input type="password" placeholder="password" className="confirm_password" onChange={onChangeInput} name='confirm_password' />
            <button id="register-btn" onClick={onSubmit}>create</button>
            <p className="message">Already registered? <a href="#" id="switch-to-login" onClick={changeAction}>Sign In</a></p>
        </form>
    )
}

export default RegisterForm