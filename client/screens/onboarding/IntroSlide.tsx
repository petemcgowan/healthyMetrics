import React from 'react'
import { StyleSheet, Dimensions, Text, View } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')

const IntroSlide = () => {
  return (
    <View style={styles.overallContainer}>
      <View style={[styles.topContainer, { height: height * 0.7 }]}>
        <Text style={styles.mainText}>Welcome to Healthy</Text>
      </View>
      <View style={[styles.bottomContainer, { height: height * 0.3 }]}>
        <Text style={styles.secondaryText}>
          Find the recommended healthy weight for your age, weight, height and
          wrist size...
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'column',
    marginTop: 40,
    overflow: 'hidden',
  },
  bottomContainer: {
    flexDirection: 'column',
    letterSpacing: 3,
    marginBottom: 80,
    width: width * 0.95,
    borderRadius: 20,
  },
  mainText: {
    alignSelf: 'center',
    textAlign: 'center',
    width: width * 0.95,
    color: 'rgba(255, 203, 31, 0.89)',
    fontSize: RFPercentage(9),
    alignItems: 'flex-start',
  },
  secondaryText: {
    backgroundColor: 'rgba(175,160,96, 0.8)',
    width: width * 0.95,
    textAlign: 'center',
    color: '#764134',
    margin: 3,
    fontSize: RFPercentage(3.2),
  },
})

export default IntroSlide
