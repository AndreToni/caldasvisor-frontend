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


export function ButtonIcon({label, Icon, large, full, disabled, onClick}:Props) {
    return(
        <button className={`
            ${large ? 'lg:px-4 p-4 h-12' : 'lg:px-6 p-4 h-10'}
            ${full ? 'w-full': 'w-fit'}
            bg-secondary-pure 
            hover:bg-secondary-dark hover:shadow-button 
            active:bg-secondary-light 
            disabled:bg-secondary-light/40 disabled:shadow-none
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