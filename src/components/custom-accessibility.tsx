'use client'

import { useEffect, useState } from 'react';
import VLibras from 'vlibras-nextjs';

export function CustomAccessibility() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    return (
        <>
            {process.env.NODE_ENV === "production" && <VLibras forceOnload />}
        </>
    )
}