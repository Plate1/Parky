'use client';

import React from 'react'

interface CheckItemProps {
    text: string
    status: 'Incomplete' | 'Pending' | 'Completed' | "Approved"
    callback: () => void
}

const CheckItem:React.FC<CheckItemProps> = ({
    text,
    status,
    callback,
}) => {
  return (
    <div className='flex flex-row justify-between gap-4'>
        <h1 
            className='cursor-pointer hover:underline underline-offset-4 active:text-neutral-500'
            onClick={callback}
        >
            {text}
        </h1>
        <h1 className={`
            ${status==='Incomplete'&&'text-red-400'} 
            ${status==='Pending'&&'text-yellow-400'} 
            ${(status==='Completed'||status==="Approved")&&'text-green-400'}`
        }>
            {status}
        </h1>
    </div>
  )
}

export default CheckItem