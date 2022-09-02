import {app, AppState, setCity, setSortingType} from './app';
import {DEFAULT_CITY, SortingType} from '../../constants';
import {makeFakeCity} from '../../utils/mocks';

const mockFakeCity = makeFakeCity();

describe('Reducer: app', () => {
  let state: AppState;

  beforeEach(() => {
    state = {
      city: DEFAULT_CITY,
      activeSortingType: SortingType.Popular,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(app.reducer(undefined,{type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should change city', () => {
    expect(app.reducer(state, setCity(mockFakeCity)))
      .toEqual({
        city: mockFakeCity,
        activeSortingType: SortingType.Popular,
      });
  });

  it('should change sorting type to "TopRated"', () => {
    expect(app.reducer(state, setSortingType(SortingType.TopRated)))
      .toEqual({
        city: DEFAULT_CITY,
        activeSortingType: SortingType.TopRated,
      });
  });
});
