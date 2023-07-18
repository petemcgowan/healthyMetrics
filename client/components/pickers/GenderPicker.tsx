import React from 'react';
import {View} from 'react-native';
import {FadeIn} from 'react-native-reanimated';

import GenAnimatedRadioGroup from '../radio-groups/GenAnimatedRadioGroup';

interface GenderPickerProps {
  gender: string;
  setGender: any;
}

const GenderPicker = ({gender, setGender}: GenderPickerProps) => {
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
