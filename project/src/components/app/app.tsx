import AppProps from './app.type';
import Main from '../../pages/main/main';

function App(props: AppProps): JSX.Element {
  return (
    <Main
      hotels={props.hotels}
      cities={props.cities}
      placesCount={props.placesCount}
      user={props.user}
    />
  );
}

export default App;
