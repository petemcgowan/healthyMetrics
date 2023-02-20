import React, {useEffect} from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';

import TheoryComponent from './components/TheoryComponent';
import {store, persistor} from './redux/store';

export default function App() {
  Ionicons.loadFont();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <TheoryComponent />
      </PersistGate>
    </Provider>
  );
}
