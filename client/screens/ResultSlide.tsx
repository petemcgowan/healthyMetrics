import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Linking,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'
import { useSelector } from 'react-redux'
import { State } from '../redux/index'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

interface ResultSlideProps {
  idealWeightStones: number
  idealWeightPounds: number
  idealWeightKg: number
  setIndex: any
  index: number
}

const ResultSlide = ({
  idealWeightStones,
  idealWeightPounds,
  idealWeightKg,
  setIndex,
  index,
}: ResultSlideProps) => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle)
  const inputRef = React.useRef()
  const circleRef = React.useRef()
  const weightUnits = useSelector((state: State) => state.weightUnits)

  const heightCm = useSelector((state: State) => state.heightCm)
  const heightFt = useSelector((state: State) => state.heightFt)
  const heightInches = useSelector((state: State) => state.heightInches)
  const weightPounds = useSelector((state: State) => state.weightPounds)
  const weightPoundsOnly = useSelector((state: State) => state.weightPoundsOnly)
  const weightStones = useSelector((state: State) => state.weightStones)
  const weightKg = useSelector((state: State) => state.weightKg)
  const frame = useSelector((state: State) => state.frame)
  const age = useSelector((state: State) => state.age)
  const gender = useSelector((state: State) => state.gender)
  const heightUnits = useSelector((state: State) => state.heightUnits)

  const strokeWidth = 10
  const kgPoundsRadius = height < 800 ? 78 : 95
  const radius = height < 800 ? 65 : 80
  const kgCircumference = 2 * Math.PI * kgPoundsRadius
  const circumference = 2 * Math.PI * radius
  const kgHalfCircle = kgPoundsRadius + strokeWidth
  const halfCircle = radius + strokeWidth
  const color = 'aqua'
  const textColor = 'aqua'

  const moveToBMI = () => {
    setIndex(index + 1) // move to the BMI slide
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.vwResultSlide}>
        <View style={styles.vwTop}>
          <View style={styles.vwIdealWeight}>
            <Text style={styles.yourHealthyWeightText}>Your</Text>
            <Text style={styles.yourHealthyWeightText}>Healthy</Text>
            <Text style={styles.yourHealthyWeightText}>Weight</Text>

            {weightUnits === 'kg' && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: kgPoundsRadius * 2,
                    height: kgPoundsRadius * 2,
                  }}
                >
                  <Svg
                    height={kgPoundsRadius * 2}
                    width={kgPoundsRadius * 2}
                    viewBox={`0 0 ${kgHalfCircle * 2} ${kgHalfCircle * 2}`}
                  >
                    <G
                      rotation="-90"
                      origin={`${kgHalfCircle}, ${kgHalfCircle}`}
                    >
                      <AnimatedCircle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        r={kgPoundsRadius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDashoffset={kgCircumference}
                        strokeDasharray={kgCircumference}
                      />
                      <Circle
                        cx="50%"
                        cy="50%"
                        r={kgPoundsRadius}
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
                      {
                        fontSize: kgPoundsRadius / 1.6,
                        color: textColor ?? color,
                      },
                      styles.text,
                    ]}
                  >
                    {Math.round(idealWeightKg)}
                  </TextInput>
                </View>
                <Text style={[styles.weightUnits]}>kg</Text>
              </View>
            )}
            {weightUnits === 'Pounds' && (
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View
                  style={{
                    width: kgPoundsRadius * 2,
                    height: kgPoundsRadius * 2,
                  }}
                >
                  <Svg
                    height={kgPoundsRadius * 2}
                    width={kgPoundsRadius * 2}
                    viewBox={`0 0 ${kgHalfCircle * 2} ${kgHalfCircle * 2}`}
                  >
                    <G
                      rotation="-90"
                      origin={`${kgHalfCircle}, ${kgHalfCircle}`}
                    >
                      <AnimatedCircle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        r={kgPoundsRadius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDashoffset={kgCircumference}
                        strokeDasharray={kgCircumference}
                      />
                      <Circle
                        cx="50%"
                        cy="50%"
                        r={kgPoundsRadius}
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
                      {
                        fontSize: kgPoundsRadius / 1.6,
                        color: textColor ?? color,
                      },
                      styles.text,
                    ]}
                  >
                    {Math.round(idealWeightPounds)}
                  </TextInput>
                </View>
                <Text style={[styles.weightUnits]}>pounds</Text>
              </View>
            )}

            {weightUnits === 'Stones/Pounds' && (
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
                    {Math.round(idealWeightStones)}
                  </TextInput>
                  <Text style={[styles.weightUnits, { textAlign: 'center' }]}>
                    stones
                  </Text>
                </View>
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
                    {Math.round(idealWeightPounds)}
                  </TextInput>
                  <Text style={[styles.weightUnits, { textAlign: 'center' }]}>
                    pounds
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: idealWeightStones > 0 ? 45 : 10,
          }}
        >
          <Text
            style={{
              color: '#d0b99f',
              fontSize: RFPercentage(1.8),
              textAlign: 'center',
            }}
          >
            J. D. Robinson Formula: Determination of ideal body weight for drug
            dosage calculations. (Am J Hosp Parm 1983)
          </Text>
          <Text
            style={{
              color: 'mediumblue',
              textAlign: 'center',
              fontSize: RFPercentage(1.8),
            }}
            onPress={() =>
              Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/6869387/')
            }
          >
            https://pubmed.ncbi.nlm.nih.gov/6869387/
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={moveToBMI}>
          <Text style={styles.buttonText}>BMI &#10140; </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: '#b27f52',
              fontSize: RFPercentage(3),
              fontStyle: 'italic',
            }}
          >
            Entered Info:
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'column',
              flex: 0.5,
            }}
          >
            <View>
              <Text style={styles.detailsHeaderText}>Gender:</Text>
            </View>
            <View>
              <Text style={styles.detailsHeaderText}>Body Frame:</Text>
            </View>
            {heightUnits === 'cm' && (
              <View>
                <Text style={styles.detailsHeaderText}>Height(cm):</Text>
              </View>
            )}
            {heightUnits === 'Feet/Inches' && (
              <View>
                <Text style={styles.detailsHeaderText}>Height (ft/in):</Text>
              </View>
            )}
            <View>
              <Text style={styles.detailsHeaderText}>Age:</Text>
            </View>
            {weightUnits === 'kg' && (
              <View>
                <Text style={styles.detailsHeaderText}>Weight(kg):</Text>
              </View>
            )}
            {weightUnits === 'Pounds' && (
              <View>
                <Text style={styles.detailsHeaderText}>Weight (Pounds):</Text>
              </View>
            )}
            {weightUnits === 'Stones/Pounds' && (
              <View>
                <Text style={styles.detailsHeaderText}>Weight(St/Po):</Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'column',
              flex: 0.5,
            }}
          >
            <View>
              <Text style={styles.detailText}>{gender}</Text>
            </View>
            <View>
              <Text style={styles.detailText}>{frame}</Text>
            </View>
            {heightUnits === 'cm' && (
              <View>
                <Text style={styles.detailText}>{heightCm}</Text>
              </View>
            )}
            {heightUnits === 'Feet/Inches' && (
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.detailText}>{heightFt}</Text>
                <Text style={styles.detailText}>/</Text>
                <Text style={styles.detailText}>{heightInches}</Text>
              </View>
            )}
            <View>
              <Text style={styles.detailText}>{age}</Text>
            </View>
            {weightUnits === 'kg' && (
              <View>
                <Text style={styles.detailText}>{weightKg}</Text>
              </View>
            )}
            {weightUnits === 'Pounds' && (
              <View>
                <Text style={styles.detailText}>{weightPoundsOnly}</Text>
              </View>
            )}
            {weightUnits === 'Stones/Pounds' && (
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.detailText}>{weightStones}</Text>
                <Text style={styles.detailText}>/</Text>
                <Text style={styles.detailText}>{weightPounds}</Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  vwResultSlide: {
    flexDirection: 'column',
    flex: 1,
    width: width,
  },
  vwTop: {},
  vwBottom: {
    alignItems: 'center',
  },
  detailsHeaderText: {
    color: '#e4bc94',
    // padding: 1,
    textAlign: 'right',
    // height: 30,
    fontSize: RFPercentage(2.7),
  },
  detailText: {
    color: '#173f6a',
    // height: 30,
    // padding: 1,
    fontSize: RFPercentage(2.7),
  },
  buttonText: {
    alignSelf: 'center',
    padding: height < 800 ? 0 : 10,
    fontSize: RFPercentage(5.2),
    color: '#84c4ec',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    borderWidth: 0.5,
    marginRight: 40,
    marginLeft: 40,
    borderColor: '#84c4ec',
    backgroundColor: '#e4bc94',
    marginTop: 10,
  },
  idealWeightText: {
    fontSize: RFPercentage(13),
    color: 'white',
    fontWeight: '500',
  },
  idealWeightSPText: {
    fontSize: RFPercentage(13),
    color: 'white',
    fontWeight: '500',
  },
  yourHealthyWeightText: {
    color: '#e4bc94',
    fontSize: RFPercentage(7.7),
    fontWeight: '500',
  },
  weightUnits: {
    color: 'white',
    fontSize: RFPercentage(4),
  },
  vwGender: {
    flexDirection: 'row',
  },
  vwBodyFrame: {
    flexDirection: 'row',
  },
  vwWeight: {
    flexDirection: 'row',
  },
  vwHeight: {
    flexDirection: 'row',
  },
  vwAge: {
    flexDirection: 'row',
  },
  healthyWeightText: {
    fontSize: RFPercentage(3),
  },
  vwIdealWeight: {
    alignItems: 'center',
  },
  text: {
    fontWeight: '900',
    textAlign: 'center',
  },
})

export default ResultSlide
