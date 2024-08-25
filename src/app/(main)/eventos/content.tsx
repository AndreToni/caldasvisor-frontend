'use client'

import { CardDefault } from "@/components/cards/CardDefault";
import { InputSearch } from "@/components/form-components/InputSearch";
import VLibras from 'vlibras-nextjs';


export default async function EventosContent({results}) {
    return (
        <div className="flex flex-col gap-6 py-6 w-full max-w-7xl max-lg:px-[25px] mx-auto">
            <h1 className="font-heading1">Eventos</h1>
            <InputSearch />
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {
                    results.map(item => <CardDefault key={item.id} place={{...item, type: 'event'}} />)
                }
            </div>
            {process.env.NODE_ENV === "production" && <VLibras forceOnload />}
        </div>
    )
}