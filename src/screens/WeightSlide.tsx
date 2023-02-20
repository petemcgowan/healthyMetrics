import React, {useMemo} from 'react';
import {Picker as Select} from '@react-native-picker/picker';
import {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  // TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import {HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
// import ModalDropdown from 'react-native-modal-dropdown';
import {Picker, PickerColumn, PickerItem} from 'react-native-picky';

import Utils from '../components/Utils';
import {actionCreators, State} from '../redux/index';

const {width, height} = Dimensions.get('window');
const threeQuarterWidth = width * 0.75;

const poundsOnlyOptions = Utils.selectionDropDownRange(100, 260).map(
  pound => pound.value,
);
const stoneOptions = Utils.selectionDropDownRange(5, 25).map(
  stone => stone.value,
);
const stonePoundOptions = Utils.selectionDropDownRange(0, 13).map(
  stone => stone.value,
);
const kgOptions = Utils.selectionDropDownRange(40, 160).map(kg => kg.value);

interface WeightSlideProps {
  handleCalculate: any;
  errorText: string;
}

const WeightSlide = ({handleCalculate, errorText}: WeightSlideProps) => {
  const weightPoundsOnly = useSelector(
    (state: State) => state.weightPoundsOnly,
  );
  const weightPounds = useSelector((state: State) => state.weightPounds);
  const weightStones = useSelector((state: State) => state.weightStones);
  const weightUnits = useSelector((state: State) => state.weightUnits);
  const weightKg = useSelector((state: State) => state.weightKg);

  const dispatch = useDispatch();
  const {setWeightPounds, setWeightPoundsOnly, setWeightStones, setWeightKg} =
    bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    console.log('WeightSlide, useEffect:');
  }, [errorText]);

  // const hasErrors = () => {
  //   return weightPounds === '';
  // };

  // const _dropdown_2_renderRow = rowData => {
  //   console.log('WeightSlide, _dropdown_2_renderRow called');
  //   return (
  //     // <TouchableHighlight>
  //     <View style={styles.dropdown_2_row}>
  //       <Text style={styles.inputDropdown}>{`${rowData}`}</Text>
  //     </View>
  //     // </TouchableHighlight>
  //   );
  // };
  console.log('weightPoundsOnly:' + weightPoundsOnly);
  console.log('weightKg:' + weightKg);
  console.log('kgOptions:' + kgOptions);
  // console.log('poundsOnlyOptions:' + JSON.stringify(poundsOnlyOptions));

  return (
    <View>
      {weightUnits === 'Pounds' && Platform.OS === 'ios' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
          <View style={[styles.inputContainer, {width: width}]}>
            <Select
              selectedValue={weightPoundsOnly}
              itemStyle={[styles.weightEntry, {width: width}]}
              onValueChange={(itemPoundsOnly: string) => {
                setWeightPoundsOnly(itemPoundsOnly);
                if (itemPoundsOnly !== '') {
                  errorText = '';
                }
              }}>
              {poundsOnlyOptions.map(weightValue => (
                <Select.Item
                  value={weightValue}
                  label={weightValue}
                  key={weightValue}
                  style={styles.weightEntry}
                />
              ))}
            </Select>
          </View>
        </View>
      )}
      {weightUnits === 'Pounds' && Platform.OS === 'android' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
          <View style={[styles.inputContainer, {width: width}]}>
            <Picker textColor="#7de6fb" textSize={60}>
              <PickerColumn
                selectedValue={weightPoundsOnly}
                onChange={event => setWeightPoundsOnly(event.value.toString())}>
                {poundsOnlyOptions.map(poundsOnlyValue => (
                  <PickerItem
                    label={poundsOnlyValue.toString()}
                    value={poundsOnlyValue.toString()}
                    key={poundsOnlyValue}
                  />
                ))}
              </PickerColumn>
            </Picker>
          </View>
        </View>
      )}
      {weightUnits === 'Stones/Pounds' && Platform.OS === 'android' && (
        <View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View
              style={[
                styles.inputContainer,
                {width: width * 0.45, height: height * 0.35},
              ]}>
              <Picker textColor="#8ac4e4" textSize={width < 380 ? 53 : 60}>
                <PickerColumn
                  selectedValue={weightStones}
                  onChange={event => setWeightPounds(event.value.toString())}>
                  {stoneOptions.map(stoneValue => (
                    <PickerItem
                      label={stoneValue.toString()}
                      value={stoneValue.toString()}
                      key={stoneValue}
                    />
                  ))}
                </PickerColumn>
              </Picker>
            </View>
            <View
              style={[
                styles.inputContainer,
                {width: width * 0.45, height: height * 0.35},
              ]}>
              <Picker textColor="#8ac4e4" textSize={width < 380 ? 53 : 60}>
                <PickerColumn
                  selectedValue={weightPounds}
                  onChange={event => setWeightPounds(event.value.toString())}>
                  {stonePoundOptions.map(poundValue => (
                    <PickerItem
                      label={poundValue.toString()}
                      value={poundValue.toString()}
                      key={poundValue}
                    />
                  ))}
                </PickerColumn>
              </Picker>
            </View>
          </View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
        </View>
      )}
      {weightUnits === 'Stones/Pounds' && Platform.OS === 'ios' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={[styles.inputContainer, {width: width / 2}]}>
              <Select
                selectedValue={weightStones}
                itemStyle={[styles.weightEntry, {width: width / 2}]}
                onValueChange={(itemWeightStones: string) => {
                  setWeightStones(itemWeightStones);
                  if (itemWeightStones !== '') {
                    errorText = '';
                  }
                }}>
                {stoneOptions.map(weightValue => (
                  <Select.Item
                    value={weightValue}
                    label={weightValue}
                    key={weightValue}
                    style={styles.weightEntry}
                  />
                ))}
              </Select>
            </View>
            <View style={[styles.inputContainer, {width: width / 2}]}>
              <Select
                selectedValue={weightPounds}
                itemStyle={[styles.weightEntry, {width: width / 2}]}
                onValueChange={(itemWeightPounds: string) => {
                  setWeightPounds(itemWeightPounds);
                  if (itemWeightPounds !== '') {
                    errorText = '';
                  }
                }}>
                {stonePoundOptions.map(weightPound => (
                  <Select.Item
                    value={weightPound}
                    label={weightPound}
                    key={weightPound}
                    style={styles.weightEntry}
                  />
                ))}
              </Select>
            </View>
          </View>
        </View>
      )}
      {weightUnits === 'kg' && Platform.OS === 'android' && (
        <View>
          <View style={styles.inputContainer}>
            <Picker textColor="#8ac4e4" textSize={width < 380 ? 50 : 60}>
              <PickerColumn
                selectedValue={weightKg}
                onChange={event => setWeightKg(event.value.toString())}>
                {kgOptions.map(kgValue => (
                  <PickerItem
                    label={kgValue.toString()}
                    value={kgValue.toString()}
                    key={kgValue}
                  />
                ))}
              </PickerColumn>
            </Picker>
          </View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
        </View>
      )}
      {weightUnits === 'kg' && Platform.OS === 'ios' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
          <View style={[styles.inputContainer, {width: width}]}>
            <Select
              selectedValue={weightKg}
              itemStyle={styles.weightEntry}
              onValueChange={(itemKg: string) => {
                setWeightKg(itemKg);
                // if (itemKg !== '') {
                //   errorText = '';
                // }
              }}>
              {kgOptions.map(kgValue => (
                <Select.Item
                  value={kgValue}
                  label={kgValue}
                  key={kgValue}
                  style={styles.weightEntry}
                />
              ))}
            </Select>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calculate </Text>
      </TouchableOpacity>
      {/* <View>
        <HelperText
          style={{fontSize: 35, color: '#404239'}}
          type="error"
          visible={hasErrors()}>
          {errorText}
        </HelperText>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  textAbove: {
    alignSelf: 'center',
    // width: "auto",
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#8ac4e4',
    // fontSize: 90,
    fontSize: width < 380 ? 73 : 88,
  },
  textBelow: {
    alignSelf: 'center',
    // width: "auto",
    textAlign: 'center',
    minWidth: 100,
    color: '#8ac4e4',
    // fontSize: 120,
    fontSize: width < 380 ? 85 : 98,
  },
  stonesPounds: {
    width: width / 2,
    fontSize: width < 380 ? 60 : 70,
    // borderWidth: 3,
    // borderRadius: 30,
    // borderColor: '#84c4ec',
  },
  dropdown_2_row: {
    // USING in dropdown, background color
    flexDirection: 'row',
    backgroundColor: 'transparent',
    // height: 40,
    alignItems: 'center',
  },
  weightEntry: {
    // height: 115,
    textAlign: 'center',
    fontSize: width < 380 ? 75 : 95,
    color: '#84c4ec',
    // minWidth: 190,
    // padding: 20,
  },
  inputContainer: {
    // height: 115,
    // alignItems: 'center',
    borderWidth: 3,
    borderRadius: 30,
    borderColor: '#84c4ec',
  },
  buttonText: {
    alignSelf: 'center',
    padding: 20,
    fontSize: 45,
    color: '#84c4ec',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#84c4ec',
    backgroundColor: '#e4bc94',
    marginTop: 20,
    // marginBottom: height * 0.1,
  },
  // USING in dropdown, font Size
  inputDropdown: {
    textAlign: 'center',
    fontSize: 35,
    backgroundColor: 'transparent',
    color: '#84c4ec',
    borderRadius: 50,
    // backgroundColor: 'pink',
    minWidth: threeQuarterWidth,
    padding: 12,
  },
});

export default WeightSlide;
