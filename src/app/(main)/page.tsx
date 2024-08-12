import { fetchData } from "@/services/fetch";
import HomeContent from "./content";

export default async function Home() {
  const { results: attractions } = await fetchData(`tourist-attractions`, 0);
  const { results: events } = await fetchData(`events`, 0);
  
  return (
    <HomeContent results={[...events.map(item => {
      return {
        ...item,
        type: 'event'
      }
    }), ...attractions.map(item => {
      return {
        ...item,
        type: 'touristAttraction'
      }
    })]} />
  )
}
