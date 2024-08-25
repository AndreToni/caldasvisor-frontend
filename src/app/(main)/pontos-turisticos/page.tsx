import { CardDefault } from "@/components/cards/CardDefault";
import { InputSearch } from "@/components/form-components/InputSearch";
import { fetchData } from "@/services/fetch";
import { useEffect } from "react";
import VLibras from 'vlibras-nextjs';

export default async function Eventos({ searchParams }) {
    const { results } = await fetchData(`tourist-attractions?${searchParams?.input && `input=${searchParams?.input}`}`, 0);

    return (
        <div className="flex flex-col gap-6 py-6 w-full max-w-7xl max-lg:px-[25px] mx-auto">
            <h1 className="font-heading1">Pontos turísticos</h1>
            <InputSearch />
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map(item => <CardDefault key={item.id} place={item} />)}
            </div>
            <ClientOnlyVLibras />
        </div>
    )
}

function ClientOnlyVLibras() {
    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            import('vlibras-nextjs').then(({ default: VLibras }) => {
                VLibras({forceOnload: true});
            }).catch(error => console.error("VLibras failed to load:", error));
        }
    }, []);

    return null;
}
