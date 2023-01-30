import React, {useContext, useState, useRef} from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import {HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalDropdown from 'react-native-modal-dropdown';

import Utils from '../components/Utils';
import {actionCreators, State} from '../redux/index';
import ColourContext from '../state/ColourContext';

const {width} = Dimensions.get('window');
const threeQuarterWidth = width * 0.75;

const AgeSlide = ({errorText}) => {
  const ageOptions = Utils.selectionDropDownRange(24, 79).map(age => age.value);

  const {colourData, index} = useContext(ColourContext);
  const age = useSelector((state: State) => state.age);
  console.log('AgeSlide: age:' + age);
  const dispatch = useDispatch();
  const {setAge} = bindActionCreators(actionCreators, dispatch);

  const hasErrors = () => {
    return age === '';
  };

  const dynamicStyles = StyleSheet.create({
    textAbove: {
      alignSelf: 'center',
      width: threeQuarterWidth,
      textAlign: 'center',
      minWidth: threeQuarterWidth,
      color: colourData[index].lightVibrant,
      fontSize: 93,
    },
    textBelow: {
      alignSelf: 'center',
      width: threeQuarterWidth,
      textAlign: 'center',
      minWidth: threeQuarterWidth,
      color: colourData[index].lightVibrant,
      fontSize: 125,
    },
    input: {
      textAlign: 'center',
      fontSize: 105,
      fontWeight: '400',
      // backgroundColor: 'transparent',
      color: colourData[index].lightVibrant,
      borderRadius: 50,
      minWidth: threeQuarterWidth,
      padding: 12,
    },
    inputContainer: {
      // height: 130,
      alignSelf: 'center',
      borderWidth: 3,
      // backgroundColor: 'transparent',
      borderColor: colourData[index].lightVibrant,
      minWidth: threeQuarterWidth,
      borderRadius: 30,
    },
    // dropdown_2_selectedValue: {
    //   alignSelf: 'flex-end',
    //   width: 150,
    //   marginTop: 32,
    //   right: 8,
    //   borderWidth: 0,
    //   borderRadius: 3,
    //   backgroundColor: 'green',
    // },
    // USING in dropdown, font Size
    inputDropdown: {
      textAlign: 'center',
      fontSize: 35,
      // backgroundColor: 'transparent',
      color: colourData[index].lightVibrant,
      borderRadius: 50,
      // backgroundColor: 'pink',
      minWidth: threeQuarterWidth,
      padding: 12,
    },
    dropdown_2_row: {
      // USING in dropdown, background color
      flexDirection: 'row',
      // backgroundColor: 'transparent',
      // height: 40,
      alignItems: 'center',
    },
    // dropdown_2_dropdown: {
    //   width: 150,
    //   height: 300,
    //   borderColor: 'cornflowerblue',
    //   borderWidth: 2,
    //   borderRadius: 3,
    // },
    // dropdown_2_row_text: {
    //   marginHorizontal: 4,
    //   fontSize: 16,
    //   color: 'navy',
    //   textAlignVertical: 'center',
    // },
  });

  const _dropdown_2_renderRow = (rowData, rowID, highlighted) => {
    return (
      <View style={dynamicStyles.dropdown_2_row}>
        <Text style={dynamicStyles.inputDropdown}>{`${rowData}`}</Text>
      </View>
    );
  };

  return (
    <View>
      {Platform.OS === 'android' && (
        <View>
          <View style={dynamicStyles.inputContainer}>
            <ModalDropdown
              defaultValue={age}
              // defaultValue={age}
              // options={Utils.selectionDropDownRange(24, 79).map(
              //   age => age.value,
              // )}
              options={ageOptions}
              onSelect={itemIndex => {
                console.log('AgeSlide, itemIndex:' + itemIndex);
                setAge(ageOptions[itemIndex]);
              }}
              // style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
              // renderButtonText={dynamicStyles.input}
              textStyle={dynamicStyles.input} // this is the selection box
              // dropdownStyle={dynamicStyles.dropdown_2_dropdown}
              // dropdownStyle={dynamicStyles.inputDropdown}
              renderRow={_dropdown_2_renderRow} // this is the dropdown style
            />
          </View>
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Age</Text>
        </View>
      )}
      {Platform.OS === 'ios' && (
        <View>
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Age</Text>
          <View style={dynamicStyles.inputContainer}>
            <Picker
              selectedValue={age}
              itemStyle={dynamicStyles.input}
              onValueChange={(itemAgeValue: string) => {
                setAge(itemAgeValue);
                console.log('itemYearValue:' + itemAgeValue);
              }}>
              {ageOptions.map(ageValue => (
                <Picker.Item
                  value={ageValue}
                  label={ageValue}
                  key={ageValue}
                  style={dynamicStyles.input}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}

      <View style={styles.textContainer}>
        <HelperText
          style={{fontSize: 45, color: colourData[index].dominant}}
          type="error"
          visible={hasErrors()}>
          {errorText}
        </HelperText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // inputContainer: {
  //   alignSelf: 'center',
  //   // height: 70,
  // },
  textContainer: {
    // Helper Text
    alignSelf: 'center',
    minWidth: threeQuarterWidth,
    height: 75,
  },
});

export default AgeSlide;
