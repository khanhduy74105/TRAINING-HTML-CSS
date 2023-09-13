'use client'

type props = {
    children: React.ReactNode
}
const AuthLayout: React.FC<props> = ({ children }) => {
    return <>
        {children}
    </> 
}

export default AuthLayout