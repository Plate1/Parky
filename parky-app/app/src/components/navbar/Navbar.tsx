'use client';

import React, { useEffect } from 'react'
import Profile from './Profile'
import Logo from './Logo'
import MiddleNav from './MiddleNav'
import School from './School'

interface NavbarProps {
  fullname: string
  school: string
  children: React.ReactNode
  status: "approved" | "pending" | "incomplete"
}

const Navbar:React.FC<NavbarProps> = ({
  fullname,
  school,
  children,
  status,
}) => {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <div className='
          flex-shrink
          h-20
          w-full
          border-b-2
          border-green-300
          flex
          flex-row
          px-5
          py-3
          justify-between
          items-center
      '>
          <Logo />
          <MiddleNav />
          <div className='flex flex-col '>
              <Profile status={status} fullname={fullname}/>
              <School school={school}/> 
          </div>
      </div>

      {children}
    </div>
  )
}

export default Navbar