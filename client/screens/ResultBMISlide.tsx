import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Linking,
  Animated,
} from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

interface ResultBMISlideProps {
  bmiCalcResult: number
}

const ResultBMISlide = ({ bmiCalcResult }: ResultBMISlideProps) => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle)
  const circleRef = React.useRef()
  const inputRef = React.useRef()

  const radius = height < 800 ? 78 : 95
  const strokeWidth = 10
  const color = 'aqua'
  const textColor = 'aqua'
  const circumference = 2 * Math.PI * radius
  const halfCircle = radius + strokeWidth

  console.log('bmiCalcResult:' + bmiCalcResult)

  return (
    <SafeAreaView style={styles.vwResultBMISlide}>
      <View style={styles.vwTop}>
        <View style={styles.vwBmiCalcResult}>
          <Text style={styles.bmiCalcResult}>Your Body Mass Index</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: radius * 2, height: radius * 2 }}>
            <Svg
              height={radius * 2}
              width={radius * 2}
              viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
              <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                <AnimatedCircle
                  ref={circleRef}
                  cx="50%"
                  cy="50%"
                  r={radius}
                  fill="transparent"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDashoffset={circumference}
                  strokeDasharray={circumference}
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  fill="transparent"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                />
              </G>
            </Svg>
            <TextInput
              ref={inputRef}
              underlineColorAndroid="transparent"
              editable={false}
              style={[
                StyleSheet.absoluteFillObject,
                { fontSize: radius / 1.6, color: textColor ?? color },
                styles.text,
              ]}
            >
              {Math.round(bmiCalcResult)}
            </TextInput>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 35,
          }}
        ></View>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.5,
            }}
          >
            <View>
              <Text
                style={[
                  styles.bmiTableHeaderText,
                  { backgroundColor: 'transparent' },
                ]}
              >
                Category:
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableHeaderText,
                  { color: bmiCalcResult < 16 ? 'aqua' : 'white' },
                ]}
              >
                Severe Thinness:
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableHeaderText,
                  {
                    color:
                      bmiCalcResult > 16 && bmiCalcResult < 17
                        ? 'aqua'
                        : 'white',
                  },
                ]}
              >
                Moderate Thinness:
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableHeaderText,
                  {
                    color:
                      bmiCalcResult > 17 && bmiCalcResult < 18.5
                        ? 'aqua'
                        : 'white',
                  },
                ]}
              >
                Mild Thinness:
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableHeaderText,
                  {
                    color:
                      bmiCalcResult > 18.5 && bmiCalcResult < 25
                        ? 'aqua'
                        : 'white',
                  },
                ]}
              >
                Normal:
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableHeaderText,
                  {
                    color:
                      bmiCalcResult > 25 && bmiCalcResult < 30
                        ? 'aqua'
                        : 'white',
                  },
                ]}
              >
                Overweight:
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableHeaderText,
                  {
                    color:
                      bmiCalcResult > 30 && bmiCalcResult < 35
                        ? 'aqua'
                        : 'white',
                  },
                ]}
              >
                Obese Class I:
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableHeaderText,
                  {
                    color:
                      bmiCalcResult > 35 && bmiCalcResult < 40
                        ? 'aqua'
                        : 'white',
                  },
                ]}
              >
                Obese Class II:
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableHeaderText,
                  { color: bmiCalcResult > 40 ? 'aqua' : 'white' },
                ]}
              >
                Obese Class III:
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              flex: 0.5,
            }}
          >
            <View>
              <Text
                style={[
                  styles.bmiTableText,
                  {
                    fontWeight: '600',
                    backgroundColor: 'transparent',
                  },
                ]}
              >
                BMI range - kg/m2:
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableText,
                  {
                    color: bmiCalcResult < 16 ? 'aqua' : 'white',
                    fontWeight: '600',
                  },
                ]}
              >
                less than 16
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableText,
                  {
                    color:
                      bmiCalcResult > 16 && bmiCalcResult < 17
                        ? 'aqua'
                        : 'white',
                  },
                ]}
              >
                16 - 17
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableText,
                  {
                    color:
                      bmiCalcResult > 17 && bmiCalcResult < 18.5
                        ? 'aqua'
                        : 'white',
                  },
                ]}
              >
                17 - 18.5
              </Text>
            </View>
            <Text
              style={[
                styles.bmiTableText,
                {
                  color:
                    bmiCalcResult > 18.5 && bmiCalcResult < 25
                      ? 'aqua'
                      : 'white',
                },
              ]}
            >
              18.5 - 25
            </Text>
            <View>
              <Text
                style={[
                  styles.bmiTableText,
                  {
                    color:
                      bmiCalcResult > 25 && bmiCalcResult < 30
                        ? 'aqua'
                        : 'white',
                  },
                ]}
              >
                25 - 30
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableText,
                  {
                    color:
                      bmiCalcResult > 30 && bmiCalcResult < 35
                        ? 'aqua'
                        : 'white',
                  },
                ]}
              >
                30 - 35
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.bmiTableText,
                  {
                    color:
                      bmiCalcResult > 35 && bmiCalcResult < 40
                        ? 'aqua'
                        : 'white',
                  },
                ]}
              >
                35 - 40
              </Text>
            </View>
            <Text
              style={[
                styles.bmiTableText,
                { color: bmiCalcResult > 40 ? 'aqua' : 'white' },
              ]}
            >
              greater than 40
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: '#056478',
            fontSize: RFPercentage(2.1),
            textAlign: 'center',
          }}
        >
          Ref: A healthy lifestyle - WHO recommendations
        </Text>
        <Text
          style={{ color: 'mediumblue', textAlign: 'center' }}
          onPress={() =>
            Linking.openURL(
              'https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations'
            )
          }
        >
          https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations
        </Text>
      </View>
      <View></View>
    </SafeAreaView>
  )
}

export default ResultBMISlide

const styles = StyleSheet.create({
  vwResultBMISlide: {
    flexDirection: 'column',
    flex: 1,
    width: width,
  },
  vwTop: {
    alignItems: 'center',
  },
  vwBmiCalcResult: {
    alignItems: 'center',
  },
  bmiCalcResult: {
    color: '#694a2f',
    fontSize: RFPercentage(7.6),
    fontWeight: '500',
  },
  bmiTableHeaderText: {
    color: '#056478',
    padding: 1,
    backgroundColor: '#d4beaf',
    textAlign: 'right',
    height: 30,
    fontSize: RFPercentage(2.6),
  },
  bmiTableText: {
    color: '#056478',
    backgroundColor: '#e4bc94',
    height: 30,
    padding: 1,
    fontSize: RFPercentage(2.6),
  },
  text: {
    fontWeight: '900',
    textAlign: 'center',
  },
})
