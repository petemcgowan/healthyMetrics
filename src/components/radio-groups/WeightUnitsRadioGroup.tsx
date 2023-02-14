import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../redux/index';
import {WeightUnitsReducerType} from '../../redux/reducers/WeightUnitsReducer';

const {width, height} = Dimensions.get('window');
const threeQuarterWidth = width * 0.8;

interface WeightUnitsRadioGroupProps {
  animatedStyle: Record<string, any>;
}

const WeightUnitsRadioGroup = ({animatedStyle}: WeightUnitsRadioGroupProps) => {
  const weightUnits = useSelector(
    (state: WeightUnitsReducerType) => state.weightUnits,
  );
  const dispatch = useDispatch();
  const {setWeightUnits} = bindActionCreators(actionCreators, dispatch);

  const dynamicStyles = StyleSheet.create({
    animatedBlock: {
      height: height * 0.07,
      width: threeQuarterWidth,
      borderWidth: 3,
      borderColor: '#84c4ec',
      backgroundColor: '#84c4ec',
      alignItems: 'center',
      justifyContent: 'center',
    },
    animatedTextPlaceholder: {
      color: 'white',
      fontSize: width < 450 ? 25 : 30,
    },
    animatedBlockPlaceholder: {
      height: height * 0.07,
      width: threeQuarterWidth,
      borderWidth: 3,
      borderColor: '#84c4ec',
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'dashed',
    },
  });

  return (
    <View style={styles.animatedBox}>
      {weightUnits === 'Pounds' ? (
        <TouchableWithoutFeedback //Pounds  ON
          onPress={() => {
            setWeightUnits('kg');
          }}>
          <Animated.View style={dynamicStyles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Pounds</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Pounds  OFF
          entering={
            'entering' in animatedStyle ? undefined : FadeIn.delay(350)
          }>
          <TouchableOpacity
            style={dynamicStyles.animatedBlockPlaceholder}
            onPress={() => {
              setWeightUnits('Pounds'); // Turning POUNDS ON
            }}>
            <Text style={dynamicStyles.animatedTextPlaceholder}>Pounds</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {weightUnits === 'kg' ? (
        <TouchableWithoutFeedback //kg  ON
          onPress={() => {
            setWeightUnits('Pounds');
          }}>
          <Animated.View style={dynamicStyles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>kg</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //kg  OFF
          entering={
            'entering' in animatedStyle ? undefined : FadeIn.delay(350)
          }>
          <TouchableOpacity
            style={dynamicStyles.animatedBlockPlaceholder}
            onPress={() => {
              setWeightUnits('kg'); // Turning KG ON
            }}>
            <Text style={dynamicStyles.animatedTextPlaceholder}>kg</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {weightUnits === 'Stones/Pounds' ? (
        <TouchableWithoutFeedback //Stones/Pounds  ON
          onPress={() => {
            setWeightUnits('Pounds');
          }}>
          <Animated.View style={dynamicStyles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Stones/Pounds</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Stones/Pounds  OFF
          entering={
            'entering' in animatedStyle ? undefined : FadeIn.delay(350)
          }>
          <TouchableOpacity
            style={dynamicStyles.animatedBlockPlaceholder}
            onPress={() => {
              setWeightUnits('Stones/Pounds'); // Turning Stones/Pounds ON
            }}>
            <Text style={dynamicStyles.animatedTextPlaceholder}>
              Stones/Pounds
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  animatedBox: {
    padding: 5,
    alignItems: 'center',
  },
  animatedText: {
    color: '#ffffff',
    fontSize: width < 450 ? 25 : 30,
  },
});

export default WeightUnitsRadioGroup;
