import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { useSelector } from 'react-redux'

import { State } from '../redux/index'
// import { ReduxState } from "../redux/store";
import CustomSwiper from '../screens/CustomSwiper'
// import Onboarding from '../screens/onboarding/Onboarding'
import OnboardingDeck from '../screens/onboarding/OnboardingDeck'

const AppStack = createStackNavigator()

export default function TheoryComponent({ helpData }) {
  const hasSeenIntro = false
  // const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro)
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!hasSeenIntro && (
          // <AppStack.Screen name="Onboarding" component={Onboarding} />
          <AppStack.Screen name="OnboardingDeck" component={OnboardingDeck} />
        )}
        <AppStack.Screen
          name="CustomSwiper"
          component={CustomSwiper}
          initialParams={{ helpData: { helpData } }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
