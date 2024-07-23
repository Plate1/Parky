'use client';

import { FormikErrors } from 'formik';
import React from 'react'
import { LuExternalLink } from "react-icons/lu";

interface UploadSectionProps {
    label: string
    disabled: boolean
    upload?: any
    error?: boolean
    errorMessage?: string
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any, id: string )=> void 
    setFieldValue?: any
    setFieldTouched?: (id: string, touched: boolean) => void
    touched?: boolean
    id?: string
    required: boolean
}

const UploadSection:React.FC<UploadSectionProps> = ({
    label,
    disabled,
    upload,
    error,
    errorMessage,
    handleChange,
    setFieldValue,
    setFieldTouched,
    touched,
    required,
    id
}) => {
    const handleTouched = () => {
        if (setFieldTouched !== undefined && id !== undefined && touched !== undefined) {
            if (!touched){
                setFieldTouched(id, true)
            }
        }
        else {
            console.error("Uncaught Error")
        }
    }

    return(
        (disabled ? 
            <div className='flex flex-row justify-between p-3 items-center border border-neutral-300 rounded-md'>
                <div className='flex flex-col gap-1 text-neutral-400 flex-shrink'>
                    {required ? <h1>{label} *</h1> : <h1>{label}</h1>}
                    <p className='text-xs'>PNG, JPG, or PDF are Allowed</p>
                </div>
                {upload &&
                    <a href={upload} target="_blank" className=' flex-shrink py-1 mr-2 cursor-pointer border-b-2 border-b-white hover:border-b-green-300 active:text-neutral-500 active:border-b transition duration-100
                        flex flex-row justify-between items-center gap-2 text-neutral-700'>
                        <h1>Show Upload</h1>
                        <LuExternalLink />
                    </a>
                }
            </div>
        :
            <div className='flex flex-col gap-1'>
                <div className={`flex flex-row justify-between p-3 items-center border rounded-md  ${error !== undefined && error ? 'border-red-300 text-red-500' : 'border-neutral-300 text-neutral-500'}`}>
                    <div className='flex flex-col gap-1'>
                        {required ? <h1>{label} *</h1> : <h1>{label}</h1>}
                        <p className='text-xs'>PNG, JPG, or PDF are Accepted</p>
                    </div>
                    {(handleChange !== undefined && setFieldValue !== undefined && id !== undefined && setFieldTouched !== undefined && touched !== undefined) ? 
                        <input 
                            onChange={(e) => handleChange(e, setFieldValue, id)} type="file"
                            onClick={handleTouched}
                            accept='.png,.jpg,.pdf'
                            className=" text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" 
                        />
                    :
                        <div className='text-red-400'>
                            Uncaught Error
                        </div>
                    }
                </div>
                {error !== undefined && errorMessage !== undefined && error && <h1 className='ml-1 text-sm text-red-500'>
                    {errorMessage}
                </h1>}
            </div>
        )
    )
}

export default UploadSection