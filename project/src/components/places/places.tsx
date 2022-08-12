import {PropsWithChildren} from 'react';
import {PlaceCard} from '../place-card/place-card';
import {Hotel} from '../../types/hotel.type';

type Props = PropsWithChildren<{
  places: Hotel[];
  sectionClassName?: string;
  placesClassName?: string;
  onPlaceCardEnter?: (id: number) => void;
  onPlaceCardLeave?: () => void;
}>;

export function Places(
  {
    places,
    children,
    sectionClassName = 'cities__places',
    placesClassName = 'cities__places-list',
    onPlaceCardEnter,
    onPlaceCardLeave
  }: Props): JSX.Element {

  return (
    <section className={`${sectionClassName} places`}>
      {children}
      <div className={`${placesClassName} places__list`}>
        {
          places.map((place) =>
            (
              <PlaceCard
                key={place.id}
                hotel={place}
                className='cities'
                onPlaceCardEnter={onPlaceCardEnter}
                onPlaceCardLeave={onPlaceCardLeave}
              />
            )
          )
        }
      </div>
    </section>
  );
}
