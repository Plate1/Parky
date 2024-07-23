'use client';

import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { MdModeEdit } from "react-icons/md";

interface StaticInfoProps {
  progress: 'fetch' | 'loading' | 'loaded' | 'error'

  fullname: string | null
  email: string | null
  grade: string | null
  graduationYear: number | null
  birthday: string | null
  dlIssueDate: string | null
  street: string | null
  city: string | null
  state: string | null
  zipCode: number | null
  parentfullname: string | null
  parentemail: string | null
  parentphonenumber: string | null

  car1model: string | null
  car1modelyear: number | null
  car1plate: string | null
  car1color: string | null

  car2model: string | null
  car2modelyear: number | null
  car2plate: string | null
  car2color: string | null

}

const StaticInfo:React.FC<StaticInfoProps> = ({
  progress,

  fullname,
  email,
  grade,
  graduationYear,
  birthday,
  dlIssueDate,
  street,
  city,
  state,
  zipCode,
  parentfullname,
  parentemail,
  parentphonenumber,
  car1model,
  car1modelyear,
  car1plate,
  car1color,
  car2model,
  car2modelyear,
  car2plate,
  car2color,
}) => {

  const [currentCar, setCurrentCar] = useState(1);

  const didMainForm = dlIssueDate !== null;
  const didVehicle = (car1model && car1modelyear && car1plate && car1color)
  const isCar2 = (car2model && car2modelyear && car2plate && car2color);

  return (
    <div className='w-full py-5 px-7 flex-grow border-2 rounded-2xl shadow-md flex flex-col justify-between items-start gap-5'>
      <div className='flex-grow w-full flex flex-col gap-2'>
        <div className='flex-shrink border-b-2 border-black/50 pb-1 flex flex-row justify-between items-center'>
          <h1 className='text-2xl'>Personal Information</h1>
          {/* {didMainForm &&
          <div className='p-[6px] rounded-full hover:bg-neutral-100 bg-white cursor-pointer transition druation-200 active:bg-neutral-200'>
            <MdModeEdit size={24}/>
          </div>} */}
        </div>
        {didMainForm ? 
          <div className='w-full p-0 flex-1 grid grid-cols-2 justify-between gap-y-4 gap-x-3 items-center'>
            {/* name, email, parent name, parent email, parent phone, grade, address, drivers license issue date */}
            <Cell label='Name' value={fullname}/>
            <Cell label='Grade' value={`${grade} (${graduationYear})`}/>
            <Cell label='Email' value={email}/>
            <Cell label='Birthday' value={birthday}/>
            <Cell label='Drivers License Issue Date' value={dlIssueDate}/>
            <Cell label='Street' value={street}/>
            <Cell label='City' value={city}/>
            <Cell label='State' value={state}/>
            <Cell label='Zip Code' value={zipCode} />
            <Cell label='Parent Name' value={parentfullname}/>
            <Cell label='Parent Email' value={parentemail}/>
            <Cell label='Parent Phone Number' value={parentphonenumber}/>
          </div>
        :
          <div className='h-full flex flex-row justify-center items-center'>
            {progress==='loaded' && <h1 className='text-lg text-neutral-400 font-semibold'>
              Click "<Link href='/forms' className='text-blue-400 decoration-2 underline underline-offset-4 hover:text-blue-300 active:text-blue-500'>
              Forms
              </Link>" Tab Above to Enter Information</h1>}
            {progress==='error' && <h1 className='text-lg text-neutral-400 font-semibold'>
              Error. Failed to Fetch Data.
            </h1>}
            {progress==='loading' && <CircularProgress />}
          </div>
        }

      </div>
      <div className='flex-shrink w-full flex flex-col gap-2'>
        <div className='flex-grow border-b-2 border-black/50 pb-1 flex flex-row justify-between items-center'>
          <div className='flex flex-row gap-3 justify-between items-center text-lg'>
            <h1 className='text-2xl'>Automobile Information</h1>
              {isCar2 && 
                <>
                  <div 
                    className={`py-1 px-2 border rounded-full cursor-pointer bg-white ${currentCar===1 && 'border-2 shadow-md border-green-300 '} transition duration-200`}
                    onClick={() => {setCurrentCar(value => (value!==1 ? 1 : value))}}
                  >
                    Car 1
                  </div>
                  <div 
                    className={`py-1 px-2 border rounded-full cursor-pointer ${currentCar===2 && 'border-2 shadow-md border-green-300'} transition duration-200`}
                    onClick={() => {setCurrentCar(value => (value!==2 ? 2 : value))}}
                  >
                    Car 2
                  </div>
                </>
              }
          </div>
          {/* {didVehicle && 
          <div className='p-[6px] rounded-full hover:bg-neutral-100 bg-white cursor-pointer transition druation-200 active:bg-neutral-200'><MdModeEdit size={24}/></div>} */}
        </div>
        {/* Model, Model Year, Plate number, color */}
        {/* repeat if necessary */}
        {didVehicle ?
          <div className='w-full p-0 flex-1 grid grid-cols-2 justify-center gap-y-5 gap-x-3 items-center'>
            {currentCar===1 ? 
                  <>
                    <Cell label='Model' value={car1model}/>
                    <Cell label='Model Year' value={car1modelyear}/>
                    <Cell label='License Plate' value={car1plate}/>
                    <Cell label='Color' value={car1color}/>
                  </>
            :
              <>
                {isCar2 && 
                  <>
                    <Cell label='Model' value={car2model}/>
                    <Cell label='Model Year' value={car2modelyear}/>
                    <Cell label='License Plate' value={car2plate}/>
                    <Cell label='Color' value={car2color}/>
                  </>
                }
              </>
            }
          </div>
        :
          <div className='w-full p-10 flex-1 flex flex-row justify-center items-center'>
            {progress==='loaded' && <h1 className='text-lg text-neutral-400 font-semibold'>
              Click "<Link href='/forms' className='text-blue-400 decoration-2 underline underline-offset-4 hover:text-blue-300 active:text-blue-500'>
              Forms
              </Link>" Tab Above to Enter Information
            </h1>}
          </div>
        }
      </div>
    </div>
  )
}

interface CellProps {
  label: string,
  value: string | number | null,
}

const Cell:React.FC<CellProps> = ({
  label,
  value
}) => {
  return(
    <div className='flex flex-row justify-between items-center border py-2 px-3 rounded-md'>
    <h1 className='text-base'><b>{label}: </b></h1>
    <h1 className='text-base'>{value}</h1>
  </div>
  )
}

export default StaticInfo