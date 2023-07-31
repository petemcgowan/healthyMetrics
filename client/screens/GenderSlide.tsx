import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { HelperText } from 'react-native-paper'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import GenderPicker from '../components/pickers/GenderPicker'
import { actionCreators, State } from '../redux/index'

const { width } = Dimensions.get('window')

interface GenderSlideProps {
  errorText: string
}

const GenderSlide = ({ errorText }: GenderSlideProps) => {
  const gender = useSelector((state: State) => state.gender)
  const dispatch = useDispatch()
  const { setGender } = bindActionCreators(actionCreators, dispatch)

  const hasErrors = () => {
    return errorText !== ''
  }

  const dynamicStyles = StyleSheet.create({
    textAbove: {
      alignSelf: 'center',
      textAlign: 'center',
      width: width,
      color: '#84c4ec',
      fontWeight: '500',
      fontSize: RFPercentage(12),
    },
    textBelow: {
      alignSelf: 'center',
      textAlign: 'center',
      width: width,
      color: '#84c4ec',
      fontWeight: '500',
      fontSize: RFPercentage(13),
    },
  })

  return (
    <View>
      <Text style={dynamicStyles.textAbove}>Select</Text>
      <Text style={dynamicStyles.textBelow}>Gender</Text>
      <GenderPicker gender={gender} setGender={setGender} />
      <View style={styles.textContainer}>
        <HelperText
          style={{ fontSize: RFPercentage(6.5), color: '#5b4028' }}
          type="error"
          visible={hasErrors()}
        >
          {errorText}
        </HelperText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    alignSelf: 'center',
    minWidth: 150,
    height: 55,
  },
})

export default GenderSlide
