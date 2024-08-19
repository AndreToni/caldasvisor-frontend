'use client'

import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import { ButtonPrimary } from '@/components/buttons/ButtonPrimary';
import { ModalRight } from '@/components/modal-right';
import { useAuth } from '@/contexts/auth';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 96px)',
};

const center = {
  lat: -17.7237558,
  lng: -48.6254238
};

export default function HomeContent({ results }) {
  const { user } = useAuth();
  const router = useRouter();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD3uua5UjFuo8kjaalxT8WwJoUPnnK3rGw"
  })

  const [map, setMap] = useState(null)
  const [event, setEvent] = useState(null)

  const onLoad = useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div>
      {event && <ModalRight place={event} close={() => setEvent(null)} />}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false
        }}
      >
        {results.map(item => (
          <MarkerF
            key={item.id}
            position={{ lat: parseFloat(item.lat), lng: parseFloat(item.lng) }}
            onClick={() => setEvent(item)}
            icon={{ url: '/pointer.png' }}
          />
        ))}
      </GoogleMap>
      {user && user.type != 'customer' && user.active &&
        <div className='w-full max-w-7xl mx-auto max-lg:px-[25px]'>
          <div className='relative'>
            <div className='absolute -top-16 right-0'>
              <ButtonIcon large label='Criar evento ou ponto turístico' onClick={() => router.push('/create-place')} Icon={FiPlus} />
            </div>
          </div>
        </div>
      }
    </div>
  ) : <></>;
}
