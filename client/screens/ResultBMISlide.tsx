import React, {useRef} from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Linking,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Svg, {G, Circle} from 'react-native-svg'
import {RFPercentage} from 'react-native-responsive-fontsize'

const {width, height} = Dimensions.get('window')
const radius = height < 800 ? 78 : 95

interface ResultBMISlideProps {
  bmiCalcResult: number
  setIndex: (index: number) => void // New Prop
  index: number // New Prop
}

// --- DATA STRUCTURE FOR BMI CATEGORIES ---
// This cleans up the render logic massively.
const BMI_CATEGORIES = [
  {label: 'Severe Thinness', range: 'less than 16', min: 0, max: 16},
  {label: 'Moderate Thinness', range: '16 - 17', min: 16, max: 17},
  {label: 'Mild Thinness', range: '17 - 18.5', min: 17, max: 18.5},
  {label: 'Normal', range: '18.5 - 25', min: 18.5, max: 25},
  {label: 'Overweight', range: '25 - 30', min: 25, max: 30},
  {label: 'Obese Class I', range: '30 - 35', min: 30, max: 35},
  {label: 'Obese Class II', range: '35 - 40', min: 35, max: 40},
  {label: 'Obese Class III', range: 'greater than 40', min: 40, max: 999},
]

const ResultBMISlide = ({
  bmiCalcResult,
  setIndex,
  index,
}: ResultBMISlideProps) => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle)
  const circleRef = useRef(null)
  const inputRef = useRef(null)

  const strokeWidth = 10
  const circleColor = '#4FD1C5' // Matching Teal
  const textColor = '#E0E0E0'
  const circumference = 2 * Math.PI * radius
  const halfCircle = radius + strokeWidth

  const moveToAI = () => {
    setIndex(index + 1)
  }

  // Helper to determine active category
  const getActiveCategoryIndex = () => {
    return BMI_CATEGORIES.findIndex(
      cat => bmiCalcResult >= cat.min && bmiCalcResult < cat.max,
    )
  }

  const activeIndex = getActiveCategoryIndex()
  const activeCategoryLabel =
    activeIndex !== -1 ? BMI_CATEGORIES[activeIndex].label : ''

  const openInfoLink = () => {
    Linking.openURL(
      'https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations',
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <SafeAreaView style={styles.container}>
        <View style={styles.glassCard}>
          <TouchableOpacity style={styles.infoIcon} onPress={openInfoLink}>
            <Text style={styles.infoIconText}>ⓘ</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Your Body Mass Index</Text>

          <View style={styles.circleContainer}>
            <Svg
              height={radius * 2}
              width={radius * 2}
              viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
              <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                <AnimatedCircle
                  ref={circleRef}
                  cx="50%"
                  cy="50%"
                  r={radius}
                  fill="transparent"
                  stroke={circleColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDashoffset={circumference}
                  strokeDasharray={circumference}
                />
                {/* Background Circle for contrast */}
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  fill="transparent"
                  stroke={circleColor}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  opacity={0.3}
                />
              </G>
            </Svg>
            <TextInput
              ref={inputRef}
              underlineColorAndroid="transparent"
              editable={false}
              style={[
                StyleSheet.absoluteFillObject,
                styles.centerText,
                {fontSize: radius / 1.6, color: textColor},
              ]}>
              {Math.round(bmiCalcResult)}
            </TextInput>
          </View>

          {/* Dynamic Category Label */}
          <Text style={styles.categoryLabel}>{activeCategoryLabel}</Text>
        </View>

        {/* --- CARD 2: THE TABLE (Cleaned Up) --- */}
        <View style={[styles.glassCard, styles.tableCard]}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.tableHeader}>Category</Text>
            <Text style={styles.tableHeader}>BMI Range</Text>
          </View>

          {BMI_CATEGORIES.map((cat, index) => {
            const isActive = index === activeIndex
            return (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  isActive && styles.activeRow, // Highlight the active row background
                ]}>
                <Text style={[styles.tableText, isActive && styles.activeText]}>
                  {cat.label}
                </Text>
                <Text style={[styles.tableText, isActive && styles.activeText]}>
                  {cat.range}
                </Text>
              </View>
            )
          })}

          <TouchableOpacity style={styles.actionButton} onPress={moveToAI}>
            <Text style={styles.actionButtonText}>
              Get AI Insights &#10140;
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
  },
  // Glassmorphism Card
  glassCard: {
    width: width * 0.9,
    backgroundColor: 'rgba(30, 30, 40, 0.75)',
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255, 0.1)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: RFPercentage(3.3),
    fontWeight: '600',
    marginBottom: 25,
    textAlign: 'center',
  },
  centerText: {
    fontWeight: '900',
    textAlign: 'center',
  },
  categoryLabel: {
    marginTop: 10,
    color: '#4FD1C5',
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  circleContainer: {
    width: radius * 2,
    height: radius * 2,
    marginBottom: 5,
  },
  // Table Styles
  tableCard: {
    padding: 15,
    paddingBottom: 15,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 5,
  },
  tableHeader: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: RFPercentage(2.2),
    fontWeight: '600',
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  activeRow: {
    marginVertical: 5,
    backgroundColor: 'rgba(79, 209, 197, 0.2)', // Teal highlight background
  },
  tableText: {
    color: 'rgba(255,255,255,0.5)', // Dim inactive text
    fontSize: RFPercentage(2.0),
    flex: 1,
  },
  activeText: {
    color: '#FFFFFF', // Bright active text
    fontWeight: 'bold',
    fontSize: RFPercentage(2.2),
  },
  // Info Icon
  infoIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
  },
  infoIconText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 20,
  },
  // Button Styles
  actionButton: {
    backgroundColor: '#4FD1C5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10, // Space it out from the table
    width: '100%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#1A202C',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
})

export default ResultBMISlide
