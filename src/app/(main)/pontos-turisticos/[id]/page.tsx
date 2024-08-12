import { fetchData } from "@/services/fetch";
import { TouristAttractionsViewContent } from "./content";

export default async function TouristAttractionsView({params}) {
    const { result } = await fetchData(`tourist-attractions/${params.id}`, 0);

    return (
        <TouristAttractionsViewContent result={result}/>
    )
}