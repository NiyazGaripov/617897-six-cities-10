import {NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {setCity} from '../../store/action';
import {CITIES} from '../../mocks/cities.const';
import {City} from '../../types/hotel.type';

type Props = {
  activeCity: City;
};

export function NavigationMenu({activeCity}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            CITIES.map((city) =>
              (
                <li className="locations__item" key={city.name}>
                  <NavLink
                    to={`/${city.name.toLowerCase()}`}
                    className={`locations__item-link tabs__item ${city.name === activeCity.name && 'tabs__item--active'}`}
                    onClick={() => dispatch(setCity(city))}
                  >
                    <span>{city.name}</span>
                  </NavLink>
                </li>
              )
            )
          }
        </ul>
      </section>
    </div>
  );
}
