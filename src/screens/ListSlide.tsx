import React from 'react';
import {View} from 'react-native';

import AgeSlide from './AgeSlide';
import FrameSlide from './FrameSlide';
import GenderSlide from './GenderSlide';
import HeightSlide from './HeightSlide';
import ResultSlide from './ResultSlide';
import UnitsSlide from './UnitsSlide';
import WeightSlide from './WeightSlide';

interface ListSlideProps {
  errorText: string;
  handleCalculate: any;
  idealWeightStones: number;
  idealWeightPounds: number;
  idealWeightKg: number;
  itemTitle: string;
}

const ListSlide = ({
  errorText,
  handleCalculate,
  idealWeightStones,
  idealWeightPounds,
  idealWeightKg,
  itemTitle,
}: ListSlideProps) => {
  return {
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
        <ResultSlide
          idealWeightStones={idealWeightStones}
          idealWeightPounds={idealWeightPounds}
          idealWeightKg={idealWeightKg}
        />
      </View>
    ),
  }[itemTitle];
};

export default ListSlide;
