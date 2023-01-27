import React from 'react';
import {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HelperText} from 'react-native-paper';

import HeightUnitsPicker from '../components/pickers/HeightUnitsPicker';
import WeightUnitsPicker from '../components/pickers/WeightUnitsPicker';
import ColourContext from '../state/ColourContext';

const UnitsSlide = ({errorText}) => {
  const {colourData, index} = useContext(ColourContext);
  const hasErrors = () => {
    return errorText !== '';
  };

  const dynamicStyles = StyleSheet.create({
    textAbove: {
      alignSelf: 'center',
      width: 'auto',
      textAlign: 'center',
      minWidth: 100,
      color: colourData[index].dominant, // "#FFCB1F",
      fontSize: 90,
      // fontWeight: "bold",
    },
    textBelow: {
      alignSelf: 'center',
      width: 'auto',
      textAlign: 'center',
      minWidth: 100,
      color: colourData[index].dominant,
      fontSize: 123,
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
          style={{fontSize: 40, color: colourData[index].lightVibrant}}
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
