import React from 'react';
import {View} from 'react-native';
import {FadeIn} from 'react-native-reanimated';

import WeightUnitsRadioGroup from '../radio-groups/WeightUnitsRadioGroup';

const WeightUnitsPicker = () => {
  return (
    <View>
      <WeightUnitsRadioGroup animatedStyle={{entering: FadeIn}} />
    </View>
  );
};

export default WeightUnitsPicker;
