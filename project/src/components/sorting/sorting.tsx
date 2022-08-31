import {useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {SortingType} from '../../constants';
import {City} from '../../types/hotel.type';
import {setSortingType} from '../../store/app/app';

type Props = {
  activeSortingType: string,
  city: City,
};

export function Sorting({activeSortingType, city}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSortingOpen, toggleSorting] = useState<boolean>(false);

  const handleSortingTypeChange = (sortingType: SortingType) => {
    toggleSorting(!isSortingOpen);
    dispatch(setSortingType(sortingType));
  };

  return (
    <form className="places__sorting" action="src/pages/main/main#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => toggleSorting(!isSortingOpen)}
      >
        {activeSortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortingOpen && 'places__options--opened'}`}>
        {
          Object.values(SortingType).map((sortingType) => (
            <li
              key={sortingType}
              className={`places__option ${sortingType === activeSortingType && 'places__option--active'}`}
              tabIndex={0}
              onClick={() => handleSortingTypeChange(sortingType)}
            >
              {sortingType}
            </li>
          ))
        }
      </ul>
    </form>
  );
}
