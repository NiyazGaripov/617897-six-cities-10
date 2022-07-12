import NavigationMenuProps from './navigation-menu.type';

function NavigationMenu({cities}: NavigationMenuProps): JSX.Element {
  const locations = cities.map((city: string): JSX.Element =>
    (
      <li className="locations__item" key={city}>
        <a className="locations__item-link tabs__item" href="/project/src/pages">
          <span>{city}</span>
        </a>
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
