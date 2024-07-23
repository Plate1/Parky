'use client';

import React, { useState } from 'react'
import UploadSection from './UploadSection'
import Footer from './Footer';
import { Formik, Form, Field, FormikErrors } from 'formik';
import * as Yup from 'yup';

interface UploadsProps {
  data: userData
}

const Uploads:React.FC<UploadsProps> = ({
  data
}) => {
  const completed = (data.dlupload !== "Incomplete" && data.insuranceupload !== "Incomplete")

  const initialValues = {
    dluploadimage: "",
    insuranceuploadimage: ""
  }

  const validationRules = Yup.object().shape({
    dluploadimage:Yup.mixed()
    .required("Upload is Required")
    .test('fileFormat', 'Only PNG, JPG, and PDF files are allowed', (value:any) => {
      if (value) {
        const supportedFormates = ['pdf', 'png', 'jpg'];
        return supportedFormates.includes(value.name.split('.').pop())
      }
      return true
    }),
    insuranceuploadimage:Yup.mixed()
    .required("Upload is Required")
    .test('fileFormat', 'Only PNG, JPG, and PDF files are allowed', (value:any) => {
      if (value) {
        const supportedFormates = ['pdf', 'png', 'jpg'];
        return supportedFormates.includes(value.name.split('.').pop())
      }
      return true
    })
  })


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<{
    dluploadimage: string;
    insuranceuploadimage: string;
}>>, id:string) => {
    if (e.target.files !== null){
      setFieldValue(id, e.target.files[0]);
    }
    else {
      setFieldValue(id, "");
    }
  }

  return (
    <div className='w-full'>
        { completed ? 
          <div className='flex flex-col gap-5'>
            <h1 className='text-xl'>Uploads</h1>
            <UploadSection disabled upload={data.dluploadimage} label='Drivers License' required/>  
            <UploadSection disabled upload={data.insuranceuploadimage} label='Insurance Form/Card' required/>
            <Footer disabled />
          </div>
        :
          <Formik
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              console.log({"id":data.id, ...values})
            }}
            validationSchema={validationRules}
          >
            {({errors, touched, dirty, setFieldValue, setFieldTouched}) => (
              <Form className='flex flex-col gap-5'>
                <Field 
                  name="dluploadimage"
                  type="file"
                  as={UploadSection}
                  disabled={false}
                  label='Drivers License'
                  required
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  touched={Boolean(touched.dluploadimage)}
                  id="dluploadimage"
                  error={Boolean(errors.dluploadimage) && Boolean(touched.dluploadimage)}
                  errorMessage={Boolean(touched.dluploadimage) && errors.dluploadimage}
                />
                <Field 
                  name="insuranceuploadimage"
                  type="file"
                  as={UploadSection}
                  disabled={false}
                  label='Insurance Form/Card'
                  required
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  touched={Boolean(touched.insuranceuploadimage)}
                  id="insuranceuploadimage"
                  error={Boolean(errors.insuranceuploadimage) && Boolean(touched.insuranceuploadimage)}
                  errorMessage={Boolean(touched.insuranceuploadimage) && errors.insuranceuploadimage}
                />
                <Footer disabled={!dirty} />
              </Form>
            )}
          </Formik>
        }        
    </div>
  )
}

export default Uploads


