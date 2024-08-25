import { CardDefault } from "@/components/cards/CardDefault";
import { InputSearch } from "@/components/form-components/InputSearch";
import { fetchData } from "@/services/fetch";
import VLibras from 'vlibras-nextjs';


export default async function Eventos({searchParams}) {
    const { results } = await fetchData(`events?${searchParams?.input && `input=${searchParams?.input}`}`, 0);

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