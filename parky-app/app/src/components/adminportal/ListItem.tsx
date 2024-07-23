'use client';

import React, { Dispatch } from 'react'

interface ListItemProps {
  fullname: string;
  data: userData;
  setActive: (data: userData) => void
}

const ListItem:React.FC<ListItemProps> = ({
    fullname,
    data,
    setActive,
}) => {
  return (
    <button 
      className='w-full h-14 border-b last-of-type:border-b-0 p-5 flex flex-row justify-between items-center
        bg-white hover:bg-neutral-50 transition duration-200 cursor-pointer active:bg-neutral-100'
      onClick={() => setActive(data)}
    >
      <h1 className='text-lg font-semibold'>{fullname}</h1>
    </button>
  )
}

export default ListItem