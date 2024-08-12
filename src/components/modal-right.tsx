import Image from 'next/image';
import { FiChevronLeft } from 'react-icons/fi';
import { Tag } from './tag';
import { ButtonPrimary } from './buttons/ButtonPrimary';
import { useEffect, useRef, useState } from 'react';
import { IEvent, ITouristAttraction } from '@/models/place';
import { useRouter } from 'next/navigation';
import { OpeningHours } from './opening-hours';

export function ModalRight({ place, close }: { place: IEvent | ITouristAttraction, close: () => void }) {
    const router = useRouter();
    const ref = useRef(null);

    const handleOutsideClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            handleClose();
        }
    };

    const handleClose = () => {
        close()
        setTimeout(() => {
            close()
        }, 300);
    }

    return (
        <div ref={ref} className={`p-6 bg-white shadow-side-bar h-aside-mobile lg:h-aside fixed z-50 top-0 lg:top-24 left-0 overflow-auto w-aside-mobile lg:w-aside max-w-full flex flex-col gap-6 ${event ? 'animate-aside-show' : 'animate-aside-hidden'}`}>
            <div className='flex flex-col gap-6'>
                <button onClick={handleClose}>
                    <FiChevronLeft size={24} />
                </button>
                <div className='rounded w-full h-[271px] relative overflow-hidden'>
                    <Image src={'http://caldasvisor-backend-production.up.railway.app/' + place.images[0]} alt="" fill sizes='100%' className="object-cover" />
                </div>
                <Tag text={place.type == 'event' ? 'Evento': 'Ponto turístico'} />
                <h4 className='font-heading2 text-title'>{place.name}</h4>
                <p className='font-paragraph2 text-paragraph'>{place.description}</p>
                <OpeningHours openingHours={place.openingHours} />
                <ButtonPrimary label='Ver mais' onClick={() => place.type == 'event' ? router.push(`eventos/${place.id}`) : router.push(`pontos-turisticos/${place.id}`)} large={true} full={true} />
            </div>
        </div>
    )
}