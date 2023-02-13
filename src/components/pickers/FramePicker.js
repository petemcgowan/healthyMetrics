import React from 'react';
import {View} from 'react-native';
import {FadeIn} from 'react-native-reanimated';

import AnimatedRadioGroup from '../radio-groups/AnimatedRadioGroup';

const FramePicker = ({frame, setFrame}) => {
  return (
    <View>
      <AnimatedRadioGroup
        animatedStyle={{entering: FadeIn}}
        frame={frame}
        setFrame={setFrame}
      />
    </View>
  );
};

export default FramePicker;
