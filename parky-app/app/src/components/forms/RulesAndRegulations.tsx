'use client';

import React from 'react'
import { TextField } from '@mui/material'
import Footer from './Footer';
import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';

const RulesAndRegulations:React.FC<FormPage> = ({
  data
}) => {

  const initialValues = {
    "email": ""
  }

  return (
    <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-7 pr-4 border-b pb-5'>
            <h1 className='text-justify text-lg'>The student must review and agree to the rules and regulations below. The student must enter their school <b>email</b> below to serve as a student signature.</h1>
            <p className='text-justify'>1. Students must park where assigned and have their parking permit displayed on the rear view mirror. </p>
            <p className='text-justify'>2. Students must park in their assigned spaces and in designated student parking lots during school hours. Students who do not park in their assigned space and/or do not park in a student lot will be subject to disciplinary actions.</p>
            <p className='text-justify'>3. Student drivers should arrive no earlier than 6:50 a.m. and must be seated in first period class by 7:20 a.m.</p>
            <p className='text-justify'>4. Students may not go to their cars during the school day or leave school grounds unless given permission from the principal or Dean of Students. Students who are given such permission will be accompanied to their vehicle.</p>
            <p className='text-justify'>5. Students must observe all Pennsylvania State driving laws.</p>
            <p className='text-justify'>6. All cars parked in the parking lot must be locked.</p>
            <p className='text-justify'>7. All school district policies including those that prohibit the possession or use of weapons, drugs, alcohol, or tobacco apply to student drivers. Any vehicle parked on school property is subject to search for reasonable suspicion related to the health, safety, or well-being of the students.</p>
            <p className='text-justify'>8. DRIVERS CANNOT EXIT THE SCHOOL UNTIL THE BUSES HAVE DEPARTED AND THE ANNOUNCEMENT HAS BEEN MADE FOR CAR RIDERS TO DEPART.</p>
            <p className='text-justify'>9. A complete listing of regulations for student drivers is included in the Student/Parent Handbook. Please review them carefully.</p>
            <p className='text-justify'>10. Student drivers who are TARDY to school FOUR (4) times will have their permit suspended for TEN (10) school days.</p>
            <p className='text-justify'>11. Student drivers who are TARDY to school FIVE (5) times will have their permit suspended for FORTY-FIVE (45) school days.</p>
            <p className='text-justify'>MORE THAN FIVE tardies will result in the permit being revoked for the remainder of the school year with NO REFUNDS.</p>
            <p className='text-justify'>VIOLATIONS OF THE REGULATIONS ABOVE WILL RESULT IN IMMEDIATE REVOCATION OF YOUR PARKING PERMIT FOR THE REMAINDER OF THE SEMESTER. NO EXCEPTIONS WILL BE MADE. STUDENTS WHO DRIVE TO SCHOOL AFTER THEIR PARKING PERMIT HAS BEEN REVOKED WILL BE ASSIGNED ADDITIONAL CONSEQUENCES.</p>
        </div>

        {data.form3completed ?
          <>
            <div className='grid grid-cols-1 gap-5'>
                <TextField id="student_signature" required disabled label="Student Signature" value={data.email}/>
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
              .email("Invalid Email")
            })}
          >
            {({errors, touched, dirty}) => (
              <Form className='flex flex-col gap-5'>
                <Field 
                  name="email"
                  type="email"
                  as={TextField}
                  id="student_signature" 
                  label="Student Signature *"
                  fullWidth
                  error = {Boolean(errors.email) && Boolean(touched.email)}
                  helperText={Boolean(touched.email) && errors.email}
                />
                <Footer 
                  disabled={!dirty}
                />
              </Form>
            )}
          </Formik>
        }
    </div>
  )
}

export default RulesAndRegulations