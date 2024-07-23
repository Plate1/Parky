'use client';

import React, { useState, useEffect, useRef } from 'react'
import { TopBar, DataTable } from '../src/components/admintable';
import { AdminSidebar } from '../src/components/adminsidebar';

import axios from 'axios';
import { CircularProgress } from '@mui/material';

const AdminTable = () => {

  const [numRecords, setNumRecords] = useState<recordData>();

  const [studentData, setStudentData] = useState<userData[] | null>(null);

  const [progress, setProgress] = useState<"fetch" | "loading" | "loaded" | "error">("fetch")
  const progressRef = useRef(progress)

  useEffect(() => {
    progressRef.current = progress;
  }, [progress])

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

    axios.get('http://localhost:5000/api/student-data')
    .then(response => {
        setStudentData(response.data);
        setProgress("loaded")
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
        setProgress("error")
    })
    
  }, []);

  const [search, setSearch] = useState("");
  const [searchParam, setSearchParam] = useState<searchParameters>("Name")

  const handleSetSearchParam = (param: searchParameters) => {
    setSearchParam(param);
    setSearch("")
  }

  return (
    <AdminSidebar index={1}>
      <main className='flex-grow flex flex-col justify-start items-center p-5 h-full'>
        <div className='w-full flex flex-col items-center justify-start gap-5 h-full mt-[15.75rem]'>
          <TopBar records={numRecords} value={search} setter={setSearch} searchParam={searchParam} setSearchParam={handleSetSearchParam}/>
          {studentData ?
            <div className='w-full'>
              <DataTable search={search} setRecordsCallback={setNumRecords} studentData={studentData} searchParam={searchParam}/> 
            </div>
          :
            <div className='border-2 border-neutral-200 rounded-lg shadow-md overflow-hidden flex-grow w-full flex flex-col justify-center items-center'>
              {progress==="loading" ? <CircularProgress /> : progress==="error" && 
                <h1 className='text-lg text-neutral-400 font-semibold'>
                  Error. Failed to Fetch Data
                </h1>
              }
            </div>
          }
        </div>
      </main>
    </AdminSidebar>
  )
}

export default AdminTable