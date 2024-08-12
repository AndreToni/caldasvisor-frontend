import { cookies } from "next/headers";
import { CreatePlaceContent } from "./content";

export default function CreatePlace() {
    const user_value = cookies().get('user')?.value;
    const user = user_value && JSON.parse(user_value);

    if(user.type == 'customer') return <div className="h-screen flex items-center justify-center"><div className="h-screen flex items-center justify-center"><p>Você não tem autorização para acessar essa página.</p></div></div>

    return (
        <CreatePlaceContent />
    )
}