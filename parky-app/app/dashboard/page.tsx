'use client';

import React, { useContext, useEffect, useRef, useState } from 'react'
import { DynamicInfo, StaticInfo, NotificationPanel } from ".././src/components/dashboard";
import { Navbar } from '../src/components/navbar';
import axios from 'axios';

import getStatus, { StudentIndex } from '../globals';

const Dashboard = () => {
    const INDEX = useContext(StudentIndex);

    const [progress, setProgress] = useState<"fetch" | "loading" | "loaded" | "error">("fetch")
    const progressRef = useRef(progress)

    useEffect(() => {
        progressRef.current = progress;
    }, [progress])

    const [data, setData] = useState<userData[]>();

    const [notifProgress, setNotifprogress] = useState<"fetch" | "loading" | "loaded" | "error">("fetch")
    const notifProgressRef = useRef(notifProgress)

    useEffect(() => {
        notifProgressRef.current = notifProgress;
    }, [notifProgress])

    const [notifications, setNotifications] = useState<Notification[]>();

    useEffect(() => {
        setTimeout(() => {
            if (progressRef.current === 'fetch'){
                setProgress("loading");
            }
            if (notifProgressRef.current === 'fetch'){
                setNotifprogress("loading");
            }
        }, 1000)
      
        setTimeout(() => {
            if (progressRef.current !== "loaded"){
                setProgress("error")
            }
            if (notifProgressRef.current !== "loaded"){
                setNotifprogress("error")
            }
        }, 10000)

        axios.get("http://localhost:5000/api/student-data")
        .then(response => {
            setData(response.data);
            setProgress('loaded');
        })
        .catch(error => {
            console.error(error);
            setProgress('error')
        })

        axios.get("http://localhost:5000/api/notifications")
        .then(progress => {
            setNotifications(progress.data);
            setNotifprogress('loaded')
        })
        .catch(error => {
            console.error(error);
            setNotifprogress('error')
        })
    }, [])

    const [userStatus, setUserData] = useState<"approved" | "pending" | "incomplete">("approved");

    useEffect(() => {
        if (data) {
            setUserData(getStatus(data[INDEX]))
        }
    }, [data])

    return (
        <>
            {data ?
                <Navbar status={userStatus} fullname={data[INDEX].fullname} school="South Fayette High School">
                    <main className="w-full h-5/6 flex-1 flex flex-row py-5 px-48 gap-8">
                        <div className="w-2/3 flex flex-col justify-between items-center gap-8">
                            <DynamicInfo fullname={data[INDEX].fullname} status={userStatus} tardies={data[INDEX].tardies} spotCode={data[INDEX].parkingspot}/>
                            <StaticInfo 
                                progress={progress}

                                fullname={data[INDEX].fullname} 
                                email={data[INDEX].email}
                                grade={data[INDEX].grade}
                                graduationYear={data[INDEX].grade==="11th Grade" ? 2026 : 2025}
                                birthday={data[INDEX].birthday}
                                dlIssueDate={data[INDEX].dlissueDate}
                                street={data[INDEX].street}
                                city={data[INDEX].city}
                                state={data[INDEX].state}
                                zipCode={data[INDEX].zipcode}
                                parentfullname={data[INDEX].parentfullname}
                                parentemail={data[INDEX].parentemail}
                                parentphonenumber={data[INDEX].parentphonenumber}

                                car1model={data[INDEX].car1model}
                                car1modelyear={data[INDEX].car1modelyear}
                                car1plate={data[INDEX].car1plate}
                                car1color={data[INDEX].car1color}


                                car2model={data[INDEX].car2model}
                                car2modelyear={data[INDEX].car2modelyear}
                                car2plate={data[INDEX].car2plate}
                                car2color={data[INDEX].car2color}

                            />
                        </div>
                        <NotificationPanel progress={notifProgress} notifications={notifications}/>
                    </main>
                </Navbar>
            :
                <Navbar status="approved" fullname="" school="South Fayette High School">
                    <main className="w-full h-5/6 flex-1 flex flex-row py-5 px-48 gap-8">
                        <div className="w-2/3 flex flex-col justify-between items-center gap-8">
                            <DynamicInfo fullname={""} status="approved" tardies={0} spotCode='000'/>
                            <StaticInfo 
                                progress={progress}

                                fullname={null} 
                                email={null}
                                grade={null}
                                graduationYear={null}
                                birthday={null}
                                dlIssueDate={null}
                                street={null}
                                city={null}
                                state={null}
                                zipCode={null}
                                parentfullname={null}
                                parentemail={null}
                                parentphonenumber={null}

                                car1model={null}
                                car1modelyear={null}
                                car1plate={null}
                                car1color={null}

                                car2model={null}
                                car2modelyear={null}
                                car2plate={null}
                                car2color={null}

                            />
                        </div>
                        <NotificationPanel progress={notifProgress} notifications={undefined}/>
                    </main>
                </Navbar>
            }
        </>
    )
}

export default Dashboard