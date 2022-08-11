import {useEffect, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
import {City, Hotel} from '../../types/hotel.type';
import {useMap} from '../../hooks/useMap';
import {MAP_ICON} from '../../constants';
import 'leaflet/dist/leaflet.css';

type Props = {
  className: string;
  city: City;
  places: Hotel[];
  activeHotelId: number | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: MAP_ICON.DEFAULT,
  iconSize: [MAP_ICON.WIDTH, MAP_ICON.HEIGHT],
  iconAnchor: [MAP_ICON.ANCHOR, MAP_ICON.HEIGHT],
});

const activeCustomIcon = new Icon({
  iconUrl: MAP_ICON.ACTIVE,
  iconSize: [MAP_ICON.WIDTH, MAP_ICON.HEIGHT],
  iconAnchor: [MAP_ICON.ANCHOR, MAP_ICON.HEIGHT],
});

export function Map({className, city, places, activeHotelId}: Props): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      places.forEach((hotel) => {
        const marker = new Marker({
          lat: hotel.location.latitude,
          lng: hotel.location.longitude
        });

        marker
          .setIcon(
            activeHotelId !== undefined && hotel.id === activeHotelId
              ? activeCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, places, activeHotelId]);

  useEffect(() => {
    if (map) {
      map.flyTo(
        [city.location.latitude, city.location.longitude],
        10,
        {
          duration: 2
        }
      );
    }
  }, [city, map]);

  return (
    <section
      className={`${className}__map map`}
      style={{height: '1000px'}}
      ref={mapRef}
    />
  );
}
