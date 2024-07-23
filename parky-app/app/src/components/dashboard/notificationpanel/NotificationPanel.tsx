'use client';

import React, { useEffect, useState } from 'react'
import { CiFilter } from "react-icons/ci";
import Notification from './Notification';
import { CircularProgress } from '@mui/material';

interface NotificationPanelProps {
    notifications: Notification[] | undefined;
    progress: "fetch" | "loading" | "loaded" | "error"
}

const NotificationPanel:React.FC<NotificationPanelProps> = ({
    notifications,
    progress
}) => {

    const [filter, setFilter] = useState<"positive" | "warning" | "negative" | "all">("all");

    const handleFilterChange = () => {
        if (filter === "positive"){
            setFilter("warning");
        } else if (filter === "warning"){
            setFilter("negative");
        } else if (filter === "negative"){
            setFilter("all");
        } else {
            setFilter("positive")
        }
    }

    const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>();

    useEffect(() => {
        if (notifications){
            if (filter === "all"){
                setVisibleNotifications(notifications);
            }
            else {
                const temp:Notification[] = [];
                for (let i = 0; i < notifications.length; i++){
                    if (notifications[i].type === filter){
                        temp.push(notifications[i]);
                    }
                }
                setVisibleNotifications(temp);
            }
        }
    }, [notifications, filter])


    return (
        <div className='w-1/3 h-full border-2 rounded-2xl shadow-md flex flex-col justify-between items-center overflow-hidden'>
            <div className='flex-shrink bg-white w-full h-20 flex flex-row border-b border-b-green-300 justify-between px-5 py-5 items-center'>
                <h1 className='text-[26px] flex-1'>Notifications</h1>
                <button onClick={handleFilterChange} className='p-[6px] rounded-full hover:bg-neutral-100 bg-white 
                    cursor-pointer transition druation-200 active:bg-neutral-200 relative'>
                    <CiFilter size={30}/>
                    {filter!=="all" &&
                        <div className={`absolute p-1 rounded-full top-[6px] right-2
                            ${filter==="positive"&&'bg-green-300'}
                            ${filter==="warning"&&'bg-yellow-300'}
                            ${filter==="negative"&&'bg-red-300'}`}>
                        </div>
                    }
                </button>
            </div>
                {progress === "loading" ? 
                    <div className='w-full h-full flex flex-col justify-center items-center'>
                        <CircularProgress />
                    </div>
                :
                    progress === 'error' ? 
                    <div className='w-full h-full flex flex-col justify-center items-center'>
                        <h1 className='text-lg text-neutral-400 font-semibold'>
                            Error. Failed to Fetch Notifications.
                        </h1>
                    </div>

                :   progress === "loaded" && visibleNotifications && 
                    <>
                        { visibleNotifications.length > 0 ?
                            <div className='w-full h-full flex flex-col shadow-inner overflow-y-auto'>
                                {visibleNotifications.map((notification:Notification, index:number) => (
                                    <Notification data={notification} key={index}/>
                                ))}
                            </div>
                        :
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='text-lg text-neutral-400 font-semibold'>
                                    No Notifications Found.
                                </h1>
                            </div>
                        }
                    </>
                } 
            
            <div className='flex-shrink bg-white h-16 w-full border-t-2 border-t-green-300'/>

        </div>
    )
}

export default NotificationPanel