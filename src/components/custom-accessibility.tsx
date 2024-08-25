'use client'

import VLibras from 'vlibras-nextjs';

export function CustomAccessibility() {
    return (
        <>
            {process.env.NODE_ENV === "production" && <VLibras forceOnload />}
        </>
    )
}