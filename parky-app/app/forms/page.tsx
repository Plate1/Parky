'use client';

import React, { useContext, useEffect, useRef, useState } from 'react'

import { PassInformation, ApplicantInformation, RulesAndRegulations, VehicleRegistration, CheckList, Uploads, ParkingZones } 
from '../src/components/forms';
import { Navbar } from '../src/components/navbar';
import axios from 'axios';
import getStatus, { StudentIndex } from '../globals';
import { CircularProgress } from '@mui/material';

const Forms = () => {
    const [progress, setProgress] = useState<"fetch" | "loading" | "loaded" | "error">("fetch")
    const progressRef = useRef(progress)

    useEffect(() => {
        progressRef.current = progress;
    }, [progress])

    const [selected, setSelected] = useState(1);

    const INDEX = useContext(StudentIndex);
    const [data, setData] = useState<userData[]>();
    const [status, setStatus] = useState<"approved" | "pending" | "incomplete">("approved");

    useEffect(() => {
        setTimeout(() => {
            if (progressRef.current === 'fetch'){
                setProgress("loading");
            }
        }, 1000)
      
        setTimeout(() => {
            if (progressRef.current !== "loaded"){
                setProgress("error")
            }
        }, 10000)

        axios.get("http://localhost:5000/api/student-data")
        .then(response => {
            setData(response.data)
            setProgress("loaded")
        })
        .catch(error => {
            console.error(error)
            setProgress("error")
        })
    }, [])

    useEffect(() => {
        if (data){
            setStatus(getStatus(data[INDEX]))
        }
    }, [data])

    return (
        (progress==='loaded' && data ? 
            <Navbar status={status} fullname={data[INDEX].fullname} school="South Fayette High School">
                <main className='w-full flex-grow py-10 px-7 pl-96 flex flex-col justify-start gap-5'>
                    <div className='flex-shrink flex flex-col gap-4 justify-between'>
                        <h1 className='flex-grow text-4xl'>2024-2025 Parking Pass Application</h1>
                    </div>
                    
                    <div className='flex-shrink flex flex-row gap-5'>
                        <div className='flex-shrink border rounded-md shadow-md w-3/5 overflow-hidden h-fit'>
                            {selected<=4 ?
                                <>
                                    <div className='flex flex-row justify-between gap-0 font-semibold'>
                                        <div onClick={() => {setSelected(1)}} className={`${data[INDEX].form1completed ? 'bg-green-50/75 hover:bg-green-100 active:bg-green-200':'bg-white hover:bg-neutral-100 active:bg-neutral-200'} cursor-pointer flex-1 text-center w-full h-full p-4 border-green-300 rounded-sm ${selected==1 ? 'border-t border-r         ' : 'border-b'}`}><h1 className=''>Pass Information</h1></div>
                                        <div onClick={() => {setSelected(2)}} className={`${data[INDEX].form2completed ? 'bg-green-50/75 hover:bg-green-100 active:bg-green-200':'bg-white hover:bg-neutral-100 active:bg-neutral-200'} cursor-pointer flex-1 text-center w-full h-full p-4 border-green-300 rounded-sm ${selected==2 ? 'border-t border-l border-r' : 'border-b'}`}><h1 className=''>Applicant Information</h1></div>
                                        <div onClick={() => {setSelected(3)}} className={`${data[INDEX].form3completed ? 'bg-green-50/75 hover:bg-green-100 active:bg-green-200':'bg-white hover:bg-neutral-100 active:bg-neutral-200'} cursor-pointer flex-1 text-center w-full h-full p-4 border-green-300 rounded-sm ${selected==3 ? 'border-t border-l border-r' : 'border-b'}`}><h1 className=''>Rules and Regulations</h1></div>
                                        <div onClick={() => {setSelected(4)}} className={`${data[INDEX].form4completed ? 'bg-green-50/75 hover:bg-green-100 active:bg-green-200':'bg-white hover:bg-neutral-100 active:bg-neutral-200'} cursor-pointer flex-1 text-center w-full h-full p-4 border-green-300 rounded-sm ${selected==4 ? 'border-t border-l         ' : 'border-b'}`}><h1 className=''>Vehicle Information</h1></div>
                                    </div>
                                    <div className='p-5'>
                                        {selected==1 && <PassInformation data={data[INDEX]}/>}
                                        {selected==2 && <ApplicantInformation data={data[INDEX]}/>}
                                        {selected==3 && <RulesAndRegulations data={data[INDEX]}/>}
                                        {selected==4 && <VehicleRegistration data={data[INDEX]} selectedCallBack={setSelected}/>}
                                    </div>
                                </>
                            :
                                (selected==5 ?
                                    <div className='p-5'>
                                        <Uploads data={data[INDEX]}/>
                                    </div>
                                :
                                    <div>
                                        <ParkingZones data={data[INDEX]}/>
                                    </div>    
                                )
                                
                            }   
                        </div>
                        <CheckList progress={progress} data={data[INDEX]} selectedCallBack={setSelected}/>
                    </div>
                </main>
            </Navbar>
        :
            <Navbar status={"approved"} fullname={""} school="South Fayette High School">
                <main className='w-full flex-grow py-10 px-7 pl-96 flex flex-col justify-start gap-5 h-72'>
                    <div className='flex-shrink flex flex-col gap-4 justify-between'>
                        <h1 className='flex-grow text-4xl'>2024-2025 Parking Pass Application</h1>
                    </div>
                    
                    <div className='flex-grow flex flex-row gap-5'>
                        <div className='flex-shrink border rounded-md shadow-md w-3/5 overflow-hidden'>
                            <div className='flex flex-row justify-between gap-0 font-semibold'>
                                <div onClick={() => {setSelected(1)}} className={`bg-white hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer flex-1 text-center w-full h-full p-4 border-green-300 rounded-sm ${selected==1 ? 'border-t border-r         ' : 'border-b'}`}><h1 className=''>Pass Information</h1></div>
                                <div onClick={() => {setSelected(2)}} className={`bg-white hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer flex-1 text-center w-full h-full p-4 border-green-300 rounded-sm ${selected==2 ? 'border-t border-l border-r' : 'border-b'}`}><h1 className=''>Applicant Information</h1></div>
                                <div onClick={() => {setSelected(3)}} className={`bg-white hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer flex-1 text-center w-full h-full p-4 border-green-300 rounded-sm ${selected==3 ? 'border-t border-l border-r' : 'border-b'}`}><h1 className=''>Rules and Regulations</h1></div>
                                <div onClick={() => {setSelected(4)}} className={`bg-white hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer flex-1 text-center w-full h-full p-4 border-green-300 rounded-sm ${selected==4 ? 'border-t border-l         ' : 'border-b'}`}><h1 className=''>Vehicle Information</h1></div>
                            </div>
                            { progress === "loading" ?
                                <div className='h-full bg-white flex flex-row flex-grow justify-center items-center'>
                                    <CircularProgress />
                                </div>
                            : progress=== 'error' &&
                                <div className='h-full bg-white flex flex-row flex-grow justify-center items-center'>
                                    <h1 className='text-lg text-neutral-400 font-semibold'>
                                        Error. Failed to Fetch Data.
                                    </h1>
                                </div>
                            }
                        </div>
                        <CheckList progress={progress} data={null} selectedCallBack={setSelected}/>
                    </div>
                </main>
            </Navbar>
        )
    )
}

export default Forms
