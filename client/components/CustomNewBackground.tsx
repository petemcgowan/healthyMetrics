import React, { useContext, useMemo } from 'react'
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated'
import ColourContext from '../state/ColourContext'

export const CustomNewBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  const { colourData, index } = useContext(ColourContext)

  const colourStart = colourData[index].lightVibrant
  const colourEnd = colourData[index].lightMuted

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      [colourStart, colourEnd]
    ),
  }))

  const newStyle = {
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  }
  Object.assign(newStyle, style)

  return (
    <Animated.View
      pointerEvents="none"
      style={[containerAnimatedStyle, newStyle]}
    />
  )
}
