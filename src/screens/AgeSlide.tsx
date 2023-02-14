import React, {useMemo, useRef} from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import {HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
// import ModalDropdown from 'react-native-modal-dropdown';
// import SimplePicker from 'react-native-simple-picker';

import Utils from '../components/Utils';
import {actionCreators, State} from '../redux/index';

const {width} = Dimensions.get('window');
const threeQuarterWidth = width * 0.75;

interface AgeSlideProps {
  errorText: string;
}

const AgeSlide = ({errorText}: AgeSlideProps) => {
  const ageOptions = Utils.selectionDropDownRange(24, 79).map(age => age.value);

  const age = useSelector((state: State) => state.age);
  const dispatch = useDispatch();
  const {setAge} = bindActionCreators(actionCreators, dispatch);
  // const pickerRef = useRef(null);

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

  return (
    <View>
      {Platform.OS === 'android' && (
        <View>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={age}
              itemStyle={styles.androidItemStyle}
              onValueChange={(itemAgeValue: string) => {
                setAge(itemAgeValue);
              }}>
              {ageOptions.map(ageValue => (
                <Picker.Item
                  value={ageValue}
                  label={ageValue}
                  key={ageValue}
                  style={styles.androidInput}
                />
              ))}
            </Picker>
            {/* <ModalDropdown
              dropdownListProps={{}}
              defaultValue={age}
              options={ageOptions}
              onSelect={itemIndex => {
                setAge(ageOptions[itemIndex]);
              }}
              textStyle={styles.input} // this is the selection box
              // renderRow={memoizedValue} // this is the dropdown style
            /> */}
          </View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Age</Text>
        </View>
      )}
      {Platform.OS === 'ios' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Age</Text>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={age}
              itemStyle={styles.input}
              onValueChange={(itemAgeValue: string) => {
                setAge(itemAgeValue);
              }}>
              {ageOptions.map(ageValue => (
                <Picker.Item
                  value={ageValue}
                  label={ageValue}
                  key={ageValue}
                  style={styles.input}
                />
              ))}
            </Picker>
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

  androidInput: {
    textAlign: 'center',
    fontSize: 40,
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
  inputContainer: {
    // height: 130,
    alignSelf: 'center',
    borderWidth: 3,
    // backgroundColor: 'transparent',
    borderColor: '#84c4ec',
    minWidth: threeQuarterWidth,
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
