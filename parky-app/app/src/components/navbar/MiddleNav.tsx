'use client';

import React from 'react'
import Link from 'next/link';

const MiddleNav = () => {
  return (
    <div className='
            border-[1px]
            w-full
            md:w-auto
            rounded-full
            shadow-sm
            hover:shadow-md
            transition
            cursor-pointer
            flex
            flex-row
            items-center
            justify-between
    '>
        <div className='
                text-md
                font-semibold
                px-6
                opacity-100
                hover:opacity-75
                transition
                duration-75
                py-2
            '
        >
            <Link href="/dashboard">Dashboard</Link>
        </div>

        <div className='
                hidden
                sm:block
                text-md
                font-semibold
                px-6
                border-l-[1px]
                flex-1
                text-center
                opacity-100
                hover:opacity-75
                transition
                duration-75
                py-2
            '
        >
            <Link href="/forms">Forms</Link>
        </div>

        <div className='
                hidden
                sm:block
                text-md
                font-semibold
                px-6
                border-l-[1px]
                flex-1
                text-center
                opacity-100
                hover:opacity-75
                transition
                duration-75
                py-2
            '
        >
            Payment
        </div>
        
    </div>
  )
}

export default MiddleNav