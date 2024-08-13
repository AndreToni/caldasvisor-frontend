import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const containerStyle = {
    width: '100%',
    height: '100%',
};

export function CustomMap({ location, items }) {
    const { lat, lng } = location;
    const center = { lat, lng };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD3uua5UjFuo8kjaalxT8WwJoUPnnK3rGw"
    })

    const [map, setMap] = useState(null);
    const [event, setEvent] = useState(null);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    if (!isLoaded) {
        return null;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                streetViewControl: false,
                mapTypeControl: false
            }}
        >
            {items.map(item => (
                <MarkerF
                    key={item.id}
                    position={{ lat: +item.lat, lng: +item.lng }}
                    onClick={() => {
                        setEvent(item);
                    }}
                    icon={{ url: '/pointer.png' }}
                />
            ))}
        </GoogleMap>
    )
}