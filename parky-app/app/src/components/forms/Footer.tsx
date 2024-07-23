'use client';

import { Button } from '@mui/material';
import React from 'react'

interface FooterProps {
    submitCallback?: () => void
    enabled?: boolean
    disabled?: boolean
}

const Footer:React.FC<FooterProps> = ({
    submitCallback,
    enabled,
    disabled,
}) => {
  return (
    // (enabled ? 
    //   <div className='flex flex-row justify-end gap-5 w-full items-center'>
    //     <button onClick={submitCallback} className='py-1 px-3 border-2 rounded-md shadow-sm border-green-300 bg-green-300 text-white'>Submit Section</button>
    //   </div>
    // :
    //   <div className='flex flex-row justify-end gap-5 w-full items-center'>
    //     <div className='py-1 px-3 border rounded-md border-neutral-300 bg-white text-neutral-300'>Submit Section</div>
    //   </div>
    // )
    (disabled ? 
      <Button disabled type='submit' variant='contained' color='primary' size='large'>
        Submit Section
      </Button>
    :
      <Button type='submit' variant='contained' color='primary' size='large'>
        Submit Section
      </Button>
    )
  )
}

export default Footer