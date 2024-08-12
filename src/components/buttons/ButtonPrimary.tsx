'use client'

import { use, useState } from 'react';
import React from 'react';

interface Props{
    onClick: () => void,
    label: string,
    Icon?: React.FC,
    large?: boolean,
    full?: boolean,
    disabled?: boolean
}


export function ButtonPrimary({label, Icon, large, full, disabled, onClick}:Props) {
    return(
        <button className={`
            ${large ? 'lg:px-16 p-4 h-12' : 'lg:px-6 p-4 h-10'}
            ${full ? 'w-full': 'w-fit'}
            bg-primary-pure 
            hover:bg-primary-dark hover:shadow-button 
            active:bg-primary-light 
            disabled:bg-primary-light/40 disabled:shadow-none
            flex items-center justify-center
            gap-2
            font-paragraph1 text-white
            rounded-[4px]
            transition-all
        `}
            disabled={disabled}
            onClick={() => onClick()}
        >
            {Icon && <Icon />}
            {label}
        </button>
    )
}