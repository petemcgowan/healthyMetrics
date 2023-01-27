import {Picker} from '@react-native-picker/picker';
import React, {useContext, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from 'react-native';
import {HelperText} from 'react-native-paper';
// import RNPickerSelect from "react-native-picker-select";
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalDropdown from 'react-native-modal-dropdown';
// import ReactNativePickerModule, { PickerRef } from "react-native-picker-module";

import Utils from '../components/Utils';
import {actionCreators, State} from '../redux/index';
import ColourContext from '../state/ColourContext';

const AgeSlide = ({errorText}) => {
  const {colourData, index} = useContext(ColourContext);
  const age = useSelector((state: State) => state.age);
  console.log('AgeSlide: age:' + age);
  const dispatch = useDispatch();
  const {setAge} = bindActionCreators(actionCreators, dispatch);
  // native module tests
  // const pickerRef = useRef<PickerRef>(null);
  // const [value, setValue] = useState();
  // const dataset_1 = [1, 2, "Java", "Kotlin", "C++", "C#", "PHP"];

  const hasErrors = () => {
    return age === '';
  };

  const dynamicStyles = StyleSheet.create({
    textAbove: {
      alignSelf: 'center',
      width: 'auto',
      textAlign: 'center',
      minWidth: 100,
      color: colourData[index].lightVibrant,
      fontSize: 93,
    },
    textBelow: {
      alignSelf: 'center',
      width: 'auto',
      textAlign: 'center',
      minWidth: 100,
      color: colourData[index].lightVibrant,
      fontSize: 125,
      // fontSize: 140,
    },
    input: {
      // textAlign: "center",
      // fontSize: 115,
      // color: colourData[index].lightVibrant,
      // minWidth: 200,
      // padding: 12,
      textAlign: 'center',
      fontSize: 145,
      // fontSize: Platform.OS === 'ios' ? 145 : 60,
      fontWeight: '400',
      // color: "#fff",
      // color: "#e4bc94",
      color: colourData[index].lightVibrant,
      // color: 'rgba(16, 130, 90, 1)',
      // themeVariant: 'light',
      // selectedColor: 'rgba(00, 0, 90, 1)',
      // opacity: 1,
      // color: "#e4bc94",
      borderRadius: 50,
      // backgroundColor: " rgba(41, 141, 163, 0.2)",
      minWidth: 240,
      padding: 12,
    },
    inputDropdown: {
      textAlign: 'center',
      fontSize: 145,
      // fontSize: Platform.OS === 'ios' ? 145 : 60,
      fontWeight: '400',
      color: colourData[index].lightVibrant,
      borderRadius: 50,
      backgroundColor: 'pink',
      minWidth: 240,
      padding: 12,
    },
    inputContainer: {
      // height: 130,
      alignSelf: 'center',
      borderWidth: 3,
      borderColor: colourData[index].lightVibrant,
      minWidth: 250,
      borderRadius: 30,
    },
    dropdown_2: {
      alignSelf: 'flex-end',
      width: 150,
      marginTop: 32,
      right: 8,
      borderWidth: 0,
      borderRadius: 3,
      backgroundColor: 'cornflowerblue',
    },
    dropdown_2_row: {
      flexDirection: 'row',
      height: 40,
      alignItems: 'center',
    },
    dropdown_2_row_text: {
      marginHorizontal: 4,
      fontSize: 16,
      color: 'navy',
      textAlignVertical: 'center',
    },
  });

  const _dropdown_2_renderRow = (rowData, rowID, highlighted) => {
    const evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor="cornflowerblue">
        <View
          style={[
            dynamicStyles.dropdown_2_row,
            {backgroundColor: evenRow ? 'lemonchiffon' : 'white'},
          ]}>
          <Text
            style={[
              dynamicStyles.dropdown_2_row_text,
              highlighted && {color: 'mediumaquamarine'},
            ]}>
            {`${rowData.name} (${rowData.age})`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View>
      <Text style={dynamicStyles.textAbove}>Enter</Text>
      <Text style={dynamicStyles.textBelow}>Age</Text>
      <View style={dynamicStyles.inputContainer}>
        <ModalDropdown
          options={Utils.selectionDropDownRange(24, 79).map(age => age.value)}
          style={dynamicStyles.dropdown_2}
          dropdownStyle={dynamicStyles.inputDropdown}
          renderRow={_dropdown_2_renderRow}
        />
      </View>
      {/* <Picker
        selectedValue={age}
        itemStyle={dynamicStyles.input}
        onValueChange={(itemAgeValue, itemIndex) => {
          setAge(itemAgeValue);
          console.log('itemYearValue:' + itemAgeValue);
        }}>
        {Utils.selectionDropDownRange(24, 79).map(age => (
          <Picker.Item
            value={age.value}
            label={age.label}
            key={age.label}
            style={dynamicStyles.input}
            // style={{fontSize: 145}}
          />
        ))}
      </Picker> */}
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
  inputContainer: {
    alignSelf: 'center',
    // height: 70,
  },
  textContainer: {
    alignSelf: 'center',
    minWidth: 150,
    height: 75,
  },
});

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     textAlign: 'center',
//     fontSize: 115,
//     color: '#8ac4e4',
//     minWidth: 200,
//     padding: 12,
//     // fontSize: 16,
//     // paddingVertical: 12,
//     // paddingHorizontal: 10,
//     // borderWidth: 1,
//     // borderColor: "gray",
//     // borderRadius: 4,
//     // color: "black",
//     // paddingRight: 30, // to ensure the text is never behind the icon
//   },
//   inputAndroid: {
//     textAlign: 'center',
//     fontSize: 115,
//     color: '#8ac4e4',
//     minWidth: 200,
//     padding: 12,
//     // fontSize: 16,
//     // paddingHorizontal: 10,
//     // paddingVertical: 8,
//     // borderWidth: 0.5,
//     // borderColor: "purple",
//     // borderRadius: 8,
//     // color: "black",
//     // paddingRight: 30, // to ensure the text is never behind the icon
//   },
// });

export default AgeSlide;
