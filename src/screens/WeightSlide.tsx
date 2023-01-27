import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  // TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import Utils from '../components/Utils';
import {actionCreators, State} from '../redux/index';
import ColourContext from '../state/ColourContext';
// import { ValuesContext } from "../state/ValuesContext";

const WeightSlide = ({handleCalculate, errorText}) => {
  const {colourData, index} = useContext(ColourContext);
  const weightPounds = useSelector((state: State) => state.weightPounds);
  const weightStones = useSelector((state: State) => state.weightStones);
  const weightUnits = useSelector((state: State) => state.weightUnits);
  const weightKg = useSelector((state: State) => state.weightKg);
  console.log('WeightSlide: weightPounds:' + weightPounds);
  const dispatch = useDispatch();
  const {setWeightPounds, setWeightStones, setWeightKg} = bindActionCreators(
    actionCreators,
    dispatch,
  );

  useEffect(() => {
    console.log('WeightSlide, useEffect:');
  }, [errorText]);

  const hasErrors = () => {
    return weightPounds === '';
  };

  const dynamicStyles = StyleSheet.create({
    textAbove: {
      alignSelf: 'center',
      // width: "auto",
      textAlign: 'center',
      minWidth: 100,
      color: '#e4bc94',
      fontSize: 90,
    },
    textBelow: {
      alignSelf: 'center',
      // width: "auto",
      textAlign: 'center',
      minWidth: 100,
      color: '#8ac4e4',
      fontSize: 120,
    },
    weightEntry: {
      // height: 115,
      textAlign: 'center',
      fontSize: Platform.OS === 'ios' ? 95 : 60,
      color: colourData[index].lightVibrant,
      minWidth: 230,
      // padding: 20,
    },
    stonesPounds: {
      minWidth: 180,
      fontSize: 70,
    },
    inputContainer: {
      // height: 115,
      borderWidth: 3,
      borderRadius: 30,
      borderColor: colourData[index].lightVibrant,
    },
    buttonText: {
      alignSelf: 'center',
      padding: 20,
      fontSize: 45,
      color: colourData[index].lightVibrant,
      fontWeight: 'bold',
    },
    button: {
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: colourData[index].lightVibrant,
      backgroundColor: '#e4bc94',
      marginBottom: 80,
    },
  });
  console.log(
    'WeightSlide: colourData[index].lightVibrant):' +
      colourData[index].lightVibrant,
  );
  return (
    <View>
      <Text style={dynamicStyles.textAbove}>Enter</Text>
      <Text style={dynamicStyles.textBelow}>Weight</Text>
      {weightUnits === 'Pounds' && (
        <View style={dynamicStyles.inputContainer}>
          <Picker
            selectedValue={weightPounds}
            itemStyle={dynamicStyles.weightEntry}
            onValueChange={(itemWeightPounds, itemIndex) => {
              setWeightPounds(itemWeightPounds);
              console.log('itemWeightPounds:' + itemWeightPounds);
              if (itemWeightPounds !== '') {
                errorText = '';
              }
            }}>
            {Utils.selectionDropDownRange(100, 260).map(weight => (
              <Picker.Item
                value={weight.value}
                label={weight.label}
                key={weight.label}
                style={dynamicStyles.weightEntry}
              />
            ))}
          </Picker>
        </View>
      )}
      {weightUnits === 'Stones/Pounds' && (
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <View style={dynamicStyles.inputContainer}>
            <Picker
              selectedValue={weightStones}
              itemStyle={[
                dynamicStyles.weightEntry,
                dynamicStyles.stonesPounds,
              ]}
              onValueChange={(itemWeightStones, itemIndex) => {
                setWeightStones(itemWeightStones);
                console.log('itemWeightStones:' + itemWeightStones);
                if (itemWeightStones !== '') {
                  errorText = '';
                }
              }}>
              {Utils.selectionDropDownRange(100, 260).map(weight => (
                <Picker.Item
                  value={weight.value}
                  label={weight.label}
                  key={weight.label}
                  style={dynamicStyles.weightEntry}
                />
              ))}
            </Picker>
          </View>
          <View style={dynamicStyles.inputContainer}>
            <Picker
              selectedValue={weightPounds}
              itemStyle={[
                dynamicStyles.weightEntry,
                dynamicStyles.stonesPounds,
              ]}
              onValueChange={(itemWeightPounds, itemIndex) => {
                setWeightPounds(itemWeightPounds);
                console.log('itemWeightPounds:' + itemWeightPounds);
                if (itemWeightPounds !== '') {
                  errorText = '';
                }
              }}>
              {Utils.selectionDropDownRange(0, 13).map(weight => (
                <Picker.Item
                  value={weight.value}
                  label={weight.label}
                  key={weight.label}
                  style={dynamicStyles.weightEntry}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}
      {weightUnits === 'kg' && (
        <View style={dynamicStyles.inputContainer}>
          <Picker
            selectedValue={weightKg}
            itemStyle={dynamicStyles.weightEntry}
            onValueChange={(itemWeightKg, itemIndex) => {
              setWeightKg(itemWeightKg);
              console.log('itemWeightPounds:' + itemWeightKg);
              if (itemWeightKg !== '') {
                errorText = '';
              }
            }}>
            {Utils.selectionDropDownRange(40, 160).map(weight => (
              <Picker.Item
                value={weight.value}
                label={weight.label}
                key={weight.label}
                style={dynamicStyles.weightEntry}
              />
            ))}
          </Picker>
        </View>
      )}
      <View>
        <HelperText
          style={{fontSize: 35, color: colourData[index].dominant}}
          type="error"
          visible={hasErrors()}>
          {errorText}
        </HelperText>
      </View>
      <TouchableOpacity style={dynamicStyles.button} onPress={handleCalculate}>
        <Text style={dynamicStyles.buttonText}>Calculate </Text>
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({
//   textContainer: {
//     // alignSelf: "center",
//     // minWidth: 120,
//     // height: 75,
//   },
// });

export default WeightSlide;
