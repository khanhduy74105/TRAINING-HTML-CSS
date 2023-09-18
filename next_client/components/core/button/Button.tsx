import React from 'react'

type ButonProps = {
    text: string,
    action?: ()=>void,
    type: 'label' | 'filled',
    isLoading? :boolean
}
const Button: React.FC<ButonProps> = (props: ButonProps) => {
  return (
    
    <div className={`
        flex justify-center items-center gap-2 flex-1 animate-bottomUp cursor-pointer transition-all
        ${props.type === 'label' && 'hover:text-dark-red'}
        ${props.type === 'filled' && 'bg-dark-blue py-2 text-white text-xl hover:bg-dark-red'}
    `}
        onClick={props.action}
    >
         {props.isLoading && <img src="./assets/90-ring.svg" alt="" className="loader-spinner" style={{ width: '20px', height: '20px', }} />}
        {props.text}
    </div>
  )
}

export default Button