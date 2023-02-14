import {BottomSheetBackgroundProps} from '@gorhom/bottom-sheet';
import React, {useMemo, useContext, useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';

import ColourContext from '../state/ColourContext';

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  const {colourData, index} = useContext(ColourContext);

  useEffect(() => {}, []);

  //#region styles
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    // @ts-ignore
    //   color: interpolateColor(
    //     animatedIndex.value,
    //     [0, 1],
    //     ["#000000", dominantColour]
    //   ),
    // @ts-ignore
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      // ["#ffffff", "#a8b5eb"]
      // [lightVibrantColour, lightMutedColour]
      [colourData[index].lightVibrant, colourData[index].lightMuted],
    ),
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );
  //#endregion

  // render
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        style,
        {
          backgroundColor: 'white',
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        },
        containerAnimatedStyle,
      ]}
    />
  );
};

export default CustomBackground;
