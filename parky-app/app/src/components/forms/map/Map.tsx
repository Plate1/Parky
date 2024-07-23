'use client';

import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

//map imports
import { LatLngBoundsExpression, LeafletMouseEvent } from 'leaflet';
import { MapContainer, TileLayer, Popup, GeoJSON, Tooltip, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { FeatureCollection } from 'geojson';

import MapInformation from './MapInformation';
import LabelBox from './LabelBox';


const MOVEABLE = true;

interface MapProps {
    submitCallback: (zoneorder: number) => void
    userData: userData
}

const Map:React.FC<MapProps> = ({
    submitCallback,
    userData
}) => {
    const center = {lat: 40.3756, lng:-80.1690}
    // const [b, setBounds] = useState<LatLngBounds>();

    const bounds:LatLngBoundsExpression = [
        //south west
        [
            40.37272148469575,
            -80.1732122898102
        ],
        //north east
        [
            40.37848371748315,
            -80.16379237174989
        ]
    ]

    const [geoData, setGeoData] = useState<FeatureCollection[]>();

    interface zoneDataProps {
        name: string
        selected: boolean
        rank: number
        layer: any
        id: number
    }
    
    const [zoneData, setZoneData] = useState<zoneDataProps[]>([
        {
            id: 1,
            name: 'Band Zone',
            selected: false,
            rank: -1,
            layer: null
        },
        {
            id: 2,
            name: 'Front Zone',
            selected: false,
            rank: -1,
            layer: null
        },
        {
            id: 3,
            name: 'Stadium Zone',
            selected: false,
            rank: -1,
            layer: null
        }
    ]);
    const colors = ['green', 'yellow', 'red']
    // const colors = ['#088c2c', '#18d64c', '#7ae697']


    const [page, setPage] = useState(1);
    const pageRef = useRef(page);

    const handlePageClick = (d:number) => {
        setPage(currentPage => currentPage + d)
    }

    useEffect(() => {
        pageRef.current = page;
    }, [page])

    useEffect(() => {
        axios.get('http://localhost:5000/api/school-and-lots')
        .then(response => {
            // console.log(response)
            setGeoData(response.data)
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        })
    }, []);

    const onPlotClick = (index:number, e:LeafletMouseEvent) => {
        if (pageRef.current !== 1 && pageRef.current !== 5){
            let copyZoneData = [...zoneData]

            let currSpotIndex = -1;
            for (let i = 0; i < copyZoneData.length; i++){
                if (copyZoneData[i].rank === pageRef.current-1){
                    currSpotIndex = i;
                }
            }

            // if (copyZoneData[index].selected){
            //     if (index===currSpotIndex){
            //         copyZoneData[index].selected = false;
            //         e.target.setStyle({fillColor: null})
            //         copyZoneData[index].rank = -1
            //     }
            //     else {
            //         let rank = copyZoneData[index].rank;

            //         copyZoneData[index].rank = pageRef.current-1;
            //         e.target.setStyle({fillColor: colors[pageRef.current-2]})

            //         if (currSpotIndex !== -1){
            //             copyZoneData[currSpotIndex].rank = rank;
            //             copyZoneData[currSpotIndex].layer.setStyle({fillColor: colors[rank-1]})
            //         }
            //     }
            // }
            // else {
            //     copyZoneData[index].selected = true;
            //     copyZoneData[index].rank = pageRef.current-1;
            //     e.target.setStyle({fillColor: colors[pageRef.current-2]})
            //     if (currSpotIndex !== -1){
            //         copyZoneData[currSpotIndex].selected = false;
            //         copyZoneData[currSpotIndex].rank = -1;
            //         copyZoneData[currSpotIndex].layer.setStyle({fillColor: null})
            //     }
            // }

            if (copyZoneData[index].selected){
                if (index===currSpotIndex){
                    copyZoneData[index].selected = false;
                    e.target.setStyle({fillColor: null})
                    copyZoneData[index].rank = -1
                }
            }
            else {
                if (currSpotIndex === -1){
                    copyZoneData[index].selected = true;
                    e.target.setStyle({fillColor: colors[pageRef.current-2]})
                    copyZoneData[index].rank = pageRef.current-1;
                }
                else {
                    copyZoneData[index].selected = true;
                    copyZoneData[index].rank = pageRef.current-1;
                    e.target.setStyle({fillColor: colors[pageRef.current-2]})
                    if (currSpotIndex !== -1){
                        copyZoneData[currSpotIndex].selected = false;
                        copyZoneData[currSpotIndex].rank = -1;
                        copyZoneData[currSpotIndex].layer.setStyle({fillColor: null})
                    }
                }
            }

            // setZoneData((zoneData) => ([
            //     ...copyZoneData
            // ]))

            setZoneData(copyZoneData);
        }

    }


    const handleSubmit = () => {
        const orderArray = [0, 0, 0]
        for (let i = 0; i < 3; i++){
            orderArray[zoneData[i].rank-1] = zoneData[i].id
        }
        const zoneorder:number = Number(orderArray.join(""))

        submitCallback(zoneorder)
    }

    return (
        <MapContainer
            id='map'
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '100%',
            }}

            center={center}
            maxBounds={bounds}

            zoom={18}
            minZoom={17}
            maxZoom={18}
            bounceAtZoomLimits={true}

            scrollWheelZoom={MOVEABLE}
            dragging={MOVEABLE}

            zoomControl={false}
            keyboard={false}
            doubleClickZoom={false}
            touchZoom={false}
            
            className='relative z-10'
        >
            <TileLayer
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {/* <MapInformation boundsCallback={setBounds}/> */}
            <LabelBox completed={userData.zoneselection} zoneData={zoneData} page={page} setPage={handlePageClick} submitCallback={handleSubmit} assignedZone={userData.zone}/>

            {userData.zoneselection ? 
                <>                    
                    {geoData && 
                        geoData.map((data:FeatureCollection, index:number) =>
                            <GeoJSON data={data} key={index} onEachFeature={(feature, layer) => {
                                layer.on({
                                    add: (e) => {
                                        zoneData[index].layer = e.target;
                                        zoneData[index].selected = true;
                                        const rank:number = userData.zoneorder.toString().indexOf((zoneData[index].id).toString())
                                        e.target.setStyle({fillColor: colors[rank]})
                                        zoneData[index].rank = rank+1
                                    },
                                    mouseover: (e) => {
                                        e.target.setStyle({fillOpacity: 0.1});
                                    },
                                    mouseout: (e) => {
                                        e.target.setStyle({fillOpacity: 0.2});
                                    },
                                })
                            }} > 
                                <Tooltip direction='center' opacity={1}><h1 className='text-base'>
                                    {zoneData[index].name}
                                    {userData.zone !== null && userData.zone !== 0 && zoneData[index].id === userData.zone && ' (Assigned)'}</h1></Tooltip>
                            </GeoJSON>
                        )
                    }
                </>
            :
                <>                    
                    {geoData && 
                        geoData.map((data:FeatureCollection, index:number) =>
                            <GeoJSON data={data} key={index} onEachFeature={(feature, layer) => {
                                layer.on({
                                    add: (e) => {
                                        zoneData[index].layer = e.target;
                                    },
                                    mouseover: (e) => {
                                        e.target.setStyle({fillOpacity: 0.1});
                                    },
                                    mouseout: (e) => {
                                        e.target.setStyle({fillOpacity: 0.2});
                                    },
                                    click: (e) => onPlotClick(index, e),
                                    mousedown: (e) => {
                                        e.target.setStyle({fillOpacity: 0.3})
                                    },
                                    mouseup: (e) => {
                                        e.target.setStyle({fillOpacity: 0.1});
                                    },

                                })
                            }} > 
                                <Tooltip direction='center' opacity={1}><h1 className='text-base'>{zoneData[index].name}</h1></Tooltip>
                            </GeoJSON>
                        )
                    }
                </>
            }
            
            
        </MapContainer>
    )
}

export default Map