'use client'

import Image from "next/image";
import Link from "next/link";
import { ButtonSecondary } from "../buttons/ButtonSecondary";
import { IEvent, ITouristAttraction } from "@/models/place";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

export function CardDefault({ place, myPlace }: { place: IEvent | ITouristAttraction, myPlace?: boolean }) {
    const router = useRouter();

    const handleRemovePlace = async () => {
        try {
            const res = await api.delete(place.type == `event` ? `/events/${place.id}` : `/tourist-attractions/${place.id}`).then(res => res.data);
            if (res.success) {
                router.refresh()
            }
        } catch (error) {

        } finally {

        }
    }

    if (myPlace) {
        return (
            <div className="flex flex-col gap-4 p-4 bg-shapes-background-aux rounded border border-grey1">
                <div className='rounded w-full h-[280px] relative overflow-hidden'>
                    {place.images && place.images[0] != null ? <Image src={'http://caldasvisor-backend-production.up.railway.app/' + place.images[0]} alt="" fill sizes='100%' className="object-cover" /> : null}
                </div>
                <h4 className="font-heading4 text-title">{place.name}</h4>
                <p className="font-paragraph2 text-paragraph">{place.address}</p>
                <p className="font-paragraph2 text-paragraph">Horário de funcionamento:  8h até 18h </p>
                <div className="flex flex-col gap-2">
                    <ButtonSecondary label='Editar' onClick={() => router.push(`/update-place/${place.id}`)} large={true} full={true} />
                    <div className="border-t"></div>
                    <ButtonSecondary label='Apagar' onClick={() => confirm('Deseja mesmo remover?') && handleRemovePlace()} large={true} full={true} />
                </div>
            </div>
        )
    } else return (
        <Link href={place.type == `event` ? `/eventos/${place.id}` : `/pontos-turisticos/${place.id}`} className="flex flex-col gap-4 p-4 bg-shapes-background-aux rounded border border-grey1">
            <div className='rounded w-full h-[280px] relative overflow-hidden'>
                <Image src={'http://caldasvisor-backend-production.up.railway.app/' + place.images[0]} alt="" fill sizes='100%' className="object-cover" />
            </div>
            <h4 className="font-heading4 text-title">{place.name}</h4>
            <p className="font-paragraph2 text-paragraph">{place.address}</p>
            <p className="font-paragraph2 text-paragraph">Horário de funcionamento:  8h até 18h </p>
            <ButtonSecondary label='Ver mais' onClick={() => place.type == 'event' ? router.push(`eventos/${place.id}`) : router.push(`pontos-turisticos/${place.id}`)} large={true} full={true} />
        </Link>
    )
}