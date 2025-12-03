import React from 'react'
import {View} from 'react-native'

import AgeSlide from './AgeSlide'
import FrameSlide from './FrameSlide'
import GenderSlide from './GenderSlide'
import HeightSlide from './HeightSlide'
import ResultSlide from './ResultSlide'
import ResultBMISlide from './ResultBMISlide'
import UnitsSlide from './UnitsSlide'
import WeightSlide from './WeightSlide'
import AIChatSlide from './AIChatSlide.tsx'

interface ListSlideProps {
  errorText: string
  handleCalculate: any
  idealWeightStones: number
  idealWeightPounds: number
  idealWeightKg: number
  itemTitle: string
  bmiCalcResult: number
  setIndex: any
  index: number
}

const ListSlide = ({
  errorText,
  handleCalculate,
  idealWeightStones,
  idealWeightPounds,
  idealWeightKg,
  bmiCalcResult,
  itemTitle,
  setIndex,
  index,
}: ListSlideProps) => {
  return {
    units: (
      <View>
        <UnitsSlide />
      </View>
    ),
    gender: (
      <View>
        <GenderSlide errorText={errorText} />
      </View>
    ),
    age: (
      <View>
        <AgeSlide />
      </View>
    ),
    height: (
      <View>
        <HeightSlide />
      </View>
    ),
    frame: (
      <View>
        <FrameSlide />
      </View>
    ),
    weight: (
      <View>
        <WeightSlide handleCalculate={handleCalculate} />
      </View>
    ),
    result: (
      <View>
        <ResultSlide
          idealWeightStones={idealWeightStones}
          idealWeightPounds={idealWeightPounds}
          idealWeightKg={idealWeightKg}
          setIndex={setIndex}
          index={index}
        />
      </View>
    ),
    resultBMI: (
      <View>
        <ResultBMISlide
          bmiCalcResult={bmiCalcResult}
          setIndex={setIndex}
          index={index}
        />
      </View>
    ),
    resultAI: (
      <View>
        <AIChatSlide />
      </View>
    ),
  }[itemTitle]
}

export default ListSlide
