'use client';

import React, { useEffect, useState } from 'react'
import { TextField, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import Footer from './Footer';
import { Formik, Form, Field } from 'formik';
import { date, object, string } from 'yup';

const ApplicantInformation:React.FC<FormPage> = ({
  data
}) => {
  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
    "New Hampshire", "New Jersey", "New Mexico", "New York", 
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
    "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
  ];

  const [grade, setGrade] = useState("");
  const [state, setState] = useState("");

  const handleGradeChange = (e : SelectChangeEvent) => {
    setGrade(e.target.value)
  }

  const handleStateChange = (e : SelectChangeEvent) => {
    setState(e.target.value);
  }


  interface DropDownProps {
    required: boolean
    id: string
    label: string
    items: string[]
    handler: (e: SelectChangeEvent) => void
    state: string
  }

  const DropDown:React.FC<DropDownProps> = ({
    required,
    id,
    label,
    items,
    handler,
    state
  }) => {
    return (
      <FormControl fullWidth required={required} id={id}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          value={state}
          label={label}
          onChange={handler} 
          >
            {items.map((element:string, index:number) => (
                <MenuItem key={element} value={element}>{element}</MenuItem>
            ))}
        </Select>
      </FormControl>
    )
  }

  interface initialValuesProps {
    firstname: string
    lastname: string
    birthday: string
    grade: string
    dlissuedate: string
    street: string
    street2: string | null
    city: string
    state: string
    zipcode: string
    parentfirstname: string
    parentlastname: string
    parentemail: string
    parentphonenumber: string
  }

  const initialValues:initialValuesProps = {
    firstname: "",
    lastname: "",
    birthday: "",
    grade: "",
    dlissuedate: "",
    street: "",
    street2: "",
    city: "",
    state: "",
    zipcode: "",
    parentfirstname: "",
    parentlastname: "",
    parentemail: "",
    parentphonenumber: "",
  }

  const phoneNUmberRegex:RegExp = /^\d{3}-\d{3}-\d{4}$/
  const zipCodeRegex:RegExp = /^\d{5}(-\d{4})?$/


  return (
      (data.form2completed ?
        <div className='flex flex-col gap-5'>
          <h1 className='text-xl'>Student Information</h1>
          <div className='grid grid-cols-2 gap-5'>
              <TextField id="student_firstname" required disabled label="First Name" value={data.fullname.split(" ")[0]}/>
              <TextField id="student_lastname" required disabled label="Last Name" value={data.fullname.split(" ")[data.fullname.split(" ").length-1]}/>
          </div>
          <div className='grid grid-cols-3 gap-5'>
            <TextField id="birthday" required disabled label="Birthday" value={data.birthday} InputLabelProps={{ shrink: true }} />
            <FormControl fullWidth required>
              <InputLabel id="grade-select-label">Incoming Grade</InputLabel>
              <Select
                labelId="grade-select-label"
                id="grade-select"
                value={data.grade}
                label="Incoming Grade"
                onChange={handleGradeChange}
                disabled
              >
                <MenuItem value={'11th Grade'}>11th Grade (Junior)</MenuItem>
                <MenuItem value={'12th Grade'}>12th Grade (Senior)</MenuItem>
              </Select>
            </FormControl>
            <TextField id="drivers-license-issue-date" required disabled label="Drivers License Issue Date" value={data.dlissueDate} InputLabelProps={{ shrink: true }} />
          </div>

          <h1 className='text-xl mt-2'>Address</h1>
          <div className='grid grid-cols-2 gap-5'>
              <TextField id="address_line_1" required disabled label="Address Line 1" value={data.street}/>
              <TextField id="address_line_1" disabled label="Address Line 2" value={data.street2 ? data.street2 : ""}/>
          </div>
          <div className='grid grid-cols-3 gap-5'>
              <TextField id="city" required disabled label="City" value={data.city}/>
              <FormControl fullWidth required>
                <InputLabel id="grade-select-label">State</InputLabel>
                <Select
                  labelId="state-select-label"
                  id="state-select"
                  value={data.state}
                  label="State"
                  onChange={handleStateChange}
                  disabled
                >
                  {usStates.map((state:string) => {
                    return (
                      <MenuItem key={state} value={state}>{state}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              <TextField id="zipcode" required disabled label="Zip Code" value={data.zipcode}/>
          </div>

          <h1 className='text-xl mt-2'>Parent Information</h1>
          <div className='grid grid-cols-2 gap-5'>
              <TextField id="parent_firstname" required disabled label="Parent First Name" value={data.parentfullname.split(" ")[0]}/>
              <TextField id="parent_lastname" required disabled label="Parent Last Name" value={data.parentfullname.split(" ")[data.parentfullname.split(" ").length-1]}/>
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <TextField id="email" required disabled label="Parent Email" value={data.parentemail}/>
            <TextField id="parent_phone" required disabled label="Parent Phone Number" value={data.parentphonenumber}/>
          </div>
          <Footer disabled/>
        </div>
      :
        <Formik initialValues={initialValues} 
          onSubmit={(values, formikHelper) => {
            values.grade = grade;
            values.state = state;
            if (values.street2 === ""){
              values.street2 = null
            }
            console.log({"id": data.id, ...values})
          }}
          validationSchema={object({
            firstname:string()
            .required("First Name Required"),
            lastname:string()
            .required("Last Name Required"),
            birthday:date()
            .required("Birthday Required"),
            grade:string(),
            dlissuedate:date()
            .required("DL Issue Date Required"),
            street:string()
            .required("Street Required"),
            street2:string(),
            city:string()
            .required("City Required"),
            state:string(),
            zipcode:string()
            .required("Zip Code Required")
            .matches(zipCodeRegex, "Zip Code Must Be Numbers as XXXXX or XXXXX-XXXX"),
            parentfirstname:string()
            .required("Parent First Name Required"),
            parentlastname:string()
            .required("Parent Last Name Required"),
            parentemail:string()
            .required("Parent Email Required")
            .email("Invalid email"),
            parentphonenumber:string()
            .required("Parent Phone Number Required")
            .matches(phoneNUmberRegex, 'Please format phone number as XXX-XXX-XXXX'),
          })}
        >
          {({errors, touched, dirty}) => (
            <Form className='w-full flex flex-col gap-5'>
              <h1 className='text-xl'>Student Information</h1>
              <div className='grid grid-cols-2 gap-5'>
                <Field 
                  name="firstname"
                  type="text"
                  as={TextField}
                  fullWidth
                  id="firstname"
                  label="First Name *"
                  error={Boolean(errors.firstname) && Boolean(touched.firstname)}
                  helperText={Boolean(touched.firstname) && errors.firstname}
                />
                <Field 
                  name="lastname"
                  type="text"
                  as={TextField}
                  fullWidth
                  id="lastname"
                  label="Last Name *"
                  error={Boolean(errors.lastname) && Boolean(touched.lastname)}
                  helperText={Boolean(touched.lastname) && errors.lastname}
                />
              </div>
              <div className='grid grid-cols-3 gap-5'>
                <Field 
                  name="birthday"
                  type="date"
                  as={TextField}
                  id="birthday"
                  label="Birthday *"
                  InputLabelProps={{ shrink: true}}
                  fullWidth
                  error={Boolean(errors.birthday) && Boolean(touched.birthday)}
                  helperText={Boolean(touched.birthday) && errors.birthday}
                />
                <Field
                  name="grade"
                  type="text"
                  as={DropDown}
                  required
                  id="grade"
                  label="Incoming Grade"
                  items = {[
                      '11th Grade', '12th Grade'
                  ]}
                  handler={handleGradeChange}
                  state={grade}
                />
                <Field 
                  name="dlissuedate"
                  type="date"
                  as={TextField}
                  id="dlissuedate"
                  label="Drivers License Issue Date *"
                  InputLabelProps={{ shrink: true}}
                  fullWidth
                  error={Boolean(errors.dlissuedate) && Boolean(touched.dlissuedate)}
                  helperText={Boolean(touched.dlissuedate) && errors.dlissuedate}
                /> 
              </div>

              <h1 className='text-xl'>Address</h1>
              <div className='grid grid-cols-2 gap-5'>
                <Field 
                  name="street"
                  type="text"
                  as={TextField}
                  id="street"
                  label="Address Line 1 *"
                  fullWidth
                  error={Boolean(errors.street) && Boolean(touched.street)}
                  helperText={Boolean(touched.street) && errors.street}
                />
                <Field 
                  name="street2"
                  type="text"
                  as={TextField}
                  id="street2"
                  label="Address Line 2"
                  fullWidth
                  error={Boolean(errors.street2) && Boolean(touched.street2)}
                  helperText={Boolean(touched.street2) && errors.street2}
                />
              </div>
              <div className='grid grid-cols-3 gap-5'>
                <Field 
                  name="city"
                  type="text"
                  as={TextField}
                  id="city"
                  label="City *"
                  fullWidth
                  error={Boolean(errors.city) && Boolean(touched.city)}
                  helperText={Boolean(touched.city) && errors.city}
                />
                <Field
                  name="state"
                  type="text"
                  as={DropDown}
                  required
                  id="state"
                  label="State"
                  items = {usStates}
                  handler={handleStateChange}
                  state={state}
                />
                <Field 
                  name="zipcode"
                  type="text"
                  as={TextField}
                  id="zipcode"
                  label="Zip Code *"
                  fullWidth
                  error={Boolean(errors.zipcode) && Boolean(touched.zipcode)}
                  helperText={Boolean(touched.zipcode) && errors.zipcode}
                />
              </div>

              <h1 className='text-xl'>Parent Information</h1>
              <div className='grid grid-cols-2 gap-5'>
                <Field 
                  name="parentfirstname"
                  type="text"
                  as={TextField}
                  fullWidth
                  id="parentfirstname"
                  label="Parent First Name *"
                  error={Boolean(errors.parentfirstname) && Boolean(touched.parentfirstname)}
                  helperText={Boolean(touched.parentfirstname) && errors.parentfirstname}
                />
                <Field 
                  name="parentlastname"
                  type="text"
                  as={TextField}
                  fullWidth
                  id="parentlastname"
                  label="Parent Last Name *"
                  error={Boolean(errors.parentlastname) && Boolean(touched.parentlastname)}
                  helperText={Boolean(touched.parentlastname) && errors.parentlastname}
                />
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <Field 
                  name="parentemail"
                  type="email"
                  as={TextField}
                  fullWidth
                  id="parentemail"
                  label="Parent Email *"
                  error={Boolean(errors.parentemail) && Boolean(touched.parentemail)}
                  helperText={Boolean(touched.parentemail) && errors.parentemail}
                />
                <Field 
                  name="parentphonenumber"
                  type="text"
                  as={TextField}
                  fullWidth
                  id="parentphonenumber"
                  label="Parent Phone Number *"
                  error={Boolean(errors.parentphonenumber) && Boolean(touched.parentphonenumber)}
                  helperText={Boolean(touched.parentphonenumber) && errors.parentphonenumber}
                />
              </div>
              <Footer disabled={!dirty} />
            </Form>
          )}
        </Formik>
      )    

  )
}

export default ApplicantInformation