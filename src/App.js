import React, {useEffect} from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';

import TheoryComponent from './components/TheoryComponent';
import {store, persistor} from './redux/store';
// import {StateProvider} from './state/StateContext';

export default function App() {
  // const [dominantColour, setDominantColour] = useState(
  //   colourData[index].dominant
  // );
  // const [lightMutedColour, setLightMutedColour] = useState(
  //   colourData[index].lightMuted
  // );
  // const [lightVibrantColour, setLightVibrantColour] = useState(
  //   colourData[index].lightVibrant
  // );
  // const [darkVibrant, setDarkVibrant] = useState(colourData[index].darkVibrant);
  Ionicons.loadFont();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        {/* <StateProvider> */}
        <TheoryComponent />
        {/* </StateProvider> */}
      </PersistGate>
    </Provider>
  );
}
