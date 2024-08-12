import { fetchData } from "@/services/fetch";
import GerenciaContaContent from "./content";
import { cookies } from "next/headers";

export default async function GerenciaConta({searchParams}) {
    const user_value = cookies().get('user')?.value;
    const user = user_value && JSON.parse(user_value);

    if (user.type != 'admin') return <div className="h-screen flex items-center justify-center"><p>Você não tem autorização para acessar essa página.</p></div>

    const res = await fetchData(`users?type=organizer&page=${searchParams?.page ?? 1}`, 0);
    const { results, totalPages } = res;

    return (
        <GerenciaContaContent results={results} totalPages={totalPages} page={searchParams?.page ?? 1}/>
    )
}