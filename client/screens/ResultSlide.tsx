import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import {State} from '../redux/index'
import {RFPercentage} from 'react-native-responsive-fontsize'
import WeightDisplay from '../components/WeightDisplay.tsx'

const {width, height} = Dimensions.get('window')

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
  const {
    weightUnits,
    heightCm,
    heightFt,
    heightInches,
    weightPounds,
    weightPoundsOnly,
    weightStones,
    weightKg,
    frame,
    age,
    gender,
    heightUnits,
  } = useSelector((state: State) => state)

  // Large radius for single view, smaller for side-by-side
  const largeRadius = height < 800 ? 78 : 95
  const smallRadius = height < 800 ? 65 : 80

  const moveToBMI = () => {
    setIndex(index + 1)
  }

  const openInfoLink = () => {
    Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/6869387/')
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <SafeAreaView style={styles.container}>
        {/* --- CARD 1: THE MAIN RESULT --- */}
        <View style={styles.glassCard}>
          {/* Info Icon (Top Right) */}
          <TouchableOpacity style={styles.infoIcon} onPress={openInfoLink}>
            <Text style={styles.infoIconText}>ⓘ</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>Your Healthy Weight</Text>

          <View style={styles.circleContainer}>
            {/* KG VIEW */}
            {weightUnits === 'kg' && (
              <WeightDisplay
                value={idealWeightKg}
                label="kg"
                radius={largeRadius}
              />
            )}

            {/* POUNDS VIEW */}
            {weightUnits === 'Pounds' && (
              <WeightDisplay
                value={idealWeightPounds}
                label="pounds"
                radius={largeRadius}
              />
            )}

            {/* STONES / POUNDS VIEW (Side by Side) */}
            {weightUnits === 'Stones/Pounds' && (
              <View style={{flexDirection: 'row'}}>
                <WeightDisplay
                  value={idealWeightStones}
                  label="stones"
                  radius={smallRadius}
                />
                <WeightDisplay
                  value={idealWeightPounds}
                  label="pounds"
                  radius={smallRadius}
                />
              </View>
            )}
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.actionButton} onPress={moveToBMI}>
            <Text style={styles.actionButtonText}>View BMI</Text>
          </TouchableOpacity>
        </View>

        {/* --- CARD 2: ENTERED INFO --- */}
        <View style={[styles.glassCard, styles.infoCard]}>
          <Text style={styles.subHeaderText}>Your Details</Text>

          <View style={styles.detailsGrid}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Gender:</Text>
              <Text style={styles.detailValue}>{gender}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Frame:</Text>
              <Text style={styles.detailValue}>{frame}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Age:</Text>
              <Text style={styles.detailValue}>{age}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Height:</Text>
              <Text style={styles.detailValue}>
                {heightUnits === 'cm'
                  ? `${heightCm} cm`
                  : `${heightFt}' ${heightInches}"`}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Current:</Text>
              <Text style={styles.detailValue}>
                {weightUnits === 'kg'
                  ? `${weightKg} kg`
                  : weightUnits === 'Pounds'
                  ? `${weightPoundsOnly} lbs`
                  : `${weightStones}st ${weightPounds}lb`}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: width,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  // GLASSMORPHISM CARD STYLE
  glassCard: {
    width: width * 0.9,
    backgroundColor: 'rgba(30, 30, 40, 0.75)', // Dark semi-transparent
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255, 0.1)',
    alignItems: 'center',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  infoCard: {
    paddingVertical: 15,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: RFPercentage(4),
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeaderText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: RFPercentage(2.5),
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // Circle & Value
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  // Info Icon
  infoIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  infoIconText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 20,
  },

  // Action Button
  actionButton: {
    backgroundColor: '#4FD1C5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  actionButtonText: {
    color: '#1A202C',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
  },

  // Details Grid
  detailsGrid: {
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: RFPercentage(2.2),
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: RFPercentage(2.2),
    fontWeight: '600',
  },
})

export default ResultSlide
