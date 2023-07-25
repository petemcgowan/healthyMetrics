import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { actionCreators, State } from '../../redux/index'

const { width, height } = Dimensions.get('window')
const threeQuarterWidth = width * 0.8

interface HeightUnitsBlockProps {
  animatedStyle: Record<string, any>
}

const HeightUnitsRadioGroup = ({ animatedStyle }: HeightUnitsBlockProps) => {
  const heightUnits = useSelector((state: State) => state.heightUnits)
  const dispatch = useDispatch()
  const { setHeightUnits } = bindActionCreators(actionCreators, dispatch)

  return (
    <View style={styles.animatedBox}>
      {heightUnits === 'Feet/Inches' ? (
        <TouchableWithoutFeedback //Feet/Inches  ON
          onPress={() => {
            setHeightUnits('cm')
          }}
        >
          <Animated.View style={styles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Feet/Inches</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Feet/Inches  OFF
          entering={'entering' in animatedStyle ? undefined : FadeIn.delay(350)}
        >
          <TouchableOpacity
            style={styles.animatedBlockPlaceholder}
            onPress={() => {
              setHeightUnits('Feet/Inches')
            }}
          >
            <Text style={styles.animatedTextPlaceholder}>Feet/Inches</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {heightUnits === 'cm' ? (
        <TouchableWithoutFeedback //cm  ON
          onPress={() => {
            setHeightUnits('Feet/Inches')
          }}
        >
          <Animated.View style={styles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>cm</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //cm  OFF
          entering={'entering' in animatedStyle ? undefined : FadeIn.delay(350)}
        >
          <TouchableOpacity
            style={styles.animatedBlockPlaceholder}
            onPress={() => {
              setHeightUnits('cm')
            }}
          >
            <Text style={styles.animatedTextPlaceholder}>cm</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  )
}

export default HeightUnitsRadioGroup

const styles = StyleSheet.create({
  animatedBox: {
    padding: 5,
    alignItems: 'center',
  },
  animatedText: {
    color: '#ffffff',
    fontSize: RFPercentage(4.8),
  },
  animatedBlock: {
    height: height * 0.07,
    width: threeQuarterWidth,
    borderWidth: 3,
    borderColor: '#84c4ec',
    backgroundColor: '#84c4ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedBlockPlaceholder: {
    height: height * 0.07,
    width: threeQuarterWidth,
    borderWidth: 3,
    borderColor: '#84c4ec',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  animatedTextPlaceholder: {
    color: 'white',
    fontSize: RFPercentage(5.5),
  },
})
