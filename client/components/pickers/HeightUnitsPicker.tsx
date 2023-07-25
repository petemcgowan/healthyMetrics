import React from 'react'
import { View } from 'react-native'
import { FadeIn } from 'react-native-reanimated'

import HeightUnitsRadioGroup from '../radio-groups/HeightUnitsRadioGroup'

const HeightUnitsPicker = () => {
  return (
    <View>
      <HeightUnitsRadioGroup animatedStyle={{ entering: FadeIn }} />
    </View>
  )
}

export default HeightUnitsPicker
