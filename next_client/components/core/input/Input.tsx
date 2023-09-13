import React from 'react'


type Props = {
  type?:string,
  placehoder: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  name: string
}

const Input = ({type = 'text', placehoder, onChange, name}: Props) => {
  return (
    <div className=''>
      <input className='w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500 my-1' 
        type={type} 
        placeholder={placehoder} 
        onChange={onChange}
        name={name}
      />
    </div>
  )
}

export default Input