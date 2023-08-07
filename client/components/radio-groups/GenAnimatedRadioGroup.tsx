import React from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width } = Dimensions.get('window')
const threeQuarterWidth = width * 0.8

interface AnimatedBlockProps {
  animatedStyle: Record<string, any>
  gender: string
  setGender: any
}

const GenAnimatedRadioGroup = ({
  animatedStyle,
  gender,
  setGender,
}: AnimatedBlockProps) => {
  return (
    <View style={styles.animatedBox}>
      {gender === 'Female' ? (
        <TouchableWithoutFeedback //Female  ON
          onPress={() => {
            setGender('Male')
          }}
        >
          <Animated.View style={styles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Female</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Female  OFF
          entering={'entering' in animatedStyle ? undefined : FadeIn.delay(350)}
        >
          <TouchableOpacity
            style={styles.animatedBlockPlaceholder}
            onPress={() => {
              setGender('Female')
            }}
          >
            <Text style={styles.animatedTextPlaceholder}>Female</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <View style={{ height: 5 }}></View>
      {gender === 'Male' ? (
        <TouchableWithoutFeedback //Male  ON
          onPress={() => {
            setGender('Female')
          }}
        >
          <Animated.View style={styles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Male</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Male  OFF
          entering={'entering' in animatedStyle ? undefined : FadeIn.delay(350)}
        >
          <TouchableOpacity
            style={styles.animatedBlockPlaceholder}
            onPress={() => {
              setGender('Male')
            }}
          >
            <Text style={styles.animatedTextPlaceholder}>Male</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  animatedBlock: {
    height: RFPercentage(9.0),
    width: threeQuarterWidth,
    borderWidth: 3,
    borderColor: '#84c4ec',
    backgroundColor: '#84c4ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedTextPlaceholder: {
    color: 'white',
    fontSize: RFPercentage(5.5),
  },
  animatedBlockPlaceholder: {
    height: RFPercentage(9.0),
    width: threeQuarterWidth,
    borderWidth: 4,
    borderColor: '#84c4ec',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  animatedBox: {
    alignItems: 'center',
  },
  animatedText: {
    color: '#ffffff',
    fontSize: RFPercentage(5.5),
  },
})

export default GenAnimatedRadioGroup
