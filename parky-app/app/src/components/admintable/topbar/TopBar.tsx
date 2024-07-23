'use client';

import React, { Dispatch, SetStateAction } from 'react'
import SearchBar from './SearchBar';
import QuickView from './QuickView';
import Filters from './Filters';


interface recordData {
  approved: number,
  pending: number,
  incomplete: number
}

interface TopBarProps {
  records: recordData | undefined
  value: string
  setter: Dispatch<SetStateAction<string>>
  searchParam: searchParameters
  setSearchParam: (param: searchParameters) => void
}

const TopBar:React.FC<TopBarProps> = ({
  records,
  value,
  setter,
  searchParam,
  setSearchParam
}) => {

  return (
    <div className='w-full flex flex-row justify-between items-center h-10'>
        <div className='flex flex-row justify-center items-center flex-shrink gap-5 h-full'>
            <SearchBar filter={searchParam} value={value} setter={setter}/>
            <Filters searchParam={searchParam} setSearchParam={setSearchParam}/>
        </div>
        <div className='flex flex-row justify-center items-center flex-shrink'>
            <QuickView records={records}/>
        </div>
    </div>
  )
}

export default TopBar