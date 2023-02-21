import React, {useMemo, useRef, useState} from 'react';
import {Picker as Select} from '@react-native-picker/picker';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
// import ModalDropdown from 'react-native-modal-dropdown';
// import SimplePicker from 'react-native-simple-picker';
// import ReactNativeItemSelect from 'react-native-item-select';
// import ReactNativePickerModule, {PickerRef} from 'react-native-picker-module';
import {Picker, PickerColumn, PickerItem} from 'react-native-picky';

import Utils from '../components/Utils';
import {actionCreators, State} from '../redux/index';

const {width} = Dimensions.get('window');
const threeQuarterWidth = width * 0.75;

interface AgeSlideProps {
  errorText: string;
}

// const Item: any = Select.Item;

// const data = [
//   {firstLetter: 'A', displayName: 'English', name: 'English'},
//   {firstLetter: 'B', displayName: 'Bollock', name: 'Tamil'},
// ];

// const textStyle = {textAlign: 'center', color: '#696969', fontWeight: 'bold'};

const AgeSlide = ({errorText}: AgeSlideProps) => {
  const ageOptions = Utils.selectionDropDownRange(18, 74).map(age => age.value);
  const pickerRef = useRef();
  // const pickerRef = useRef<PickerRef>(null);
  const age = useSelector((state: State) => state.age);
  const dispatch = useDispatch();
  const {setAge} = bindActionCreators(actionCreators, dispatch);
  // const pickerRef = useRef(null);
  // const [value, setValue] = useState();
  // const dataset_1 = [1, 2, 'Java', 'Kotlin', 'C++', 'C#', 'PHP'];

  // function open() {
  //   console.log('open called');
  //   pickerRef.current.focus();
  // }

  // function close() {
  //   pickerRef.current.blur();
  // }

  const hasErrors = () => {
    return age === '';
  };

  // const _dropdown_2_renderRow = rowData => {
  //   console.log('AgeSlide, _dropdown_2_renderRow called');
  //   return (
  //     <View style={styles.dropdown_2_row}>
  //       <Text style={styles.inputDropdown}>{`${rowData}`}</Text>
  //     </View>
  //   );
  // };

  // Picker ties the dropdown style to the selected container style, which I don't want so I'm moving it off the screen.  This is Android only.

  return (
    <View>
      {Platform.OS === 'android' && (
        <View>
          {/* <TouchableOpacity
            onPress={open}
            style={{borderWidth: 3, borderColor: '#84c4ec', borderRadius: 30}}>
            <Text style={styles.textAbove}>{age}</Text>
          </TouchableOpacity> */}
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Age</Text>
          <View style={styles.inputContainer}>
            <Picker textColor="#84c4ec" textSize={60}>
              <PickerColumn
                selectedValue={age}
                onChange={event => setAge(event.value.toString())}>
                {ageOptions.map(ageValue => (
                  <PickerItem
                    label={ageValue.toString()}
                    value={ageValue.toString()}
                    key={ageValue}
                  />
                ))}
              </PickerColumn>
            </Picker>
          </View>
        </View>
      )}
      {Platform.OS === 'ios' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Age</Text>
          <View style={styles.inputContainer}>
            <Select
              selectedValue={age}
              itemStyle={styles.input}
              onValueChange={(itemAgeValue: string) => {
                setAge(itemAgeValue);
              }}>
              {ageOptions.map(ageValue => (
                <Select.Item
                  value={ageValue}
                  label={ageValue}
                  key={ageValue}
                  style={styles.input}
                />
              ))}
            </Select>
          </View>
        </View>
      )}

      <View style={styles.textContainer}>
        <HelperText
          style={{fontSize: 45, color: '#385a69'}}
          type="error"
          visible={hasErrors()}>
          {errorText}
        </HelperText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textAbove: {
    alignSelf: 'center',
    width: threeQuarterWidth,
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#84c4ec',
    fontSize: 93,
  },
  textBelow: {
    alignSelf: 'center',
    width: threeQuarterWidth,
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#84c4ec',
    fontSize: 125,
  },
  androidItemStyle: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '400',
    // backgroundColor: 'rgba(200, 2, 89, 0.0)',
    color: '#84c4ec',
    opacity: 0.5,
    borderRadius: 50,
    minWidth: threeQuarterWidth,
    padding: 12,
  },
  androidPickerItem: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '400',
    // backgroundColor: 'rgba(252, 210, 89, 0.3)',
    opacity: 0.5,
    color: '#84c4ec',
    borderRadius: 50,
    minWidth: threeQuarterWidth,
    padding: 12,
  },
  input: {
    textAlign: 'center',
    fontSize: 105,
    fontWeight: '400',
    color: '#84c4ec',
    borderRadius: 50,
    minWidth: threeQuarterWidth,
    padding: 12,
  },
  androidInputContainer: {
    // height: 130,
    alignSelf: 'center',
    borderWidth: 3,
    // backgroundColor: 'transparent',
    borderColor: '#84c4ec',
    minWidth: threeQuarterWidth,
    borderRadius: 30,
    bottom: -700,
  },
  inputContainer: {
    // height: 130,
    alignSelf: 'center',
    borderWidth: 3,
    // backgroundColor: 'transparent',
    borderColor: '#84c4ec',
    width: threeQuarterWidth,
    borderRadius: 30,
  },
  // USING in dropdown, font Size
  inputDropdown: {
    textAlign: 'center',
    fontSize: 35,
    // backgroundColor: 'transparent',
    color: '#84c4ec',
    borderRadius: 50,
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
  textContainer: {
    // Helper Text
    alignSelf: 'center',
    minWidth: threeQuarterWidth,
    height: 75,
  },
});

export default AgeSlide;
