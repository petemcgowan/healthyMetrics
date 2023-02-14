import {NavigationContainer} from '@react-navigation/native';
// import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useSelector} from 'react-redux';

import {State} from '../redux/index';
// import { ReduxState } from "../redux/store";
import CustomSwiper from '../screens/CustomSwiper';
import Onboarding from '../screens/onboarding/Onboarding';

const AppStack = createStackNavigator();

export default function TheoryComponent() {
  // const hasSeenIntro = useSelector<ReduxState, boolean>(
  //   (state) => state.hasSeenIntro
  // );
  const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro);

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!hasSeenIntro && (
          <AppStack.Screen name="Onboarding" component={Onboarding} />
        )}
        <AppStack.Screen name="CustomSwiper" component={CustomSwiper} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
