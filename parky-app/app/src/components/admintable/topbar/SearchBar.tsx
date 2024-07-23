'use client';

import React, { Dispatch } from 'react'
import { IoSearchSharp } from "react-icons/io5";

interface SearchBarProps {
  value: string
  setter: Dispatch<React.SetStateAction<string>>
  filter: searchParameters | null
}

const SearchBar:React.FC<SearchBarProps> = ({
  value,
  setter,
  filter
}) => {
  return (
    <div className='w-full flex-grow p-[10px] rounded-md border-2 flex flex-row items-center 
      gap-2 focus-within:border-blue-400'>
        <IoSearchSharp size={20} className='text-neutral-400'/>
        {filter !== null ?
          <input className='w-full h-full text-base' placeholder={`Search by ${filter}`} value={value} onChange={(e) => setter(e.target.value)}/>
        :
          <input className='w-full h-full text-base' placeholder="Search" value={value} onChange={(e) => setter(e.target.value)}/>
        }
    </div>
  )
}

export default SearchBar