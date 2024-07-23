'use client';

import React from 'react'
import Image from 'next/image';
import LogoImage from '../../images/ParkyFull.png'

const Logo = () => {
  return (
    // <div className='text-xl font-semibold'>Parky</div>
    <div className='h-full relative w-40 flex flex-row justify-start'>
      <Image src={LogoImage} alt='logo' fill={true} sizes="(max-width: 768px) 100vw, 33vw" quality={100}/>
    </div>
  )
}

export default Logo