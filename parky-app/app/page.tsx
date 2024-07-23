'use client';

import React, { ReactElement } from 'react'
import { useRouter } from 'next/navigation';
import { PiStudent } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";

const Home = () => {
    const router = useRouter();

    const handleStudentView = () => {
        router.push('/dashboard')
    }

    const handleAdminView = () => {
        router.push('/admintable')
    }

    return (
        <main className="w-full min-h-screen flex flex-row justify-center items-center gap-20">
            <button onClick={handleStudentView} 
                className='w-1/4 bg-white rounded-lg border-2 shadow-md hover:bg-neutral-50 active:bg-neutral-100 
            flex flex-col p-5 justify-center items-center gap-2 cursor-pointer transition duration-200'>
                <PiStudent size={100} />
                <h1 className='text-lg font-semibold'>Student View</h1>
            </button>
            <button onClick={handleAdminView}
                className='w-1/4 bg-white rounded-lg border-2 shadow-md hover:bg-neutral-50 active:bg-neutral-100 
            flex flex-col p-5 justify-center items-center gap-2 cursor-pointer transition duration-200'>
                <RiAdminLine size={100} />
                <h1 className='text-lg font-semibold'>Administrator View</h1>
            </button>
        </main>
    )
}

export default Home