'use client';

import React from 'react'

interface recordData {
    approved: number,
    pending: number,
    incomplete: number
}
  
interface QuickViewProps {
    records: recordData | undefined
}

const QuickView:React.FC<QuickViewProps> = ({
    records
}) => {
    if (records){
        const { approved, pending, incomplete } = records;
        const total = approved + pending + incomplete;

        const approvedWidth = (approved / total) * 100;
        const pendingWidth = (pending / total) * 100;
        const incompleteWidth = (incomplete / total) * 100;
        return (
            <div className='w-full flex flex-col justify-between items-center gap-1'>
                <div className='w-full flex flex-row justify-between items-center gap-10 px-[2px]'>
                    <div>
                        Approved: {approved}
                    </div>
                    <div>
                        Pending Approval: {pending}
                    </div>
                    <div>
                        Incomplete: {incomplete}
                    </div>
                </div>
                <div className={`w-full flex flex-row rounded-full overflow-hidden border`}>
                    {approved !== 0 && <div style={{ width: `${approvedWidth}%` }} className='h-full bg-green-300 p-[5px]' />}
                    {pending !== 0 && <div style={{ width: `${pendingWidth}%` }} className='h-full bg-yellow-300 p-[5px]' />}
                    {incomplete !== 0 && <div style={{ width: `${incompleteWidth}%` }} className='h-full bg-red-300 p-[5px]' />}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='w-full flex flex-col justify-between items-center gap-1'>
                <div className='w-full flex flex-row justify-between items-center gap-10 px-[2px]'>
                    <div>
                        Approved: 0
                    </div>
                    <div>
                        Pending Approval: 0
                    </div>
                    <div>
                        Incomplete: 0
                    </div>
                </div>
                <div className={`w-full flex flex-row rounded-full overflow-hidden border bg-black p-[5px]`}>
                    
                </div>
            </div>
        )
    }
}

export default QuickView