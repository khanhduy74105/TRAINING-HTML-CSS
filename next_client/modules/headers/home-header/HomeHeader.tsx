import UserAccount from '@/modules/user-account/UserAccount'
import Image from 'next/image'
import React from 'react'
import {BiMenuAltLeft} from 'react-icons/bi'
type Props = {}

const HomeHeader = (props: Props) => {
  return (
    <div className='flex justify-between items-center px-10 py-4 border-b-2 border-gray-200'>
        <div className="">
            <BiMenuAltLeft size={32}/>
        </div>
        <div className="">
            <Image
                alt='logo'
                src={'./assets/ocolus-logo.svg'}
                width={200}
                height={0}
            />
        </div>
        <div className="">
            <UserAccount />
        </div>
    </div>
  )
}

export default HomeHeader