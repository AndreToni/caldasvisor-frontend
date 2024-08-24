'use client';

import { useEffect } from "react";
import { ButtonSecondary } from "@/components/buttons/ButtonSecondary";
import { CustomMap } from "@/components/custom-map";
import { OpeningHours } from "@/components/opening-hours";
import { Tag } from "@/components/tag";
import { Tickets } from "@/components/tickets";
import { ITouristAttraction } from "@/models/place";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

declare global {
    interface Window {
        VLibras: {
            Widget: new (url: string) => any;
        };
    }
}

export function TouristAttractionsViewContent({ result }: { result: ITouristAttraction }) {

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.address)}`;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        script.async = true;
        script.onload = () => {
            if (typeof window.VLibras !== 'undefined' && typeof window.VLibras.Widget === 'function') {
                new window.VLibras.Widget('https://vlibras.gov.br/app');
            } else {
                console.error('VLibras not loaded correctly.');
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="flex flex-col gap-6 py-6 max-lg:px-6 w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <Link href='/pontos-turisticos' className="font-span2 text-support-info">Pontos turísticos</Link>
                        <FiChevronRight />
                        <span className="font-span2 text-span">{result.name}</span>
                    </div>
                    <h1 className="font-heading1 text-title">{result.name}</h1>
                    <div className='rounded w-full h-[360px] relative overflow-hidden'>
                        <Image src={'http://caldasvisor-backend-production.up.railway.app/' + result.images[0]} alt="" fill sizes='100%' objectFit="cover" />
                    </div>
                    <Tag text={'Ponto turístico'} />
                    <p className='font-paragraph2 text-paragraph'>{result.description}</p>
                    <div className="flex flex-col gap-4">
                        <h3 className='font-heading3 text-title'>Endereço</h3>
                        <div className='flex flex-wrap items-center gap-6 bg-shapes-background-aux p-4 border border-grey1 rounded'>
                            <Image src={'/map.svg'} alt="" width={24} height={24} />
                            <p className='font-paragraph2 text-paragraph flex-1 min-w-[200px]'>{result.address}</p>
                            <ButtonSecondary label="Acessar pelo maps" onClick={() => { window.open(mapsUrl, '_blank') }} />
                        </div>
                    </div>
                    {result.tickets && result.tickets.length > 0 && (
                        <Tickets tickets={result.tickets} />
                    )}
                    <OpeningHours openingHours={result.openingHours} />
                </div>
                <div className="hidden lg:flex max-h-[781px] rounded overflow-hidden">
                    <CustomMap place={result} />
                </div>
            </div>
            <script>
                new window.VLibras.Widget('https://vlibras.gov.br/app');
            </script>
        </div>
    );
}
