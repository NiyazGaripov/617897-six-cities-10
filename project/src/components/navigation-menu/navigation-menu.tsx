import {NavLink} from 'react-router-dom';

type Props = {
  cities: string[]
};

export function NavigationMenu({cities}: Props): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) =>
              (
                <li className="locations__item" key={city}>
                  <NavLink to={`/${city.toLowerCase()}`} className={({ isActive }) => (isActive ? 'locations__item-link tabs__item--active' : 'locations__item-link tabs__item')}>
                    <span>{city}</span>
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
