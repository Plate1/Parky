'use client';

import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Footer from './Footer';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';

const PassInformation:React.FC<FormPage> = ({
  data
}) => {
  
  const initialValues = {
    email : "",
    parentemail : ""
  }

  return (
    <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-7 pr-4 border-b pb-5'>
            <h1 className='text-justify text-lg'>The following conditions must be adhered to in order for students to retain their parking passes. The student must enter their school <b>email</b> and the parent/guardian their <b>email</b> below to serve as a signature.</h1>
            <p className='text-justify'>1. Students may only park in the designated student parking areas: Front parking lot (second row), Fine Arts lot (first four rows), and Stadium lot Students may not park in the visitor or faculty/staff parking areas.</p>
            <p className='text-justify'>2. All student parking spaces are numbered. The space number corresponds to the number on the parking tag. Students must parkin their designated space.</p>
            <p className='text-justify'>3. Students must have a valid Pennsylvania driver's license at the time of registration. Parking permits will not be reserved for those with a learner's permit.</p>
            <p className='text-justify'>4. Students may not "swap" or share parking permits. Students must obtain their own parking permit.</p>
            <p className='text-justify'>5. All student driving regulations on the parking permit application and the Student-Parent Handbook MUST be followed. Failure to do so will result in revocation of parking privileges. Permit fees are NON-REFUNDABLE for any reason.</p>
            <p className='text-justify'>6. Students are expected to be in their first period class by 7:20 a.m. Allow extra time to obey speed limits and walk from your designated space. Excessive "tardies" will result in loss of parking privileges. Please pay particular attention to items #10 and #11 in hte Rules and Regulations section.</p>
            <p className='text-justify'>7. A complete listing of regulations for student drivers is included in the Student-Parent Handbook. Please review them carefully.</p>
        </div>

        {data.form1completed ?
          <>
            <div className='grid grid-cols-2 gap-5'>
                <TextField id="student_signature" required disabled type='email' label="Student Signature" value={data.email}/>
                <TextField id="parent_signature" required disabled type='email' label="Parent/Guardian Signature" value={data.parentemail}/>
            </div>
            <Footer disabled/>
          </>
        :
            <Formik initialValues={initialValues} 
              onSubmit={(values, formikHelpers) => {
                console.log({"id": data.id, ...values})
              }}
              validationSchema={object({
                email:string()
                .required("Please enter student email")
                .email("Invalid email"),
                parentemail:string()
                .required("Please enter parent email")
                .email("Invalid email")
              })}
            >
              {({errors, dirty, touched}) => (
                <Form className='w-full flex flex-col gap-5'>
                  <div className='w-full grid grid-cols-2 gap-5'>
                    <Field 
                      name="email"
                      type="email"
                      as={TextField}
                      fullWidth
                      id="student_signature" 
                      label="Student Signature *"
                      error={Boolean(errors.email) && Boolean(touched.email)}
                      helperText={Boolean(touched.email) && errors.email}
                    />
                    <Field 
                      name="parentemail"
                      type="email"
                      as={TextField}
                      fullWidth
                      id="parent_signature" 
                      label="Parent Signature *"
                      error={Boolean(errors.parentemail) && Boolean(touched.parentemail)}
                      helperText={Boolean(touched.parentemail) && errors.parentemail}
                    />
                  </div>

                  <Footer disabled={!dirty} />
                </Form>
              )}
            </Formik>
        }

    </div>
  )
}

export default PassInformation