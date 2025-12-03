import React from 'react'
import {Dimensions, StyleSheet, Text, View} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'

import {useSelector, useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'

import GenderPicker from '../components/pickers/GenderPicker'
import {actionCreators, State} from '../redux/index'

const {width, height} = Dimensions.get('window')

interface GenderSlideProps {
  errorText: string
}

const GenderSlide = ({errorText}: GenderSlideProps) => {
  const gender = useSelector((state: State) => state.gender)
  const dispatch = useDispatch()
  const {setGender} = bindActionCreators(actionCreators, dispatch)

  // const hasErrors = () => {
  //   return errorText !== ''
  // }

  const dynamicStyles = StyleSheet.create({
    textAbove: {
      marginTop: height * 0.12,
      alignSelf: 'center',
      textAlign: 'center',
      width: width,
      color: '#84c4ec',
      fontWeight: '500',
      fontSize: RFPercentage(11),
    },
    textBelow: {
      alignSelf: 'center',
      textAlign: 'center',
      width: width,
      color: '#84c4ec',
      fontWeight: '500',
      fontSize: RFPercentage(12),
      marginBottom: height * 0.02,
    },
    errorText: {
      fontSize: RFPercentage(4.5),
      color: '#5b4028',
    },
  })

  return (
    <View>
      <Text style={dynamicStyles.textAbove}>Select</Text>
      <Text style={dynamicStyles.textBelow}>Gender</Text>
      <GenderPicker gender={gender} setGender={setGender} />
      <View style={styles.textContainer}>
        {errorText ? (
          <Text style={dynamicStyles.errorText}>{errorText}</Text>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    alignSelf: 'center',
    minWidth: 150,
    height: RFPercentage(7.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default GenderSlide
