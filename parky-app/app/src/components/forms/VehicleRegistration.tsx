'use client';

import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material';
import Footer from './Footer';
import UploadSection from './UploadSection';
import * as Yup from 'yup'
import { Form, Formik, Field, FormikErrors } from 'formik';

const VehicleRegistration:React.FC<FormPage> = ({
  selectedCallBack,
  data
}) => {
  const [secondCar, setSecondCar] = useState(false);

  useEffect(() => {
    if (data.form4completed){
      setSecondCar(data.car2model && data.car2modelyear && data.car2color && data.car2plate && data.car2registration && data.car2registrationimage)
    }
  }, [])

  const car2ids = ["car2model", "car2modelyear", "car2plate", "car2color", "car2registrationimage"]

  const handleCarChange = (
    car2: boolean, 
    setFieldTouched?:(field: string, isTouched?: boolean, shouldValidate?: boolean) => Promise<void | FormikErrors<{
      car1model: string;
      car1modelyear: string;
      car1plate: string;
      car1color: string;
      car1registrationimage: string;
      car2model: string;
      car2modelyear: string;
      car2plate: string;
      car2color: string;
      car2registrationimage: string;
      parentemail: string;
    }>>,
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<{
      car1model: string;
      car1modelyear: string;
      car1plate: string;
      car1color: string;
      car1registrationimage: string;
      car2model: string;
      car2modelyear: string;
      car2plate: string;
      car2color: string;
      car2registrationimage: string;
      parentemail: string;
    }>>
  ) => {

    setSecondCar(car2);

    if (car2) { 
      setSchema(schemaCar2)
    }
    else {
      setSchema(schemaCar1)
      if (setFieldValue !== undefined && setFieldTouched !== undefined){
        // for (let id in car2ids) {
        //   setFieldValue(id, "")
        //   setFieldTouched(id, false)
        // }
        for (let i = 0; i < car2ids.length; i++){
          setFieldValue(car2ids[i], "")
          setFieldTouched(car2ids[i], false)
        }
      }
      else {
        console.error("Uncaught error")
      }
    }
  }

  interface initialValuesProps {
    car1model: string
    car1modelyear: string
    car1plate: string
    car1color: string
    car1registrationimage: string
    car2model: string | null
    car2modelyear: string | null
    car2plate: string | null
    car2color: string | null
    car2registrationimage: string | null
    parentemail: string
  }

  const initialValues:initialValuesProps = {
    car1model: "",
    car1modelyear: "",
    car1plate: "",
    car1color: "",
    car1registrationimage: "",
    car2model: "",
    car2modelyear: "",
    car2plate: "",
    car2color: "",
    car2registrationimage: "",
    parentemail: "",
  }

  const licensePlateRegex:RegExp = /^[A-Z0-9]+$/
  const yearRegex:RegExp = /^\d{4}$/
  const lettersRegex:RegExp = /^[A-Za-z]+$/

  const schemaCar1 = Yup.object().shape({
    car1model:Yup.string()
    .required("Model Required"),
    car1modelyear:Yup.string()
    .required("Model Year Required")
    .matches(yearRegex, "Year should be in format XXXX"),
    car1plate:Yup.string()
    .required("License Plate Number Required")
    .matches(licensePlateRegex, "No Dashes, Spaces, Special Characters, or Lowercase Letters"),
    car1color:Yup.string()
    .required("Color Required")
    .matches(lettersRegex, "Must Use Letters Only"),
    car1registrationimage:Yup.mixed()
    .required("Registration Required")
    .test('fileFormat', 'Only PNG, JPG, and PDF files are allowed', (value:any) => {
      if (value) {
        const supportedFormates = ['pdf', 'png', 'jpg'];
        return supportedFormates.includes(value.name.split('.').pop())
      }
      return true
    }),

    parentemail:Yup.string()
    .required("Signature Required")
    .email("Invalid email")
  })

  const schemaCar2 = Yup.object().shape({
    car1model:Yup.string()
    .required("Model Required"),
    car1modelyear:Yup.string()
    .required("Model Year Required")
    .matches(yearRegex, "Year should be in format XXXX"),
    car1plate:Yup.string()
    .required("License Plate Number Required")
    .matches(licensePlateRegex, "No Dashes, Spaces, Special Characters, or Lowercase Letters"),
    car1color:Yup.string()
    .required("Color Required")
    .matches(lettersRegex, "Must Use Letters Only"),
    car1registrationimage:Yup.mixed()
    .required("Registration Required")
    .test('fileFormat', 'Only PNG, JPG, and PDF files are allowed', (value:any) => {
      if (value) {
        const supportedFormates = ['pdf', 'png', 'jpg'];
        return supportedFormates.includes(value.name.split('.').pop())
      }
      return true
    }),

    car2model:Yup.string()
    .required("Model Required"),
    car2modelyear:Yup.string()
    .required("Model Year Required")
    .matches(yearRegex, "Year should be in format XXXX"),
    car2plate:Yup.string()
    .required("Plate Required")
    .matches(licensePlateRegex, "No Dashes, Spaces, Special Characters, or Lowercase Letters"),
    car2color:Yup.string()
    .required("Color Required")
    .matches(lettersRegex, "Must Use Letters Only"),
    car2registrationimage:Yup.mixed()
    .required("Registration Required")
    .test('fileFormat', 'Only PNG, JPG, and PDF files are allowed', (value:any) => {
      if (value) {
        const supportedFormates = ['pdf', 'png', 'jpg'];
        return supportedFormates.includes(value.name.split('.').pop())
      }
      return true
    }),

    parentemail:Yup.string()
    .required("Signature Required")
    .email("Invalid email")
  })

  const [schema, setSchema] = useState<Yup.AnyObjectSchema>(schemaCar1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<{
    car1model: string;
    car1modelyear: string;
    car1plate: string;
    car1color: string;
    car1registrationimage: string;
    car2model: string;
    car2modelyear: string;
    car2plate: string;
    car2color: string;
    car2registrationimage: string;
    parentemail: string;
  }>>,
    id: string
  ) => {
    if (e.target.files !== null){
      setFieldValue(id, e.target.files[0])
    }
    else {
      setFieldValue(id, "")
    }
  }

  return (
      (data.form4completed ?
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-5 border-b pb-5'>
            <h1 className='text-xl'>Vehicle #1</h1>
            <div className='grid grid-cols-2 gap-5'>
              <TextField id="model-1" required disabled label="Model" value={data.car1model}/>
              <TextField id="model-year-1" required disabled label="Model Year" value={data.car1modelyear}/>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <TextField id="plate-1" required disabled label="License Plate Number" value={data.car1plate}/>
              <TextField id="color-1" required disabled label="Color" value={data.car1color}/>
            </div>
            <UploadSection disabled upload={data.car1registrationimage} label="Vehicle #1 Registration" required={true}/>

            {secondCar &&
              <>
                <div className='flex flex-row justify-between items-center mt-5'>
                  <h1 className='text-xl'>Vehicle #2</h1>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                  <TextField id="model-2" required disabled label="Model" value={data.car2model}/>
                  <TextField id="model-year-2" required disabled label="Model Year" value={data.car2modelyear}/>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                  <TextField id="plate-2" required disabled label="License Plate Number" value={data.car2plate}/>
                  <TextField id="color-2" required disabled label="Color" value={data.car2color}/>
                </div>
                <UploadSection disabled upload={data.car2registrationimage} label="Vehicle #2 Registration" required={secondCar}/>
              </>
            }
          </div>

          {selectedCallBack &&
            <h1 className='text-justify'>Parent <b>email</b> required (will serve as parent signature). 
            I hereby grant permission for my son/daughter to drive in the above-mentioned vehicles(s). 
            I do, therefore, hereby release the South Fayette Township School District and/or any of its employees 
            from any or all liability incidental to this activity. I further understand that this privilege will be honored 
            only as long as the student conforms to the conditions and regulations as outlined in the <span className='underline underline-offset-2 cursor-pointer hover:text-neutral-600 active:text-black' onClick={() => selectedCallBack(1)}>
            opening message</span> of this form AND in the <span className='underline underline-offset-2 cursor-pointer hover:text-neutral-600 active:text-black' onClick={() => selectedCallBack(3)}>
            student signature</span> section of this form.</h1>
          }

          <div className='grid grid-cols-1 gap-5'>
            <TextField id="parent_signature" required disabled label="Parent Signature" value={data.parentemail}/>
          </div>

          <Footer disabled/>

        </div>
      :
        <Formik 
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            values.car1color = values.car1color.toLowerCase()
            if (!secondCar){
              values.car2model = null;
              values.car2modelyear = null;
              values.car2color = null;
              values.car2plate = null;
              values.car2registrationimage = null;
            }
            else {
              if (values.car2model !== null && values.car2color !== null){
                values.car2color = values.car2color.toLowerCase()
              } else {
                console.error("Uncaught Error")
              }
            }
            console.log({"id":data.id, ...values})
            
          }}
          validationSchema={schema}
        >
          {({errors, touched, dirty, setFieldValue, setFieldTouched}) => (
            <Form className="flex flex-col gap-5">
              <>
                <div className='flex flex-col gap-5 border-b pb-5'>
                  <h1 className='text-xl'>Vehicle #1</h1>
                  <div className='grid grid-cols-2 gap-5'>
                    <Field 
                      name="car1model"
                      type="text"
                      as={TextField}
                      id="model_1" 
                      label="Model *"
                      error={Boolean(errors.car1model) && Boolean(touched.car1model)}
                      helperText={Boolean(touched.car1model) && errors.car1model}
                    />
                    <Field 
                      name="car1modelyear"
                      type="text"
                      as={TextField}
                      id="model_year_1" 
                      label="Model Year *"
                      error={Boolean(errors.car1modelyear) && Boolean(touched.car1modelyear)}
                      helperText={Boolean(touched.car1modelyear) && errors.car1modelyear}
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-5'>
                    <Field 
                      name="car1plate"
                      type="text"
                      as={TextField}
                      id="plate_1" 
                      label="License Plate Number *"
                      error={Boolean(errors.car1plate) && Boolean(touched.car1plate)}
                      helperText={Boolean(touched.car1plate) && errors.car1plate}
                    />
                    <Field 
                      name="car1color"
                      type="text"
                      as={TextField}
                      id="color_1" 
                      label="Color *"
                      error={Boolean(errors.car1color) && Boolean(touched.car1color)}
                      helperText={Boolean(touched.car1color) && errors.car1color}
                    />
                  </div>
                  <Field 
                    name="car1registrationimage"
                    type="file"
                    as={UploadSection}
                    disabled={false}
                    label="Vehicle 1 Registration"
                    required
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    touched={Boolean(touched.car1registrationimage)}
                    id="car1registrationimage"
                    error={Boolean(errors.car1registrationimage) && Boolean(touched.car1registrationimage)}
                    errorMessage={Boolean(touched.car1registrationimage) && errors.car1registrationimage}
                  />
                  {!secondCar && 
                    <h1 
                      className='
                        w-fit 
                        text-base 
                        text-blue-500 
                        cursor-pointer 
                        hover:text-blue-700 
                        hover:underline 
                        underline-offset-4 
                        active:text-blue-900
                      ' 
                      onClick={() => handleCarChange(true)}
                    >
                      Add Second Car
                    </h1>
                  }

                  {secondCar &&
                    <>
                      <div className='flex flex-row justify-between items-center mt-5'>
                        <h1 className='text-xl'>Vehicle #2</h1>
                        <h1 
                          className='
                            text-base 
                            text-blue-500 
                            cursor-pointer 
                            hover:text-blue-700 
                            hover:underline 
                            underline-offset-4 
                            active:text-blue-900
                          ' 
                          onClick={() => handleCarChange(false, setFieldTouched, setFieldValue)}
                        >
                          Remove Second Car
                        </h1>
                      </div>
                      <div className='grid grid-cols-2 gap-5'>
                        <Field 
                          name="car2model"
                          type="text"
                          as={TextField}
                          id="model_2" 
                          label="Model *"
                          error={Boolean(errors.car2model) && Boolean(touched.car2model)}
                          helperText={Boolean(touched.car2model) && errors.car2model}
                        />
                        <Field 
                          name="car2modelyear"
                          type="text"
                          as={TextField}
                          id="model_year_2" 
                          label="Model Year *"
                          error={Boolean(errors.car2modelyear) && Boolean(touched.car2modelyear)}
                          helperText={Boolean(touched.car2modelyear) && errors.car2modelyear}
                        />
                      </div>
                      <div className='grid grid-cols-2 gap-5'>
                        <Field 
                          name="car2plate"
                          type="text"
                          as={TextField}
                          id="plate_2" 
                          label="License Plate Number *"
                          error={Boolean(errors.car2plate) && Boolean(touched.car2plate)}
                          helperText={Boolean(touched.car2plate) && errors.car2plate}
                        />
                        <Field 
                          name="car2color"
                          type="text"
                          as={TextField}
                          id="color_2" 
                          label="Color *"
                          error={Boolean(errors.car2color) && Boolean(touched.car2color)}
                          helperText={Boolean(touched.car2color) && errors.car2color}
                        />
                      </div>
                      <Field 
                        name="car2registrationimage"
                        type="file"
                        as={UploadSection}
                        disabled={false}
                        label="Vehicle 2 Registration"
                        required
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        touched={Boolean(touched.car2registrationimage)}
                        id="car2registrationimage"
                        error={Boolean(errors.car2registrationimage) && Boolean(touched.car2registrationimage)}
                        errorMessage={Boolean(touched.car2registrationimage) && errors.car2registrationimage}
                      />
                    </>
                  }
                </div>
                {selectedCallBack &&
                  <h1 className='text-justify'>Parent <b>email</b> required (will serve as parent signature). 
                  I hereby grant permission for my son/daughter to drive in the above-mentioned vehicles(s). 
                  I do, therefore, hereby release the South Fayette Township School District and/or any of its employees 
                  from any or all liability incidental to this activity. I further understand that this privilege will be honored 
                  only as long as the student conforms to the conditions and regulations as outlined in the 
                  opening message of this form AND in the student signature section of this form.</h1>
                }

                <div className='grid grid-cols-1 gap-5'>
                  <Field 
                    name="parentemail"
                    type="text"
                    as={TextField}
                    id="parent_signature" 
                    label="Parent Signature *"
                    error={Boolean(errors.parentemail) && Boolean(touched.parentemail)}
                    helperText={Boolean(touched.parentemail) && errors.parentemail}
                  />
                </div>
                <Footer disabled={!dirty} />
              </>
            </Form>
          )}
        </Formik>
      )
  )
}

export default VehicleRegistration