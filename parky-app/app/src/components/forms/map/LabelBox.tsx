'use client';

import React, { useEffect, useRef } from 'react'

import Control from 'react-leaflet-custom-control';

interface LabelBoxProps {
    zoneData: zoneDataProps[]
    page: number
    setPage: (d: number) => void
    submitCallback: () => void
    completed?: boolean
    assignedZone: number | null
}

const LabelBox:React.FC<LabelBoxProps> = ({
    zoneData,
    page,
    setPage,
    submitCallback,
    completed,
    assignedZone,
}) => {

    // const pageRef = useRef(page);

    // const changePage = (d:number) => {
    //     pageRef.current += d;
    //     setPage(d)
    // }

    const checkRank = (index:number) => {
        let assignedSpot = -1;
        for(let i = 0; i < zoneData.length; i++){
            if (zoneData[i].rank == index){
                assignedSpot = i;
                break;
            }
        }
        return assignedSpot;
    }

    const checkAll = () => {
        for (let i = 0; i < 3; i++){
            if (checkRank(i+1) === -1){
                return false;
            }
        }
        return true
    }

    return (
        <Control prepend position='bottomleft' >
            <div className='bg-white p-5 rounded-md flex flex-col gap-3 w-[18rem] border-2 border-black'>
                <div className='flex flex-col-reverse gap-0 w-full '>
                    { page === 1 && (completed===undefined || completed===false) &&
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-lg font-semibold'>Instructions</h1>
                            <p className='text-sm'>The next 3 pages will prompt you to choose one of the highlighted zones as your first,
                                second, or third pick respectively. Your ranking order demonstrates a preference
                                in what zones you would like to have your parking spot in, but it does not guarantee
                                a parking spot in your most preferred zone.
                            </p>
                        </div>
                    }
                    { page === 1 && (completed===true) &&
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-lg font-semibold'>Review</h1>
                            <p className='text-sm'>The next 3 pages will display your rankings for your first,
                                second, and third pick respectively which are also color coded on the map as green, yellow, and red. If you have been assigned a zone, 
                                it will be visible on the last page. (Your ranking order demonstrates a preference in what zones you would like to have your parking spot 
                                in, but it does not guarantee a parking spot in your most preferred zone.) 
                            </p>
                        </div>
                    }
                    { page !== 1 && page !== 5 &&
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-lg font-semibold'>Zone Preference #{page-1}</h1>
                            { checkRank(page-1)!==-1 ?
                                <>
                                    <p className='text-base'>{completed===false && 'Current '}Selection: <span className='font-semibold'>{zoneData[checkRank(page-1)].name}</span></p>
                                    {completed===false && <p>(Click on the zone again to deselect it.)</p>}
                                </>
                            :
                                <p className='text-base'>Click on a Zone</p>
                            }
                        </div>
                    }
                    { page === 5 && (completed===undefined || completed===false) &&
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-1'>
                                <h1 className='text-lg font-semibold'>Submission</h1>
                                <p className='text-base'>Please make sure the information below is correct before proceeding:</p>
                            </div>
                            <div className='flex flex-col gap-2 text-sm'>
                                <p>Zone Preference #1: {checkRank(1) !== -1 ? <span className='font-semibold'>{zoneData[checkRank(1)].name}</span> : <span className='font-semibold'>No Selection</span>}</p>
                                <p>Zone Preference #2: {checkRank(2) !== -1 ? <span className='font-semibold'>{zoneData[checkRank(2)].name}</span> : <span className='font-semibold'>No Selection</span>}</p>
                                <p>Zone Preference #3: {checkRank(3) !== -1 ? <span className='font-semibold'>{zoneData[checkRank(3)].name}</span> : <span className='font-semibold'>No Selection</span>}</p>
                            </div>
                        </div>
                    }
                    { page === 5 && (completed===true) &&
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-1'>
                                <h1 className='text-lg font-semibold'>Assigned Zone</h1>
                                <p className='text-base'>Please know that the zone you have been assigned may not be your top preference.</p>
                            </div>
                            <div className='flex flex-col gap-2 text-sm'>
                                <p>Assigned Zone: { assignedZone !== null ? <span className='font-semibold'>{zoneData[assignedZone-1].name}</span> : <span className='font-semibold'>No Assigned Zone</span>}</p>
                            </div>
                        </div>
                    }
                </div>
                <hr></hr>
                <div className='w-full flex flex-row justify-between text-sm items-center gap-7'>
                    {page !== 1 ? 
                        <button onClick={() => setPage(-1)}><p className='cursor-pointer text-blue-500 hover:text-blue-400 active:text-blue-500'>Back</p></button>
                    :
                        <p className='text-neutral-400'>Back</p>
                    }
                    <h1>{page}</h1>
                    {page !== 5 ?
                        <button onClick={() => setPage(1)}><p className='cursor-pointer text-blue-500 hover:text-blue-400 active:text-blue-500'>Next</p></button>
                    :
                        (completed === false ?
                            (checkAll() === true ? 
                                <button onClick={submitCallback} className='border-2 border-green-300 p-1 rounded-md text-neutral-600'>Submit</button>
                            :
                                <button disabled title="Make sure all preferences have been selected." className='border-2 p-1 rounded-md text-neutral-300'>Submit</button>
                            )
                        :
                            <p className='text-neutral-400'>Next</p>
                        )
                    }
                </div>
            </div>
        </Control>
    )
}

export default LabelBox
