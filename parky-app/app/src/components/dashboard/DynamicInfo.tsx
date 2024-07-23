'use client';

import React from 'react'

interface DynamicInfoProps {
    fullname: string
    status: "approved" | "pending" | "incomplete"
    tardies: number
    spotCode: string | null
}

const DynamicInfo:React.FC<DynamicInfoProps> = ({
    fullname,
    status,
    tardies,
    spotCode,
}) => {
    const name = 
    fullname.length > 18 ? fullname.split(" ")[0] + " " + fullname.split(" ")[fullname.split(" ").length-1].charAt(0) + "."
        : fullname


    return (
        <div className='w-full py-5 px-7 flex-shrink border-2 rounded-2xl shadow-md flex flex-row justify-between items-center'>
            <div className='flex-shrink'>
                <h1 className='text-3xl flex-grow w-full'>{name}</h1>
            </div>
            
            <div className='flex flex-row justify-center items-center gap-8 relative'>
                <div className='border border-neutral-300 rounded-full py-3 px-5 relative'>
                    <h1 className='text-lg flex-shrink pr-8'>Pass Status:</h1>
                    <div className={`flex-grow p-2 border rounded-full absolute right-5 top-[18px] 
                        ${status=="approved" && 'border-green-300 bg-green-300'}
                        ${status=="pending" && 'border-yellow-300 bg-yellow-300'}
                        ${status=="incomplete" && 'border-red-300 bg-red-300'}
                    `}></div>
                </div>
                <div className='border border-neutral-300 rounded-full py-3 px-5 shadow-md cursor-pointer hover:shadow-lg transition duration-200 peer'>
                    <h1 className='text-lg font-semi flex-shrink'>Tardies: {tardies}</h1>
                </div>
                <div className='opacity-0 -z-10 peer-hover:z-10 peer-hover:opacity-100 absolute rounded-xl p-4 bg-white shadow-lg border -right-28 flex flex-col justify-between transition duration-200'>
                    <h1><b>4</b> Tardies: 10 day Pass Suspension</h1>
                    <h1><b>5</b> Tardies: 45 day Pass Suspension</h1>
                    <h1><b>6+</b> Tardies: Year-long Pass Suspension</h1>
                </div>
                <h1 className='text-2xl flex-shrink underline decoration-white underline-offset-4 hover:decoration-green-300 cursor-pointer
                    transition-colors duration-200
                '>{`${spotCode ? "Parking Spot: " + spotCode : "No Parking Spot"}`}</h1>
            </div>
        </div>
    )
}

export default DynamicInfo