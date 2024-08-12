import { ReadonlyURLSearchParams } from "next/navigation"

export const createQueryString = (name: string, value: string, searchParams: ReadonlyURLSearchParams) => {
    const params = new URLSearchParams(searchParams);
    if(value) {
        params.set(name, value)
    
        return params.toString()
    } else {
        params.delete(name);

        return params.toString()
    }
}