'use client'
import HomeHeader from '@/layouts/home/home-header/HomeHeader'
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