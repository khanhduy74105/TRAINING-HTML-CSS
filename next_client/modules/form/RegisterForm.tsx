'use client'
import Input from '@/components/core/input/Input'
import { API_URL } from '@/constants'
import { AuthContext } from '@/context/AuthContext'
import { setUserDataToLocal } from '@/utils'
import { Component, ReactNode } from 'react'
interface RegisterFormProps {
    changeAction: () => void
}

class RegisterForm extends Component<{changeAction: () => void}, {username:string, password: string, confirm_password: string}> {
    
    static contextType = AuthContext
    context!: React.ContextType<typeof AuthContext>
    constructor(props: RegisterFormProps){
        super(props);

        this.state = {
            username: '',
            password: '',
            confirm_password: '',
        }
    }

    onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState((prevState): any => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
    }

    onSubmit = async () => {
        const {username, password, confirm_password} = this.state
        const { setUser } = this.context 
        if (password !== confirm_password) {
            alert('Password not match')
            return
        }
        if (username ==='' || password ===''||confirm_password ==='' ){
            alert('missing field')
            return
        }
        console.log(this.state)
            const response = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            console.log(data)
            if (data.success) {
                setUserDataToLocal(data.data)
                setUser(data.data)
            } else {
                alert(data.msg)
            }
    }




    render(): ReactNode {
        const { changeAction } = this.props;
        return (
            <div className="bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Username</label>
                        <Input onChange={ this.onChangeInput} placehoder='Enter username' name='username' />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <Input onChange={ this.onChangeInput} placehoder='Enter password' name='password' type='password'/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Confirm password</label>
                        <Input onChange={ this.onChangeInput} placehoder='Confirm password' name='confirm_password' type='password'/>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <button type="submit" 

                            className="bg-blue-500 text-white hover:bg-blue-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={this.onSubmit}
                        >Register</button>
                        <p>or <a href="#" id="switch5-to-register" className='hover:text-dark-blue' onClick={changeAction}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

export default RegisterForm