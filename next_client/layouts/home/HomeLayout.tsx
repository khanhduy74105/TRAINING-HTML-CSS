'use client'
import HomeHeader from '@/modules/headers/home-header/HomeHeader'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const HomeLayout:React.FC<Props> = ({children}) => {
  return (
    <>
        <HomeHeader />
        {children}
    </>
  )
}

export default HomeLayout