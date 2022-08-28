import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {useAppDispatch} from '../../hooks';
import {getRandomCity} from '../../utils/common';
import {setCity} from '../../store/app/app';

export function RandomLocation(): JSX.Element {
  const dispatch = useAppDispatch();
  const randomCity = getRandomCity();

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          to={AppRoute.Main}
          className="locations__item-link"
          onClick={() => dispatch(setCity(randomCity))}
        >
          <span>{randomCity.name}</span>
        </Link>
      </div>
    </section>
  );
}
