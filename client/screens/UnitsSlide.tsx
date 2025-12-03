import React from 'react'
import {StyleSheet, Text, View, Dimensions} from 'react-native'

import HeightUnitsPicker from '../components/pickers/HeightUnitsPicker'
import WeightUnitsPicker from '../components/pickers/WeightUnitsPicker'
import {RFPercentage} from 'react-native-responsive-fontsize'

const {width, height} = Dimensions.get('window')

const UnitsSlide = () => {
  return (
    <View>
      <Text style={styles.textAbove}>Select</Text>
      <Text style={styles.textBelow}>Units</Text>
      <View style={styles.pickerBox}>
        <HeightUnitsPicker />
      </View>
      <View style={styles.pickerBox}>
        <WeightUnitsPicker />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textAbove: {
    marginTop: height * 0.11,
    alignSelf: 'center',
    width: width,
    textAlign: 'center',
    // minWidth: 100,
    color: '#e4bc94',
    fontSize: RFPercentage(10),
  },
  textBelow: {
    alignSelf: 'center',
    width: width,
    textAlign: 'center',
    // minWidth: 100,
    color: '#e4bc94',
    fontSize: RFPercentage(14),
  },
  pickerBox: {
    paddingVertical: 3,
  },
})

export default UnitsSlide
