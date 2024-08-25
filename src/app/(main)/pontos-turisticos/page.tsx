'use client';

import { useEffect } from "react";
import { CardDefault } from "@/components/cards/CardDefault";
import { InputSearch } from "@/components/form-components/InputSearch";
import { fetchData } from "@/services/fetch";
import VLibras from 'vlibras-nextjs';

export default async function Eventos({searchParams}) {
    const { results } = await fetchData(`tourist-attractions?${searchParams?.input && `input=${searchParams?.input}`}`, 0);

    return (
        <div className="flex flex-col gap-6 py-6 w-full max-w-7xl max-lg:px-[25px] mx-auto">
            <h1 className="font-heading1">Pontos turísticos</h1>
            <InputSearch />
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map(item => <CardDefault key={item.id} place={item} />)}
            </div>
            <ClientOnlyVLibras />
        </div>
    )
}

function ClientOnlyVLibras() {
    useEffect(() => {
        // Verifica se estamos no ambiente de produção
        if (process.env.NODE_ENV === "production") {
            // Cria um novo elemento script para carregar o VLibras
            const script = document.createElement('script');
            script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
            script.async = true;
            script.onload = () => {
                // Inicializa o VLibras após o script ser carregado
                if (window.VLibras) {
                    new window.VLibras.Widget('https://vlibras.gov.br/app');
                } else {
                    console.error('VLibras failed to load.');
                }
            };
            document.body.appendChild(script);

            // Limpa o script quando o componente é desmontado
            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);

    return null;
    }