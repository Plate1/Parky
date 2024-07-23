'use client';

import { Button } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { LiaAngleLeftSolid } from "react-icons/lia";
import { LiaAngleRightSolid } from "react-icons/lia";
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField'

interface ActiveDataProps {
    activeData: userData | undefined
    page: number
    setPage: Dispatch<SetStateAction<number>>
}

const ActiveData:React.FC<ActiveDataProps> = ({
    activeData,
    page,
    setPage
}) => {
    let isCar2 = true;
    if (activeData) {
        isCar2 = (activeData.car2model && activeData.car2modelyear && activeData.car2plate && activeData.car2color && activeData.car2registrationimage)
    }

    const maxPage:number = isCar2 ? 4 : 3

    const changePage = (d: number) => {
        setPage(currpage => currpage + d)
    }

    const [documentStatus, setDocumentStatus] = useState<"Approved" | "Pending" | "Incomplete">("Approved")

    useEffect(() => {
        if (activeData){
            if (page === 1){
                setDocumentStatus(activeData.dlupload)
            } else if (page === 2){
                setDocumentStatus(activeData.insuranceupload)
            } else if (page === 3){
                setDocumentStatus(activeData.car1registration)
            } else if (page === 4){
                setDocumentStatus(activeData.car2registration)
            }
        }
    }, [activeData, page])

    const handleApprove = () => {
        let data = {}
        if (page === 1) {
            data = {"dlupload": "Approved"}
        } else if (page === 2) {
            data = {"insuranceupload": "Approved"}
        } else if (page === 3) {
            data = {"car1registration": "Approved"}
        } else if (page === 4) {
            data = {"car2registration": "Approved"}
        } else {
            console.error("Uncaught Error")
        }

        if (activeData){
            console.log({"id": activeData.id, ...data})
        } else {
            console.error("Uncaught Error")
        }

        if (page !== maxPage) {
            setPage(currpage => currpage + 1)
        }
    }

    const [dialogOpen, setDialogOpen] = useState(false)

    const handleReject = (reason: string) => {
        // setDialogOpen(true);

        let data = {}
        if (page === 1) {
            data = {"dlupload": "Incomplete"}
        } else if (page === 2) {
            data = {"insuranceupload": "Incomplete"}
        } else if (page === 3) {
            data = {"car1registration": "Incomplete"}
        } else if (page === 4) {
            data = {"car2registration": "Incomplete"}
        } else {
            console.error("Uncaught Error")
        }

        if (activeData){
            console.log({"id": activeData.id, "reason": reason, ...data})
        } else {
            console.error("Uncaught Error")
        }
    }



    return (
        (activeData ? 
            <>
                <div className='w-full h-full flex flex-col justify-start p-5 gap-5'>
                    <div className='flex flex-row w-full justify-between'>
                        <h1 className='font-semibold'>Student Information</h1>
                        <h1 className='font-semibold'>Parent Contact</h1>
                    </div>
                    <div className='w-full flex flex-row justify-between gap-10'>
                        <div className='flex-1 flex flex-row justify-between items-center gap-1'>
                            <h1>{activeData.fullname}</h1>
                            <h1>{activeData.grade}</h1>
                            <h1>{activeData.email}</h1>
                        </div>
                        |
                        <div className='flex-1 flex flex-row justify-between items-center gap-1'>
                            <h1>{activeData.parentfullname}</h1>
                            <h1>{activeData.parentphonenumber}</h1>
                            <h1>{activeData.parentemail}</h1>
                        </div>
                    </div>
                    
                    <div className='w-full flex-grow flex flex-col justify-between items-center gap-10'>
                        <div className='w-full flex flex-row justify-center items-center flex-grow relative'>
                            <div className='flex-1 flex-col flex gap-5'>
                                <div className='w-full flex flex-row flex-shrink justify-center items-center'>
                                    <h1 className='text-2xl font-semibold'>
                                        { page === 1 && 'Drivers License'}
                                        { page === 2 && 'Insurance'}
                                        { page === 3 && 'Car 1 Registration'}
                                        { page === 4 && 'Car 2 Registration'}
                                    </h1>
                                </div>
                                <CellData status={documentStatus}>Document Status: {documentStatus}</CellData>
                                <div className='grid grid-cols-2 gap-5'>
                                    <CellData>Name: {activeData.fullname}</CellData>
                                    <CellData>Birthday: {activeData.birthday}</CellData>
                                </div>
                                <CellData>License Issue Date: {activeData.dlissueDate}</CellData>
                                <hr></hr>
                                {page === 3 ?
                                    <div className='grid grid-cols-2 gap-5'>
                                        <CellData>Model: {activeData.car1model}</CellData>
                                        <CellData>Model Year: {activeData.car1modelyear}</CellData>
                                        <CellData>License Plate: {activeData.car1plate}</CellData>
                                        <CellData>Color: {activeData.car1color}</CellData>
                                    </div>
                                : page === 4 ?
                                    <div className='grid grid-cols-2 gap-5'>
                                        <CellData>Model: {activeData.car2model}</CellData>
                                        <CellData>Model Year: {activeData.car2modelyear}</CellData>
                                        <CellData>License Plate: {activeData.car2plate}</CellData>
                                        <CellData>Color: {activeData.car2color}</CellData>
                                    </div>
                                :
                                    (activeData.street2 === null ?
                                        <div className='grid grid-cols-2 gap-5'>
                                            <CellData>Street: {activeData.street}</CellData>
                                            <CellData>City: {activeData.city}</CellData>
                                            <CellData>State: {activeData.state}</CellData>
                                            <CellData>Zip Code: {activeData.zipcode}</CellData>
                                        </div>
                                    :
                                        <>
                                            <div className='grid grid-cols-2 gap-5'>
                                                <CellData>Street: {activeData.street}</CellData>
                                                <CellData>Line 2: {activeData.street2}</CellData>
                                                <CellData>City: {activeData.city}</CellData>
                                                <CellData>State: {activeData.state}</CellData>
                                            </div>
                                            <CellData>Zip Code: {activeData.zipcode}</CellData>

                                        </>
                                    )
                                }
                            </div>
                            <div className='flex-1 flex flex-row justify-center items-center'>
                                { page === 1 &&
                                    (activeData.dlupload !== "Incomplete" ?
                                        <MyImage alt='drivers license' src={activeData.dluploadimage}/>
                                    :
                                        <h1 className='text-xl text-neutral-400 font-semibold'>Upload Incomplete</h1>
                                    )
                                }
                                { page === 2 &&
                                    (activeData.insuranceupload !== "Incomplete" ?
                                        <MyImage alt='insurance' src={activeData.insuranceuploadimage}/>
                                    :
                                        <h1 className='text-xl text-neutral-400 font-semibold'>Upload Incomplete</h1>
                                    )
                                }
                                { page === 3 &&
                                    (activeData.car1registration !== "Incomplete" ?
                                        <MyImage alt='drivers license' src={activeData.car1registrationimage}/>
                                    :
                                        <h1 className='text-xl text-neutral-400 font-semibold'>Upload Incomplete</h1>
                                    )
                                }
                                { page === 4 &&
                                    (activeData.car2registration !== "Incomplete" ?
                                        <MyImage alt='drivers license' src={activeData.car2registrationimage}/>
                                    :
                                        <h1 className='text-xl text-neutral-400 font-semibold'>Upload Incomplete</h1>
                                    )
                                }
                            </div>
                        </div>
                        <div className='w-full flex flex-row justify-center items-center flex-shrink gap-10'>
                            <Button disabled={documentStatus === "Incomplete"} variant='contained' color='error' onClick={() => setDialogOpen(true)}>Send Back</Button>
                            <div className='flex-shrink flex flex-row justify-center items-center gap-5 h-full text-blue-500'>
                                {page !== 1 ?
                                    <button onClick={() => changePage(-1)}><LiaAngleLeftSolid  size={28}/></button>
                                :
                                    <div className='text-neutral-400'><LiaAngleLeftSolid  size={28}/></div>
                                }

                                <h1 className='text-lg text-neutral-800 w-0 flex flex-row justify-center items-center'>{page}/{maxPage}</h1>

                                {page !== maxPage ? 
                                    <button onClick={() => changePage(1)}><LiaAngleRightSolid size={28}/></button>
                                :
                                    <div className='text-neutral-400'><LiaAngleRightSolid size={28}/></div>    
                                }
                            </div>
                            <Button disabled={documentStatus !== "Pending"} variant='contained' color='success' onClick={handleApprove}>Approve</Button>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            const reason = formJson.reason;
                            handleReject(reason)
                            setDialogOpen(false);
                        },
                    }}
                >
                    <DialogTitle>Send Back Upload</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a reason for document denial.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="reason"
                            name="reason"
                            label="Denial Reason"
                            type="text"
                            fullWidth
                            variant="standard"
                            multiline
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button type="submit">Confirm</Button>
                    </DialogActions>
                </Dialog>
            </>
        :
            <div className='flex flex-col justify-center items-center w-full h-full'>
                <h1 className='text-lg text-neutral-400 font-semibold'>
                    Select a Student
                </h1>
            </div>
        )
    )
}

export default ActiveData

interface MyImageProps {
    alt: string
    src: any
}

const MyImage:FC<MyImageProps> = ({
    alt,
    src
}) => {
    const [naturalWidth, setNaturalWidth] = useState(10000);
    const [naturalHeight, setNaturalHeight] = useState(10000);

    return(
        <TransformWrapper>
            <TransformComponent>
                <Image
                    alt={alt}
                    src={src}
                    width={naturalWidth}
                    height={naturalHeight} 
                    style={{'width': 'auto', 'height': 'auto', 'maxWidth': '100%', 'maxHeight': '100%'}}
                    quality={100}
                    onLoad={(event:any) => {
                        setNaturalWidth(event.target.naturalWidth);
                        setNaturalHeight(event.target.naturalHeight);
                    }}
                />
            </TransformComponent>
        </TransformWrapper>

    )
}

interface CellDataProps {
    children: React.ReactNode
    status?: "Approved" | "Pending" | "Incomplete"
}
  
  const CellData:React.FC<CellDataProps> = ({children, status}) => {
    if (status === undefined) {
        return (
            <h1 className='p-2 w-full text-center border rounded-md text-sm cursor-pointer
                hover:bg-neutral-50 transition duration-400 bg-white'>
                {children}
            </h1>
        )
    } else {
        return(
            <h1 className={`p-2 w-full text-center border rounded-md text-sm cursor-pointer
                hover:bg-neutral-50 transition duration-400 
                ${status === "Approved" && 'bg-green-100'}
                ${status === "Pending" && 'bg-yellow-100'}
                ${status === "Incomplete" && 'bg-red-100'}
            `}>
                {children}
            </h1>
        )
    }
        
  }