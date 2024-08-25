
import { fetchData } from "@/services/fetch";
import { PontosTuristicosContent } from "./content";

export default async function Eventos({searchParams}) {
    const { results } = await fetchData(`tourist-attractions?${searchParams?.input && `input=${searchParams?.input}`}`, 0);

    return (
        <PontosTuristicosContent results={results}/>
    )
}