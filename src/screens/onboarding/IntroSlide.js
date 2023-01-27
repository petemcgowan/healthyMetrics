import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const IntroSlide = () => {
  return (
    <View style={styles.overallContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.mainText}>Welcome to Ideal... </Text>
      </View>
      <View style={styles.midContainer} />
      <View style={styles.bottomContainer}>
        <Text style={styles.secondaryText}>
          Find the medically recommended range for your age, weight, height,
          gender and wrist size! 😎
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
  },
  topContainer: {
    // flexWrap: "wrap",
    flexBasis: '30%',
    margin: 20,
    overflow: 'hidden',
    // minWidth: 150,
    padding: 10,
  },
  midContainer: {
    flexBasis: '30%',
  },
  bottomContainer: {
    // flex: 1,
    flexBasis: '30%',
    letterSpacing: 3,
    margin: 20,
    flexWrap: 'wrap',
    overflow: 'hidden',
    minHeight: 40,
    borderRadius: 30,
  },
  mainText: {
    alignSelf: 'center',
    // justifyContent: "flex-start",
    textAlign: 'center',
    color: 'rgba(255, 203, 31, 0.89)',
    fontSize: 68,
    alignItems: 'flex-start',
  },
  secondaryText: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignSelf: 'flex-start',
    overflow: 'hidden',
    color: 'rgba(255, 203, 31, 0.89)',
    padding: 3,
    fontSize: 24,
  },
});

export default IntroSlide;
