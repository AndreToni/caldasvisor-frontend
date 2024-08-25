import { fetchData } from "@/services/fetch";
import EventosContent from "./content";


export default async function Eventos({searchParams}) {
    const { results } = await fetchData(`events?${searchParams?.input && `input=${searchParams?.input}`}`, 0);

    return (
        <EventosContent results={results}/>
    )
}