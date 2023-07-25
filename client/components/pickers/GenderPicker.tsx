import React from 'react'
import { View } from 'react-native'
import { FadeIn } from 'react-native-reanimated'

import GenAnimatedRadioGroup from '../radio-groups/GenAnimatedRadioGroup'

interface GenderPickerProps {
  gender: string
  setGender: any
}

const GenderPicker = ({ gender, setGender }: GenderPickerProps) => {
  return (
    <View>
      <GenAnimatedRadioGroup
        animatedStyle={{ entering: FadeIn }}
        gender={gender}
        setGender={setGender}
      />
    </View>
  )
}

export default GenderPicker
