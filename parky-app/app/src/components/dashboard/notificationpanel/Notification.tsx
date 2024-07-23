'use client';

import React, { useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { BiSolidXCircle } from "react-icons/bi";
import OpenNotification from './OpenNotification';


interface NotificationProps {
    data: Notification
}

const Notification:React.FC<NotificationProps> = ({
    data
}) => {
    const {elapsedTime, header, text, type, read} = data;

    const [isRead, setIsRead] = useState(read ? read : false);
    const [panelIsOpen, setPanelIsOpen] = useState(false);

    const closeCallback = () => {
        setPanelIsOpen(value => !value);
    }   

    const openPanel = () => {
        setIsRead(value => value==false ? true : true)
        setPanelIsOpen(value => !value);
    }

    return (
        <>
            <button onClick={openPanel} className={`   
                w-full 
                min-h-[5.5rem]
                px-5 py-4 
                flex flex-row 
                justify-between items-center 
                overflow-hidden 
                border-t-2 first-of-type:border-none 
                gap-3 
                ${!isRead && 'hover:bg-neutral-50'} 
                transition duration-100 
                cursor-pointer 
                active:bg-neutral-100
                ${isRead ? 'bg-neutral-200/50' : 'bg-white'}
                text-start
            `}>
                <div className='flex-grow px-2'>
                    <h1 className='text-md'>{header} <b>·</b> {elapsedTime}</h1>
                    <p className='text-sm text-ellipsi line-clamp-1'>{text}</p>
                </div>
                <div className='flex-shrink'>
                    {type==="positive" && <FaCheckCircle size={24} color='lime'/>}
                    {type==="warning" && <IoIosWarning size={26} color='yellow'/>}
                    {type==="negative" && <BiSolidXCircle size={26} color='red'/>}
                </div>
            </button>

            {panelIsOpen && <OpenNotification header={header} body={text} closeCallback={closeCallback}/>}
        </>
        
    )
}

export default Notification