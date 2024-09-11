'use client'

import VLibras from 'vlibras-nextjs';

export function CustomAccessibility() {
    return (
        <>
            {process.env.NODE_ENV === "production" && (
                <div className="fixed bottom-10 right-0 mr-4 z-[9999] pointer-events-auto">
                    <VLibras forceOnload />
                </div>
            )}
        </>
    )
}