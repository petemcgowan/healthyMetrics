import React from 'react';
import {StyleSheet, Dimensions, Text, View} from 'react-native';

const {width, height} = Dimensions.get('window');

const IntroSlide = () => {
  return (
    <View style={styles.overallContainer}>
      <View style={[styles.topContainer, {height: height * 0.7}]}>
        <Text style={styles.mainText}>Welcome to Healthy</Text>
      </View>
      {/* <View style={{height: height * 0.15}}></View> */}
      <View style={[styles.bottomContainer, {height: height * 0.3}]}>
        <Text style={styles.secondaryText}>
          Find the recommended healthy weight for your age, weight, height and
          wrist size...
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
    // flex: 0.5,
    flexDirection: 'column',
    marginTop: 40,
    overflow: 'hidden',
    // padding: 10,
    // flexWrap: "wrap",
    // minWidth: 150,
    // flexBasis: '45%',
    // margin: 10,
  },
  bottomContainer: {
    flexDirection: 'column',
    // flex: 0.5,
    letterSpacing: 3,
    marginBottom: 80,
    width: width * 0.95,
    borderRadius: 20,
    // flex: 1,
    // flexBasis: '45%',
    // margin: 13,
    // marginTop: 40,
    // flexWrap: 'wrap',
    // overflow: 'hidden',
    // minHeight: 40,
  },
  mainText: {
    alignSelf: 'center',
    // justifyContent: "flex-start",
    textAlign: 'center',
    width: width * 0.95,
    color: 'rgba(255, 203, 31, 0.89)',
    fontSize: height < 800 ? 58 : 70,
    alignItems: 'flex-start',
  },
  secondaryText: {
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',

    backgroundColor: 'rgba(175,160,96, 0.8)',
    width: width * 0.95,

    alignSelf: 'flex-start',
    // overflow: 'hidden',
    color: '#764134',
    // color: 'rgba(255, 203, 31, 0.89)',
    margin: 3,
    fontSize: 21,
  },
});

export default IntroSlide;
