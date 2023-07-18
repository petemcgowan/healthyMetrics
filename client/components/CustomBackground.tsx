import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet'
import React, { useContext, useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated'

import ColourContext from '../state/ColourContext'

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  const { colourData, index } = useContext(ColourContext)

  useEffect(() => {}, [])

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      [colourData[index].lightVibrant, colourData[index].lightMuted]
    ),
  }))

  const newStyle = {
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  }
  Object.assign(newStyle, style)

  // render
  return (
    <Animated.View
      pointerEvents="none"
      style={[newStyle, containerAnimatedStyle]}
    />
  )
}

export default CustomBackground
