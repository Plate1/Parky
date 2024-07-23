'use client';

import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import SearchBar from '../admintable/topbar/SearchBar';
import { IoFilterOutline } from "react-icons/io5";
import ListItem from './ListItem';

import { CircularProgress } from '@mui/material';
import getStatus from '@/app/globals';

interface StudentListProps {
    progress: "fetch" | "loading" | "loaded" | "error"
    studentData: userData[] | undefined
    setActiveData: Dispatch<SetStateAction<userData | undefined>>
    setPage: Dispatch<SetStateAction<number>>
}

const StudentList:React.FC<StudentListProps> = ({
    progress,
    studentData,
    setActiveData,
    setPage
}) => {
    

    const [filter, setFilter] = useState<"Approved" | "Pending" | "Incomplete" | "All">("Pending");
    const [search, setSearch] = useState("");

    const [visibleData, setVisibleData] = useState<userData[]>();

    useEffect(() => {
        if (studentData){
            let tempData:userData[] = [];
            for (let i = 0; i < studentData.length; i++){
                const data:userData = studentData[i];

                const name = data.fullname.toLowerCase();
                if (!name.includes(search.toLowerCase())){
                    continue;
                }
                let status = getStatus(data);
                status = status.charAt(0).toUpperCase() + status.slice(1);
                if (status === filter || filter==="All"){
                    tempData.push(data);
                }
            }
            setVisibleData(tempData);
        }
    }, [studentData, filter, search])

    const handleFilterChange = () => {
        if (filter === "Approved"){
            setFilter("Pending")
        } else if (filter === "Pending"){
            setFilter("Incomplete")
        }else if (filter === "Incomplete"){
            setFilter("All")
        } else {
            setFilter("Approved")
        }
    }

    const handleSetActiveData = (data: userData) => {
        setPage(1);
        setActiveData(data);
    }

    return (
        <>
            <div className='w-full h-20 border-b shadow-sm p-5 flex flex-row items-center gap-4'>
                <SearchBar value={search} setter={setSearch} filter={null}/>
                <button 
                    onClick={handleFilterChange}
                    className='text-neutral-400 flex flex-row justify-center items-center p-[0.62rem] rounded-full
                        bg-white hover:bg-neutral-100 active:bg-neutral-200 transition duration-200 cursor-pointer relative'
                >
                    <IoFilterOutline size={22}/>
                    <div className={`p-1 rounded-full absolute top-[10px] right-2 
                            ${filter==="Approved" ? 'bg-green-400' : filter==="Pending" ? 'bg-yellow-300' : 
                                filter ==="Incomplete" ? 'bg-red-400' : 'p-0'}
                        `}
                    />
                </button>
            </div>
            {progress==="loaded" ? 
                <>
                    {visibleData && visibleData.length > 0 ? 
                        <div className='flex-grow w-full relative overflow-y-auto'>
                            <div className='w-full flex flex-col bg-black'>
                                {visibleData.map((data:userData, index:number) => (
                                    <ListItem key={index} fullname={data.fullname} data={data} setActive={handleSetActiveData}/>
                                ))}
                            </div>
                        </div>
                    :
                        <div className='flex-grow w-full flex flex-col justify-center items-center'>
                            <h1 className='text-lg text-neutral-400 font-semibold'>
                                No Data Found
                            </h1>
                            <h1 className='text-sm text-neutral-400/70 font-semibold'>
                                Showing {filter.toUpperCase()}
                            </h1>
                        </div>
                    }
                </>
            : progress==='loading' ?
                <div className='flex-grow w-full flex flex-col justify-center items-center'>
                    <CircularProgress />
                </div>
            : progress==='error' &&
                <div className='flex-grow w-full flex flex-col justify-center items-center'>
                    <h1 className='text-lg text-neutral-400 font-semibold'>
                        Error. Failed to Fetch Data
                    </h1>
                </div>
            }
        </>
    )
}

export default StudentList