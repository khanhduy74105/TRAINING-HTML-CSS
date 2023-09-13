import React from 'react'

type ButonProps = {
    text: string,
    action?: ()=>void,
    type: 'label' | 'filled',
    isLoading? :boolean
}
const Button: React.FC<ButonProps> = ({
    text,
    action,
    type,
    isLoading
}) => {
  return (
    
    <div className={`
        flex justify-center items-center gap-2 flex-1 animate-bottomUp cursor-pointer transition-all
        ${type === 'label' && 'hover:text-dark-red'}
        ${type === 'filled' && 'bg-dark-blue py-2 text-white text-xl hover:bg-dark-red'}
    `}
        onClick={action}
    >
         {isLoading && <img src="./assets/90-ring.svg" alt="" className="loader-spinner" style={{ width: '20px', height: '20px', }} />}
        {text}
    </div>
  )
}

export default Button