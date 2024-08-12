import { fetchData } from "@/services/fetch";
import EventViewContent from "./content";

export default async function EventView({ params }) {
    const { result } = await fetchData(`events/${params.id}`, 0);

    return (
        <EventViewContent result={result} />
    )
}