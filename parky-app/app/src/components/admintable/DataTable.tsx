'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TableFooter, TablePagination } from '@mui/material';
import Link from 'next/link';
import getStatus from '@/app/globals';

const r:recordData = {approved: 0, pending: 0, incomplete: 0}

function createData(props: userData) {
    const {
        id, 

        fullname, 
        email, 
        grade, 
        parkingspot, 
        tardies,
        birthday,

        car1model, 
        car1modelyear, 
        car1color, 
        car1plate, 
        car1registration,
        car1registrationimage,

        form1completed,
        form2completed, 
        form3completed, 
        form4completed, 
        dlissueDate, 
        dlupload, 
        dluploadimage,
        insuranceupload, 
        insuranceuploadimage,
        zoneselection, 
        amount,
        passtype,
        zone,

        parentfullname,
        parentemail,
        parentphonenumber,
        street,
        street2,
        city,
        state,
        zipcode,
        
        car2model,
        car2modelyear,
        car2color,
        car2plate,
        car2registration,
        car2registrationimage,
    } = props;

    let haspaid  = false;
    if (amount){
      haspaid = true;
    }

    let status = getStatus(props);
    status = status.charAt(0).toUpperCase() + status.slice(1); {/* Capatilization */}

    if (status === "Approved"){
      r['approved'] += 1;
    } else if (status === "Pending"){
      r['pending'] += 1;
    }
    else {
      r['incomplete'] += 1;
    }

    const isCar2:boolean = (car2model!==null && car2modelyear!==null && car2plate!==null && car2color!==null && car2registrationimage!== null);

    if (isCar2){
        return {
            id,
            fullname,
            email,
            grade,
            birthday,
            parkingspot,
            status,
            tardies,
            carData: [
                {
                    model: car1model,
                    modelyear: car1modelyear,
                    color: car1color,
                    plate: car1plate,
                    registration: car1registration,
                    registrationimage: car1registrationimage,
                },
                {
                    model: car2model,
                    modelyear: car2modelyear,
                    color: car2color,
                    plate: car2plate,
                    registration: car2registration,
                    registrationimage: car2registrationimage,
                },
            ],
            registrationInfo: {
                form1completed,
                form2completed,
                form3completed,
                form4completed,
                dlissueDate,
                dlupload,
                dluploadimage,
                insuranceupload,
                insuranceuploadimage,
                zoneselection,
                haspaid,
                amount,
                passtype,
                zone
            },
            contact: {
                name: parentfullname,
                email: parentemail,
                phonenumber: parentphonenumber,
                street,
                street2,
                city,
                state,
                zipcode,
            }
        };
    }
    else {
      return {
        id,
        fullname,
        email,
        grade,
        birthday,
        parkingspot,
        status,
        tardies,
        carData: [
            {
                model: car1model,
                modelyear: car1modelyear,
                color: car1color,
                plate: car1plate,
                registration: car1registration,
                registrationimage: car1registrationimage,
            },
        ],
        registrationInfo: {
            form1completed,
            form2completed,
            form3completed,
            form4completed,
            dlissueDate,
            dlupload,
            dluploadimage,
            insuranceupload,
            insuranceuploadimage,
            zoneselection,
            haspaid,
            amount,
            passtype,
            zone
        },
        contact: {
            name: parentfullname,
            email: parentemail,
            phonenumber: parentphonenumber,
            street,
            street2,
            city,
            state,
            zipcode,
        }
      };
  }  
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row"> {row.fullname}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{row.grade}</TableCell>
          <TableCell>{row.birthday}</TableCell>
          <TableCell>{row.parkingspot}</TableCell>
          <TableCell>{row.tardies}</TableCell>
          <TableCell>
            <h1 className={`${row.status==="Approved" ? 'text-green-300' : row.status==="Pending" ? 'text-yellow-300' : 'text-red-300'} font-semibold`}>
              {row.status}
            </h1>
          </TableCell>
        </TableRow>
        <TableRow>
           <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={8}> {/* <---------- Increase if adding more info to main table headers (and other one vvvvv) !!! */}
            <Collapse in={open} timeout="auto" unmountOnExit>
            <div className='w-full flex flex-row px-4 gap-5 py-5 justify-between items-start bg-neutral-50'>
              <div className='p-5 border-2 border-blue-200 shadow-md rounded-lg flex flex-col gap-3 flex-1 bg-white'>
                <h1 className='text-base font-semibold'>Car Information</h1> 
                { row.carData.map((data, index:number) => (
                  <div className='grid grid-cols-1 gap-2' key={data.plate}>
                    <div className='grid grid-cols-2 gap-2'>
                      <CellData>Car {index+1} Model: {data.model}</CellData>
                      <CellData>Car {index+1} Model Year: {data.modelyear}</CellData>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                      <CellData>Car {index+1} Color: {data.color}</CellData>
                      <CellData>Car {index+1} Plate: {data.plate}</CellData>
                    </div>
                    <CellData dynamicBackground={data.registration} type={`${'registration'+(index+1)}`} userID={row.id}>Car {index+1} Registration: {data.registration}</CellData>
                  </div>
                ))}
              </div>
              <div className='p-5 border-2 border-blue-200 shadow-md rounded-lg flex flex-col gap-3 flex-1 bg-white'>
                <h1 className='text-base font-semibold'>Registration Information</h1>
                <div className='grid grid-cols-2 gap-2'>
                  <CellData dynamicBackground={row.registrationInfo.form1completed ? 'Completed' : 'Incomplete'}>Form 1: {row.registrationInfo.form1completed ? 'Completed' : 'Incomplete'}</CellData>
                  <CellData dynamicBackground={row.registrationInfo.form2completed ? 'Completed' : 'Incomplete'}>Form 2: {row.registrationInfo.form2completed ? 'Completed' : 'Incomplete'}</CellData>
                  <CellData dynamicBackground={row.registrationInfo.form3completed ? 'Completed' : 'Incomplete'}>Form 3: {row.registrationInfo.form3completed ? 'Completed' : 'Incomplete'}</CellData>
                  <CellData dynamicBackground={row.registrationInfo.form4completed ? 'Completed' : 'Incomplete'}>Form 4: {row.registrationInfo.form4completed ? 'Completed' : 'Incomplete'}</CellData>
                  <CellData>DL Issue Date: {row.registrationInfo.dlissueDate}</CellData>
                  <CellData dynamicBackground={row.registrationInfo.dlupload} type='driverslicense' userID={row.id}>DL Upload: {row.registrationInfo.dlupload}</CellData>
                  <CellData dynamicBackground={row.registrationInfo.insuranceupload} type='insurance' userID={row.id}>Insurance Upload: {row.registrationInfo.insuranceupload}</CellData>
                  <CellData dynamicBackground={row.registrationInfo.zoneselection ? 'Completed' : 'Incomplete'}>Zone Selection: {row.registrationInfo.zoneselection ? 'Completed' : 'Incomplete'}</CellData>
                  <CellData>Assigned Zone: {row.registrationInfo.zone !== null ? row.registrationInfo.zone : 'None'}</CellData>
                  <CellData>Pass Type: {row.registrationInfo.passtype}</CellData>
                  <CellData dynamicBackground={row.registrationInfo.haspaid ? 'Completed' : 'Incomplete'}>Payment: {row.registrationInfo.haspaid ? 'Completed' : 'Incomplete'}</CellData>
                  <CellData>Amount: {row.registrationInfo.amount}</CellData>
                </div>
              </div>
              <div className='p-5 border-2 border-blue-200 shadow-md rounded-lg flex flex-col gap-3 flex-1 bg-white'>
                <h1 className='text-base font-semibold'>Contact Information</h1>
                <div className='grid grid-cols-2 gap-2'>
                  <CellData>Parent First Name: {row.contact.name.split(" ")[0]}</CellData>
                  <CellData>Parent Last Name: {row.contact.name.split(" ")[row.contact.name.split(" ").length-1]}</CellData>
                  {row.contact.email.length > 25 ?
                    <CellData>Parent Email: {row.contact.email.split("@")[0] + "@ " + row.contact.email.split("@")[1]}</CellData>
                  :
                    <CellData>Parent Email: {row.contact.email}</CellData>  
                  }
                  <CellData>Parent Phone Number: {row.contact.phonenumber}</CellData>
                </div>
                {row.contact.street2 !== null ? 
                  <>
                    <div className='grid grid-cols-2 gap-2'>
                      <CellData>Street: {row.contact.street}</CellData>
                      <CellData>Line 2: {row.contact.street2}</CellData>
                      <CellData>City: {row.contact.city}</CellData>
                      <CellData>State: {row.contact.state}</CellData>
                    </div>
                    <CellData>Zip Code: {row.contact.zipcode}</CellData>
                  </>
                :
                  <div className='grid grid-cols-2 gap-2'>
                    <CellData>Street: {row.contact.street}</CellData>
                    <CellData>City: {row.contact.city}</CellData>
                    <CellData>State: {row.contact.state}</CellData>
                    <CellData>Zip Code: {row.contact.zipcode}</CellData>
                  </div>
                }
              </div>
            </div>
            </Collapse>
          </TableCell>
        </TableRow>

      </React.Fragment>
    );
}

interface CellDataProps {
  dynamicBackground?: string
  userID?: string
  type?: string
  children: React.ReactNode
}

const CellData:React.FC<CellDataProps> = ({children, dynamicBackground, userID, type}) => {
  if (dynamicBackground){
    if (dynamicBackground === "Pending" || dynamicBackground === "Approved"){
      return (
        <Link target='_blank' href={`/adminportal?userID=${userID}&type=${type}`} className={`p-2 w-[99%] text-center border-2 border-black shadow-md rounded-md text-sm cursor-pointer bg-opacity-100 hover:bg-opacity-70
          transition duration-100 active:bg-opacity-100 ${dynamicBackground==="Pending" ? 'bg-yellow-100 active:bg-yellow-300' : 'bg-green-100 active:bg-green-300'} `}>
          {children}
        </Link>
      )
    } else {
      return (
        <h1 className={`p-2 w-[99%] text-center border rounded-md text-sm cursor-pointer bg-opacity-100 hover:bg-opacity-70
          transition duration-400
          ${dynamicBackground==='Completed' ? 'bg-green-100' : 'bg-red-100'}`}>
          {children}
        </h1>
      )
    }
  }
  return (
    <h1 className='p-2 w-[99%] text-center border rounded-md text-sm cursor-pointer
      hover:bg-neutral-50 transition duration-400 bg-white'>
      {children}
    </h1>
  )
}


interface DataTableProps {
  setRecordsCallback: Dispatch<SetStateAction<recordData | undefined>>;
  studentData: userData[];
  search: string
  searchParam: searchParameters
}

const DataTable:React.FC<DataTableProps> = ({ setRecordsCallback, studentData, search, searchParam }) => {
    const [allRows, setAllRows] = useState<ReturnType<typeof createData>[]>();
    const [rows, setRows] = useState<ReturnType<typeof createData>[]>();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const [visibleRows, setVisibleRows] = useState<ReturnType<typeof createData>[]>();

    useEffect(() => {
      setAllRows(studentData.map((data:userData) => (createData(data))));
      setRecordsCallback(r);

      return () => {
        r['approved'] = 0;
        r['pending'] = 0;
        r['incomplete'] = 0;
      }
    }, []);

    const handleSearch = (all:ReturnType<typeof createData>[], s: string, filter: searchParameters) => {
      const temp:ReturnType<typeof createData>[] = [];
      if (filter === "Name"){
        for (let i = 0; i < all.length; i++){
          if (all[i].fullname.toLowerCase().includes(s.toLowerCase())){
            temp.push(all[i]);
          }
        }
      } else if (filter === "License Plate"){
        for (let i = 0; i < all.length; i++){
          for (let j = 0; j < all[i].carData.length; j++){
            const plate = all[i].carData[j].plate
            if (plate !== null && plate.toString().toLowerCase().includes(s.toLowerCase())){
              temp.push(all[i]);
              break;
            }
          }
        }
      } else if (filter === "Car Model"){
        for (let i = 0; i < all.length; i++){
          for (let j = 0; j < all[i].carData.length; j++){
            const model = all[i].carData[j].model
            if (model !== null && model.toLowerCase().includes(s.toLowerCase())){
              temp.push(all[i]);
              break;
            }
          }
        }
      } else if (filter === "Car Color"){
        for (let i = 0; i < all.length; i++){
          for (let j = 0; j < all[i].carData.length; j++){
            const color = all[i].carData[j].color
            if (color !== null && color.toLowerCase().includes(s.toLowerCase())){
              temp.push(all[i]);
              break;
            }
          }
        }
      } else if (filter === "Parking Spot"){
        for (let i = 0; i < all.length; i++){
          if (all[i].parkingspot.toString().toLowerCase().includes(s.toLowerCase())){
            temp.push(all[i]);
          }
        }
      }

      return temp;
    }

    useEffect(() => {
      if (allRows){
        setRows(handleSearch(allRows, search, searchParam));
        setPage(0);
      }
    }, [search, searchParam, allRows])

    useEffect(() => {
      if (rows){
        let startPoint = page * rowsPerPage;
        let endPoint = (page * rowsPerPage) + rowsPerPage
        if (endPoint >= rows.length){
          endPoint = rows.length;
        }
        setVisibleRows(rows.slice(startPoint, endPoint))  
      }
    }, [rows, page, rowsPerPage]);

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return (
      <div className='border-2 border-neutral-200 rounded-lg shadow-md overflow-hidden'>
        {rows && <TableContainer component={Paper}>
          <Table aria-label="student-table" size='small' >
              <TableHead>
                <TableRow >
                    <TableCell />
                    <TableCell><h1 className='text-sm font-semibold'>Student Name</h1></TableCell>
                    <TableCell><h1 className='text-sm font-semibold'>School Email</h1></TableCell>
                    <TableCell><h1 className='text-sm font-semibold'>Student Grade</h1></TableCell>
                    <TableCell><h1 className='text-sm font-semibold'>Birthday</h1></TableCell>
                    <TableCell><h1 className='text-sm font-semibold'>Parking Spot</h1></TableCell>
                    <TableCell><h1 className='text-sm font-semibold'>Tardies</h1></TableCell>
                    <TableCell><h1 className='text-sm font-semibold'>Pass Status</h1></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows && visibleRows.length > 0 ? 
                  visibleRows.map((row, index:number) => (
                    <Row key={row.email} row={row} />
                  ))
                :
                  <TableRow>
                    <TableCell colSpan={8}> {/* <---------- Increase if adding more info to main table headers (and other one ^^^^^) !!! */}
                      <div className='w-full py-8 px-10 text-lg text-neutral-400 font-semibold'>
                        <h1>No Student Found</h1>
                        <p className='text-base font-normal'>Searching by {searchParam}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination 
                    count={rows.length} 

                    page={page} 
                    onPageChange={(event:unknown, page:number) => (setPage(page))} 

                    rowsPerPage={rowsPerPage} 
                    rowsPerPageOptions={[10, 15]}
                    onRowsPerPageChange={handleRowsPerPageChange}
                  />
                </TableRow>
              </TableFooter>
          </Table>
        </TableContainer>}
      </div>
    );
}

export default DataTable