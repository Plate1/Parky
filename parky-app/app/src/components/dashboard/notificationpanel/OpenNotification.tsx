'use client';

import React, { use, useState } from 'react'
import { IoMdClose } from "react-icons/io";

interface OpenNotificationProps {
    header: string 
    body: string
    closeCallback: () => void
}

const OpenNotification:React.FC<OpenNotificationProps> = ({
    header,
    body,
    closeCallback,
}) => {

    return (
        <div className='fixed flex-none w-screen h-screen bg-neutral-400/55 top-0 left-0 flex flex-col justify-center items-center'>
            <div className='w-1/3 aspect-square border-2 border-black rounded-2xl p-5 bg-white flex flex-col gap-3'>
                <div className='pt-5 pb-2 border-b border-b-green-300 flex flex-row justify-between items-center gap-3'>
                    <div className='flex flex-row items-center gap-3'>
                        <h1 className='text-3xl'>{header}</h1>
                    </div>
                    <IoMdClose 
                        size={38} 
                        className='cursor-pointer'
                        onClick={closeCallback}
                    />
                </div>
                <p className='text-lg'>{body}</p>
            </div>
        </div>
    )
}

export default OpenNotification