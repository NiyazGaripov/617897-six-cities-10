import {useState} from 'react';
import {Places} from '../places/places';
import {Sorting} from '../sorting/sorting';
import {Map} from '../map/map';
import {useAppSelector} from '../../hooks';
import {getActiveSortingType, getSelectCity} from '../../store/app/selectors';
import {getSortedPlaces} from '../../store/places/selectors';

export function PlacesWithMap(): JSX.Element {
  const city = useAppSelector(getSelectCity);
  const activeSortingType = useAppSelector(getActiveSortingType);
  const sortedPlaces = useAppSelector(getSortedPlaces);
  const [activeHotelId, setActiveHotelId] = useState<number | null>(null);

  return (
    <div className="cities__places-container container">
      <Places
        places={sortedPlaces}
        onPlaceCardEnter={(id: number) => setActiveHotelId(id)}
        onPlaceCardLeave={() => setActiveHotelId(null)}
      >
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortedPlaces.length} places to stay in {city.name}</b>
        <Sorting
          activeSortingType={activeSortingType}
          city={city}
        />
      </Places>

      <div className="cities__right-section">
        <Map
          className='cities'
          city={city}
          places={sortedPlaces}
          activeHotelId={activeHotelId}
        />
      </div>
    </div>
  );
}
