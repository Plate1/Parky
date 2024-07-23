'use client';

import React from 'react'

interface SchoolProps {
  school: string
}

const School:React.FC<SchoolProps> = ({
  school
}) => {
  return (
    <div className='text-sm inline-block text-justify'>
        {school}
    </div>
  )
}

export default School