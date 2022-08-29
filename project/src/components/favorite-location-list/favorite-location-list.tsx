import {FavoriteLocation} from '../favorite-location/favorite-location';

export function FavoriteLocationList(): JSX.Element {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <FavoriteLocation />
    </section>
  );
}
