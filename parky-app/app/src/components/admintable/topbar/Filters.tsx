'use client';

import React from 'react'
import { IoFilterOutline } from "react-icons/io5";

interface FiltersProps {
    searchParam: searchParameters
    setSearchParam: (param: searchParameters) => void
}   

const Filters:React.FC<FiltersProps> = ({
    searchParam,
    setSearchParam
}) => {
    const handleFilterClicked = () => {
        if (searchParam === "Name") {
          setSearchParam("License Plate")
        } else if (searchParam === "License Plate") {
          setSearchParam("Car Model")
        } else if (searchParam === "Car Model") {
          setSearchParam("Car Color")
        } else if (searchParam === "Car Color") {
          setSearchParam("Parking Spot")
        } else {
          setSearchParam("Name")
        }
      }

    return (
        <button 
            onClick={handleFilterClicked}
            className=' 
                flex-shrink 
                p-2 
                rounded-md 
                border-2 
                flex
                flex-row 
                items-center 
                justify-between
                gap-3

                bg-white
                text-neutral-400
                hover:text-neutral-500
                hover:border-green-400
                active:text-neutral-600
                active:border-green-600

                transition
                <duration-100></duration-100>
            '
        >
            <h1 className='text-base text-nowrap'>Toggle Filter</h1>
            <IoFilterOutline size={20} />
        </button>
    )
}

export default Filters