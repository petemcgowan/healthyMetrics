import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  // TextInput,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalDropdown from 'react-native-modal-dropdown';

import Utils from '../components/Utils';
import {actionCreators, State} from '../redux/index';
import ColourContext from '../state/ColourContext';
// import { ValuesContext } from "../state/ValuesContext";

const {width} = Dimensions.get('window');
const threeQuarterWidth = width * 0.75;

const poundOptions = Utils.selectionDropDownRange(100, 260).map(
  pound => pound.value,
);
const stoneOptions = Utils.selectionDropDownRange(0, 13).map(
  stone => stone.value,
);
const kgOptions = Utils.selectionDropDownRange(40, 160).map(kg => kg.value);

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
      minWidth: threeQuarterWidth,
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
      fontSize: 95,
      color: colourData[index].lightVibrant,
      minWidth: 190,
      // padding: 20,
    },
    stonesPounds: {
      minWidth: 180,
      fontSize: 70,
    },
    inputContainer: {
      // height: 115,
      alignItems: 'center',
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
    dropdown_2_row: {
      // USING in dropdown, background color
      flexDirection: 'row',
      backgroundColor: 'transparent',
      // height: 40,
      alignItems: 'center',
    },
    // USING in dropdown, font Size
    inputDropdown: {
      textAlign: 'center',
      fontSize: 35,
      backgroundColor: 'transparent',
      color: colourData[index].lightVibrant,
      borderRadius: 50,
      // backgroundColor: 'pink',
      minWidth: threeQuarterWidth,
      padding: 12,
    },
  });

  const _dropdown_2_renderRow = (rowData, rowID, highlighted) => {
    return (
      // <TouchableHighlight>
      <View style={dynamicStyles.dropdown_2_row}>
        <Text style={dynamicStyles.inputDropdown}>{`${rowData}`}</Text>
      </View>
      // </TouchableHighlight>
    );
  };

  return (
    <View>
      {weightUnits === 'Pounds' && Platform.OS === 'android' && (
        <View>
          <View style={dynamicStyles.inputContainer}>
            <ModalDropdown
              defaultValue={weightPounds}
              options={poundOptions}
              onSelect={itemPoundsIndex => {
                console.log('itemPoundsIndex:' + itemPoundsIndex);
                setWeightPounds(poundOptions[itemPoundsIndex]);
              }}
              textStyle={dynamicStyles.weightEntry} // this is the selection box
              renderRow={_dropdown_2_renderRow} // this is the dropdown style
            />
          </View>
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Weight</Text>
        </View>
      )}
      {weightUnits === 'Pounds' && Platform.OS === 'ios' && (
        <View>
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Weight</Text>
          <View style={dynamicStyles.inputContainer}>
            <Picker
              selectedValue={weightPounds}
              itemStyle={dynamicStyles.weightEntry}
              onValueChange={(itemWeightPounds: string) => {
                setWeightPounds(itemWeightPounds);
                console.log('itemWeightPounds:' + itemWeightPounds);
                if (itemWeightPounds !== '') {
                  errorText = '';
                }
              }}>
              {poundOptions.map(weightValue => (
                <Picker.Item
                  value={weightValue}
                  label={weightValue}
                  key={weightValue}
                  style={dynamicStyles.weightEntry}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}
      {weightUnits === 'Stones/Pounds' && Platform.OS === 'android' && (
        <View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={dynamicStyles.inputContainer}>
              <ModalDropdown
                defaultValue={weightStones}
                options={stoneOptions}
                onSelect={itemStonesIndex => {
                  setWeightStones(stoneOptions[itemStonesIndex]);
                  console.log('itemStonesIndex:' + itemStonesIndex);
                }}
                textStyle={dynamicStyles.weightEntry} // this is the selection box
                renderRow={_dropdown_2_renderRow} // this is the dropdown style
              />
            </View>
            <View style={dynamicStyles.inputContainer}>
              <ModalDropdown
                defaultValue={weightPounds}
                options={poundOptions}
                onSelect={itemPoundsIndex => {
                  console.log('itemPoundsIndex:' + itemPoundsIndex);
                  setWeightPounds(poundOptions[itemPoundsIndex]);
                }}
                textStyle={dynamicStyles.weightEntry} // this is the selection box
                renderRow={_dropdown_2_renderRow} // this is the dropdown style
              />
            </View>
          </View>
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Weight</Text>
        </View>
      )}
      {weightUnits === 'Stones/Pounds' && Platform.OS === 'ios' && (
        <View>
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Weight</Text>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={dynamicStyles.inputContainer}>
              <Picker
                selectedValue={weightStones}
                itemStyle={[
                  dynamicStyles.weightEntry,
                  dynamicStyles.stonesPounds,
                ]}
                onValueChange={(itemWeightStones: string) => {
                  setWeightStones(itemWeightStones);
                  console.log('itemWeightStones:' + itemWeightStones);
                  if (itemWeightStones !== '') {
                    errorText = '';
                  }
                }}>
                {stoneOptions.map(weightValue => (
                  <Picker.Item
                    value={weightValue}
                    label={weightValue}
                    key={weightValue}
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
                onValueChange={(itemWeightPounds: string) => {
                  setWeightPounds(itemWeightPounds);
                  console.log('itemWeightPounds:' + itemWeightPounds);
                  if (itemWeightPounds !== '') {
                    errorText = '';
                  }
                }}>
                {poundOptions.map(weightPound => (
                  <Picker.Item
                    value={weightPound}
                    label={weightPound}
                    key={weightPound}
                    style={dynamicStyles.weightEntry}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      )}
      {weightUnits === 'kg' && Platform.OS === 'android' && (
        <View>
          <View style={dynamicStyles.inputContainer}>
            <ModalDropdown
              defaultValue={weightKg}
              options={kgOptions}
              onSelect={(itemKgIndex: string) => {
                console.log('itemKgIndex:' + itemKgIndex);
                setWeightKg(kgOptions[itemKgIndex]);
              }}
              textStyle={dynamicStyles.weightEntry} // this is the selection box
              renderRow={_dropdown_2_renderRow} // this is the dropdown style
            />
          </View>
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Weight</Text>
        </View>
      )}
      {weightUnits === 'kg' && Platform.OS === 'ios' && (
        <View>
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Weight</Text>
          <View style={dynamicStyles.inputContainer}>
            <Picker
              selectedValue={weightKg}
              itemStyle={dynamicStyles.weightEntry}
              onValueChange={(itemWeightKg: string) => {
                setWeightKg(itemWeightKg);
                console.log('itemWeightPounds:' + itemWeightKg);
                if (itemWeightKg !== '') {
                  errorText = '';
                }
              }}>
              {kgOptions.map(kgValue => (
                <Picker.Item
                  value={kgValue}
                  label={kgValue}
                  key={kgValue}
                  style={dynamicStyles.weightEntry}
                />
              ))}
            </Picker>
          </View>
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
