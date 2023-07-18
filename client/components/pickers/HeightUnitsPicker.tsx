import React from 'react';
import {View} from 'react-native';
import {FadeIn} from 'react-native-reanimated';

import HeightUnitsRadioGroup from '../radio-groups/HeightUnitsRadioGroup';

const HeightUnitsPicker = () => {
  /*  Could have array of "others" that you turn off, in this case if Name is Male, the other array would be female.     */

  return (
    <View>
      <HeightUnitsRadioGroup animatedStyle={{entering: FadeIn}} />
    </View>
  );
};

export default HeightUnitsPicker;
