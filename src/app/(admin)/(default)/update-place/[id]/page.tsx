import { cookies } from "next/headers";
import { UpdatePlaceContent } from "./content";
import { fetchData } from "@/services/fetch";

export default async function UpdatePlace({params}) {
    const user_value = cookies().get('user')?.value;
    const user = user_value && JSON.parse(user_value);

    let {result} = await fetchData(`events/${params.id}`, 0);
    let type = 1;

    if(!result) {
        type = 2;
        result = await fetchData(`tourist-attractions/${params.id}`, 0).then(res => res.result);
    }

    if(!result) return <div className="h-screen flex items-center justify-center"><div className="h-screen flex items-center justify-center"><p>Ops, parece que o ponto turistico ou evento não foi encontrado.</p></div></div>

    if(user.type == 'customer') return <div className="h-screen flex items-center justify-center"><div className="h-screen flex items-center justify-center"><p>Você não tem autorização para acessar essa página.</p></div></div>
    
    return (
        <UpdatePlaceContent place={result} type={type}/>
    )
}