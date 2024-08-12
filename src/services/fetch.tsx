import { cookies } from "next/headers";

export const fetchData = async (path: string, ttl?: number) => {
    const token = cookies().get('access_token');
    const res = await fetch('http://caldasvisor-backend-production.up.railway.app/' + path, {
        headers: {
            'authorization': token?.value ? `bearer ${token.value}` : null
        },
        next: {
            revalidate: ttl ?? 60 * 60 * 4
        }
    });
    const data = await res.json();
    return data;
}