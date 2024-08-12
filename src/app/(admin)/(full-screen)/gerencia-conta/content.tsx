'use client'

import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { ButtonSecondary } from "@/components/buttons/ButtonSecondary";
import { IUser } from "@/models/user.model";
import { api } from "@/services/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function GerenciaContaContent({ results, totalPages, page }: { results: IUser[], totalPages: number, page: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
    
          return params.toString()
        },
        [searchParams]
      )

    return (
        <main className="flex flex-col gap-6 py-6 w-full max-w-7xl max-lg:px-[25px] mx-auto">
            <h1 className="font-heading1">Gerencia de conta</h1>
            <div>
                <div className="overflow-auto ">
                    <div className="w-fit min-w-full">
                        <div className="px-[88px] py-6 flex gap-4 bg-[#f4f4f4] w-full">
                            <div className="w-[173px] min-w-[173px] p-2"><p className="font-paragraph1">Nome</p></div>
                            <div className="w-[173px] min-w-[173px] p-2"><p className="font-paragraph1">Email</p></div>
                            <div className="w-[173px] min-w-[173px] p-2"><p className="font-paragraph1">Cidade</p></div>
                            <div className="w-[173px] min-w-[173px] p-2"><p className="font-paragraph1">Empresa</p></div>
                            <div className="w-[173px] min-w-[173px] p-2"><p className="font-paragraph1">CNPJ</p></div>
                        </div>
                        {results.map(item => {
                            const slug = item.name.split(' ',).map(item => item.slice(0, 1)).slice(0, 2);
                            return (
                                <div className="px-6 py-4 border-t  flex items-center gap-4 bg-shapes-background-aux w-fit min-w-full" key={item.id}>
                                    <div className="w-12 h-12 bg-primary-pure flex items-center justify-center rounded-full text-white font-semibold text-base" style={{minWidth: '3rem'}}>
                                        <span>{slug}</span>
                                    </div>
                                    <div className="w-[173px] min-w-[173px] flex items-center px-2"><p className="font-paragraph2 overflow-hidden text-ellipsis flex-1">{item.name}</p></div>
                                    <div className="w-[173px] min-w-[173px] flex items-center px-2"><p className="font-paragraph2 overflow-hidden text-ellipsis flex-1">{item.email}</p></div>
                                    <div className="w-[173px] min-w-[173px] flex items-center px-2"><p className="font-paragraph2 overflow-hidden text-ellipsis flex-1">{item.city}</p></div>
                                    <div className="w-[173px] min-w-[173px] flex items-center px-2"><p className="font-paragraph2 overflow-hidden text-ellipsis flex-1">{item.companyName}</p></div>
                                    <div className="w-[173px] min-w-[173px] flex items-center px-2"><p className="font-paragraph2 overflow-hidden text-ellipsis flex-1">{item.companyDocument}</p></div>
                                    {item.active ?
                                        <ButtonSecondary
                                            label="Disabilitar organizador"
                                            onClick={async () => {
                                                if (confirm('Deseja mesmo desabilitar o usuário como organizador?')) {
                                                    await api.post(`users/disabled/${item.id}`);
                                                    router.refresh();
                                                }
                                            }}
                                        />
                                        :
                                        <ButtonPrimary
                                            label="Aprovar como organizador"
                                            onClick={async () => {
                                                if (confirm('Deseja mesmo aprovar o usuário como organizador?')) {
                                                    await api.post(`users/active/${item.id}`);
                                                    router.push('/gerencia-conta');
                                                    router.refresh();
                                                }
                                            }}
                                        />
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="h-10 flex items-center justify-between">
                    <span className="font-paragraph1 text-paragraph">Página <strong>{page ?? 1}</strong> até a <strong>{totalPages}</strong></span>
                    <div className="flex gap-2">
                        <button className={`h-10 w-10 flex items-center justify-center disabled:opacity-30`} disabled={page <= 1} onClick={() => page > 1 && router.push(pathname + '?' + createQueryString('page', `${page - 1}`))}><FiChevronLeft /></button>
                        <button className="h-10 w-10 flex items-center justify-center disabled:opacity-30" disabled={page >= totalPages} onClick={() => page < totalPages && router.push(pathname + '?' + createQueryString('page', `${page + 1}`))}><FiChevronRight /></button>
                    </div>
                </div>
            </div>
        </main>
    )
}