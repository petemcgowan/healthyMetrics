import React from 'react';
import {View} from 'react-native';
import {FadeIn} from 'react-native-reanimated';

import GenAnimatedRadioGroup from '../radio-groups/GenAnimatedRadioGroup';

const GenderPicker = ({gender, setGender}) => {
  /*  Could have array of "others" that you turn off, in this case if Name is Male, the other array would be female.     */

  return (
    <View>
      <GenAnimatedRadioGroup
        animatedStyle={{entering: FadeIn}}
        gender={gender}
        setGender={setGender}
      />
    </View>
  );
};

export default GenderPicker;
