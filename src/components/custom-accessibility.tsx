'use client'

import VLibras from 'vlibras-nextjs';

export function CustomAccessibility() {
    return (
        <>
            {process.env.NODE_ENV === "production" && (
                <div className="fixed bottom-10 right-10 z-[9999]">
                    <VLibras forceOnload />
                </div>
            )}
        </>
    )
}