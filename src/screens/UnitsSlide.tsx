import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {HelperText} from 'react-native-paper';

import HeightUnitsPicker from '../components/pickers/HeightUnitsPicker';
import WeightUnitsPicker from '../components/pickers/WeightUnitsPicker';

const {width} = Dimensions.get('window');

interface UnitsSlideProps {
  errorText: string;
}

const UnitsSlide = ({errorText}: UnitsSlideProps) => {
  const hasErrors = () => {
    return errorText !== '';
  };

  const dynamicStyles = StyleSheet.create({
    textAbove: {
      alignSelf: 'center',
      width: width,
      textAlign: 'center',
      minWidth: 100,
      color: '#e4bc94', // "#FFCB1F",
      fontSize: width < 380 ? 70 : 90,
      // fontWeight: "bold",
    },
    textBelow: {
      alignSelf: 'center',
      width: width,
      textAlign: 'center',
      minWidth: 100,
      color: '#e4bc94',
      fontSize: width < 380 ? 103 : 123,
    },
  });

  return (
    <View>
      <Text style={dynamicStyles.textAbove}>Select</Text>
      <Text style={dynamicStyles.textBelow}>Units</Text>
      <HeightUnitsPicker />
      <WeightUnitsPicker />
      <View style={styles.textContainer}>
        <HelperText
          style={{fontSize: 40, color: '#ddb583'}}
          type="error"
          visible={hasErrors()}>
          {errorText}
        </HelperText>
      </View>
    </View>
  );
};

export default UnitsSlide;

const styles = StyleSheet.create({
  textContainer: {
    alignSelf: 'center',
    minWidth: 150,
    height: 75,
  },
});
