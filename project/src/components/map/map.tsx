import {useEffect, useRef} from 'react';
import {Icon, Marker} from 'leaflet';
import {City, Hotel} from '../../types/hotel.type';
import {useMap} from '../../hooks/useMap';
import {MAP_ICON} from '../../constants';
import 'leaflet/dist/leaflet.css';


type Props = {
  className: string;
  city: City;
  hotels: Hotel[];
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

export function Map({className, city, hotels, activeHotelId}: Props): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      hotels.forEach((hotel) => {
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
  }, [map, hotels, activeHotelId]);

  return (
    <section
      className={`${className}__map map`}
      style={{height: '1000px'}}
      ref={mapRef}
    />
  );
}
