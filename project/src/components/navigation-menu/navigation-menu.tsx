import {NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {changeCity} from '../../store/action';
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
                    className={() => city.name === activeCity.name ? 'locations__item-link tabs__item--active' : 'locations__item-link tabs__item'}
                    onClick={() => dispatch(changeCity(city))}
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
