'use client';

import React from 'react'
import Map from './map/Map';

interface ParkingZonesProps {
    data: userData
}

const ParkingZones:React.FC<ParkingZonesProps> = ({
    data
}) => {

    const handleSubmitCallback = (zoneorder: number) => {
        const values = {"zoneorder": zoneorder}
        console.log(console.log({"id": data.id, ...values}))
    }

    return (
        <div className='w-full h-[705px] relative'>
            <Map userData={data} submitCallback={handleSubmitCallback}/>
        </div>
    )
}

export default ParkingZones