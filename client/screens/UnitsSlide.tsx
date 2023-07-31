import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

import HeightUnitsPicker from '../components/pickers/HeightUnitsPicker'
import WeightUnitsPicker from '../components/pickers/WeightUnitsPicker'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width } = Dimensions.get('window')

const UnitsSlide = () => {
  const dynamicStyles = StyleSheet.create({
    textAbove: {
      alignSelf: 'center',
      width: width,
      textAlign: 'center',
      minWidth: 100,
      color: '#e4bc94',
      fontSize: RFPercentage(12),
    },
    textBelow: {
      alignSelf: 'center',
      width: width,
      textAlign: 'center',
      minWidth: 100,
      color: '#e4bc94',
      fontSize: RFPercentage(17),
    },
  })

  return (
    <View>
      <Text style={dynamicStyles.textAbove}>Select</Text>
      <Text style={dynamicStyles.textBelow}>Units</Text>
      <HeightUnitsPicker />
      <WeightUnitsPicker />
    </View>
  )
}

export default UnitsSlide
