import React from 'react';
import {View} from 'react-native';

import AgeSlide from './AgeSlide';
import FrameSlide from './FrameSlide';
import GenderSlide from './GenderSlide';
import HeightSlide from './HeightSlide';
import ResultSlide from './ResultSlide';
import UnitsSlide from './UnitsSlide';
import WeightSlide from './WeightSlide';
// import IntroSlide from './onboarding/IntroSlide';

const ListSlide = ({
  errorText,
  helpSlideValues,
  index,
  handleCalculate,
  idealWeight,
  item,
}) => {
  return {
    // intro: (
    //   <View>
    //     <IntroSlide />
    //   </View>
    // ),
    units: (
      <View>
        <UnitsSlide errorText={errorText} />
      </View>
    ),
    gender: (
      <View>
        <GenderSlide errorText={errorText} />
      </View>
    ),
    age: (
      <View>
        <AgeSlide errorText={errorText} />
      </View>
    ),
    height: (
      <View>
        <HeightSlide errorText={errorText} />
      </View>
    ),
    frame: (
      <View>
        <FrameSlide errorText={errorText} />
      </View>
    ),
    weight: (
      <View>
        <WeightSlide handleCalculate={handleCalculate} errorText={errorText} />
      </View>
    ),
    result: (
      <View>
        <ResultSlide idealWeight={idealWeight} />
      </View>
    ),
  }[item.title];
};

export default ListSlide;
