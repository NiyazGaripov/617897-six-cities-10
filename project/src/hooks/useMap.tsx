import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Map, TileLayer} from 'leaflet';
import {City} from '../types/hotel.type';
import {LAYER_ATTRIBUTION, LAYER_URL_TEMPLATE} from '../constants';

export function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (mapRef.current !== null && !isRenderedRef.current) {
        const instance = new Map(mapRef.current, {
          center: {
            lat: city.location.latitude,
            lng: city.location.longitude,
          },
          zoom: city.location.zoom,
        });

        const layer = new TileLayer(
          LAYER_URL_TEMPLATE,
          {
            attribution: LAYER_ATTRIBUTION,
          }
        );

        instance.addLayer(layer);

        setMap(instance);
        isRenderedRef.current = true;
      }
    }

    return () => {
      isMounted = false;
    };
  }, [mapRef, map, city]);

  return map;
}
