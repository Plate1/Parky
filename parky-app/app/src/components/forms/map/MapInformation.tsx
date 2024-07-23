'use client';

import React from 'react'
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { LatLngBounds } from 'leaflet';

interface MapInformationProps {
    boundsCallback: (bounds:LatLngBounds) => void
}


const MapInformation:React.FC<MapInformationProps> = ({
    boundsCallback
}) => {
    const map = useMap();
    
    useEffect(() => {
        const b = map.getBounds();
        console.log(b)
        boundsCallback(b)
    }, []);

    return null;
}

export default MapInformation