'use client'

import { FiSearch } from "react-icons/fi";
import { ButtonPrimary } from "../buttons/ButtonPrimary";
import { useTextField } from "ui-form-components";
import { createQueryString } from "@/helpers/query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function InputSearch() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname()
    const search = useTextField({});

    return (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-shapes-background-aux rounded">
            <FiSearch size={24} />
            <input
                type="text"
                className="flex-1 h-10 bg-transparent outline-none placeholder:font-paragraph2 placeholder:text-paragraph"
                placeholder="Pesquise pelo nome"
                value={search.value}
                onChange={e => search.setValue(e.target.value)}
            />
            <div className="bg-grey1 w-full h-[2px] lg:w-[2px] lg:h-10 rounded-sm"></div>
            <div className="flex lg:hidden w-full">
                <ButtonPrimary label="Pesquisar" onClick={() => {
                    router.push('/secretaria/usuarios?' + createQueryString('input', search.validate() ? search.value : null, searchParams));
                }} large full />
            </div>
            <div className="hidden lg:flex">
                <ButtonPrimary label="Pesquisar" onClick={() => {
                    router.push(path + '?' + createQueryString('input', search.validate() ? search.value : null, searchParams));
                }} />
            </div>
        </div>
    )
}