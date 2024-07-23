'use client';

import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
// import { Badge } from '@mui/material'

interface ProfileProps {
    fullname: string
    status: "approved" | "pending" | "incomplete"
}

const Profile:React.FC<ProfileProps> = ({
    fullname,
    status
}) => {
    const name = 
    fullname.length > 13 ? fullname.split(" ")[0] + " " + fullname.split(" ")[fullname.split(" ").length-1].charAt(0) + "."
        : fullname

    return (
        <div className='flex flex-row justify-between items-center gap-2 relative'>
            <h1 className='text-lg font-semibold'>{name}</h1>
            {/* <Badge variant='dot' color=''> */}
            <IoPersonCircleOutline className='cursor-pointer' size={35}/>
            {/* </Badge> */}
            <div className={`
                absolute
                p-[6px]
                ${status=="approved" && 'bg-green-300'}
                ${status=="pending" && 'bg-yellow-300'}
                ${status=="incomplete" && 'bg-red-300'}
                rounded-full
                right-0
                top-0
                animate-pulse
            `}/>
        </div>
    )
}

export default Profile