import React from 'react'


type Props = {
  type?:string,
  placehoder: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  name: string
}

const Input = (props: Props) => {
  return (
    <div className=''>
      <input className='w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500 my-1' 
        type={props.type} 
        placeholder={props.placehoder} 
        onChange={props.onChange}
        name={props.name}
      />
    </div>
  )
}

export default Input