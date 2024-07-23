'use client';

import React from 'react'
import CheckItem from './CheckItem';
import { CircularProgress } from '@mui/material';

interface CheckListProps {
    selectedCallBack: any
    data: userData | null
    progress: "fetch" | "loading" | "loaded" | "error"
}

const CheckList:React.FC<CheckListProps> = ({
    selectedCallBack,
    data,
    progress
}) => {
    let isCar2 = false
    if (data){
        isCar2 = (data.car2model && data.car2modelyear && data.car2plate && data.car2color && data.car2registrationimage)
    }
    
    return (
        (progress === "loaded" && data ?
            <div className='flex-shrink border rounded-md shadow-md w-fit overflow-hidden h-fit p-5 flex flex-col gap-6 bg-white sticky top-5'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-lg font-semibold'>Information and Forms</h1>
                    <div className='flex flex-col gap-4'>
                        <CheckItem callback={() => selectedCallBack(1)} text="Pass Information" status={data.form1completed ? "Completed" : "Incomplete"}/>
                        <CheckItem callback={() => selectedCallBack(2)} text="Applicant Information" status={data.form2completed ? "Completed" : "Incomplete"}/>
                        <CheckItem callback={() => selectedCallBack(3)} text="Rules and Regulations" status={data.form3completed ? "Completed" : "Incomplete"}/>
                        <CheckItem callback={() => selectedCallBack(4)} text="Vehicle Information" status={data.form4completed ? "Completed" : "Incomplete"}/>
                        { isCar2 ? 
                            <>
                                <CheckItem callback={() => selectedCallBack(4)} text="Vehicle Registration 1" status={data.car1registration}/> 
                                <CheckItem callback={() => selectedCallBack(4)} text="Vehicle Registration 2" status={data.car2registration}/> 
                            </>
                        :
                            <CheckItem callback={() => selectedCallBack(4)} text="Vehicle Registration" status={data.car1registration}/> 
                        }
                    </div>
                </div>
                <hr></hr>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-lg font-semibold'>Uploads</h1>
                    <div className='flex flex-col gap-4'>
                        <CheckItem callback={() => selectedCallBack(5)} text="Drivers License Upload" status={data.dlupload}/>
                        <CheckItem callback={() => selectedCallBack(5)} text="Insurance Upload" status={data.insuranceupload}/>
                    </div>
                </div>
                <hr></hr>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-lg font-semibold'>Available Zones</h1>
                    <div className='flex flex-col gap-4'>
                        <CheckItem callback={() => selectedCallBack(6)} text="Choose Zone" status={data.zoneselection ? "Completed" : "Incomplete"}/>
                    </div>
                </div>
            </div>
        :
            ( progress === "loading" ?
                <div className='flex-shrink border rounded-md shadow-md w-72 overflow-hidden h-3/4 p-5 flex flex-col items-center justify-center bg-white'>
                    <CircularProgress />
                </div>
            : progress === 'error' &&
                <div className='flex-shrink border rounded-md shadow-md w-72 overflow-hidden h-3/4 p-5 flex flex-col items-center justify-center bg-white'>
                    <h1 className='text-lg text-neutral-400 font-semibold'>
                        Error. Failed to Fetch Data.
                    </h1>
                </div>
            )
        )
    )
}

export default CheckList