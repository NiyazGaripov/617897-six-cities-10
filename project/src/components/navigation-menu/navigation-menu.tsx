import {NavLink} from 'react-router-dom';
import NavigationMenuProps from './navigation-menu.type';

function NavigationMenu({cities}: NavigationMenuProps): JSX.Element {
  const locations = cities.map((city: string): JSX.Element =>
    (
      <li className="locations__item" key={city}>
        <NavLink to={`/${city}`} className={({ isActive }) => (isActive ? 'locations__item-link tabs__item--active' : 'locations__item-link tabs__item')}>
          <span>{city}</span>
        </NavLink>
      </li>
    )
  );

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations}
        </ul>
      </section>
    </div>
  );
}

export default NavigationMenu;
