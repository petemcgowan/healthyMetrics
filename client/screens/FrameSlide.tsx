import React from 'react'
import {StyleSheet, Text, View, Dimensions} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {useSelector, useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'

import FramePicker from '../components/pickers/FramePicker'
import {actionCreators, State} from '../redux/index'

const {width, height} = Dimensions.get('window')

const FrameSlide = () => {
  const frame = useSelector((state: State) => state.frame)
  const dispatch = useDispatch()
  const {setFrame} = bindActionCreators(actionCreators, dispatch)

  return (
    <View>
      <Text style={styles.textAbove}>Select</Text>
      <Text style={styles.textBelow}>Frame</Text>
      <FramePicker frame={frame} setFrame={setFrame} />
    </View>
  )
}

export default FrameSlide

const styles = StyleSheet.create({
  textAbove: {
    marginTop: height * 0.11,
    alignSelf: 'center',
    width: 'auto',
    textAlign: 'center',
    minWidth: 100,
    fontWeight: '500',
    color: '#7de6fb',
    fontSize: RFPercentage(10),
  },
  textBelow: {
    alignSelf: 'center',
    width: 'auto',
    textAlign: 'center',
    fontWeight: '500',
    minWidth: 100,
    color: '#7de6fb',
    fontSize: RFPercentage(14),
    marginBottom: 10,
  },
})
