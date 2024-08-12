import { CardDefault } from "@/components/cards/CardDefault";
import { fetchData } from "@/services/fetch";
import { cookies } from "next/headers";

export default async function MyPlaces() {
    const user_value = cookies().get('user')?.value;
    const user = user_value && JSON.parse(user_value);
    const { results } = await fetchData(`events?organizer=${user.id}`, 0);

    return (
        <main className="flex flex-col gap-6 py-6 w-full max-w-7xl max-lg:px-[25px] mx-auto">
            <h1 className="font-heading1">Meus eventos</h1>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {
                    results.map(item => <CardDefault place={{...item, type: 'event'}} myPlace={true} />)
                }
            </div>
        </main>
    )
}