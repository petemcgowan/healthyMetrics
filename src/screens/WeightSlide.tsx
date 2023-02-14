import React, {useMemo} from 'react';
import {Picker} from '@react-native-picker/picker';
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
import {HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalDropdown from 'react-native-modal-dropdown';

import Utils from '../components/Utils';
import {actionCreators, State} from '../redux/index';

const {width} = Dimensions.get('window');
const threeQuarterWidth = width * 0.75;

const poundOptions = Utils.selectionDropDownRange(100, 260).map(
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
  const weightPounds = useSelector((state: State) => state.weightPounds);
  const weightStones = useSelector((state: State) => state.weightStones);
  const weightUnits = useSelector((state: State) => state.weightUnits);
  const weightKg = useSelector((state: State) => state.weightKg);

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

  const _dropdown_2_renderRow = rowData => {
    console.log('WeightSlide, _dropdown_2_renderRow called');
    return (
      // <TouchableHighlight>
      <View style={styles.dropdown_2_row}>
        <Text style={styles.inputDropdown}>{`${rowData}`}</Text>
      </View>
      // </TouchableHighlight>
    );
  };

  return (
    <View>
      {weightUnits === 'Pounds' && Platform.OS === 'android' && (
        <View>
          <View style={styles.inputContainer}>
            <ModalDropdown
              dropdownListProps={{}}
              defaultValue={weightPounds}
              options={poundOptions}
              onSelect={itemPoundsIndex => {
                setWeightPounds(poundOptions[itemPoundsIndex]);
              }}
              textStyle={styles.weightEntry} // this is the selection box
              renderRow={_dropdown_2_renderRow} // this is the dropdown style
            />
          </View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
        </View>
      )}
      {weightUnits === 'Pounds' && Platform.OS === 'ios' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={weightPounds}
              itemStyle={styles.weightEntry}
              onValueChange={(itemWeightPounds: string) => {
                setWeightPounds(itemWeightPounds);
                if (itemWeightPounds !== '') {
                  errorText = '';
                }
              }}>
              {poundOptions.map(weightValue => (
                <Picker.Item
                  value={weightValue}
                  label={weightValue}
                  key={weightValue}
                  style={styles.weightEntry}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}
      {weightUnits === 'Stones/Pounds' && Platform.OS === 'android' && (
        <View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={styles.inputContainer}>
              <ModalDropdown
                dropdownListProps={{}}
                defaultValue={weightStones}
                options={stoneOptions}
                onSelect={itemStonesIndex => {
                  setWeightStones(stoneOptions[itemStonesIndex]);
                }}
                textStyle={styles.weightEntry} // this is the selection box
                renderRow={_dropdown_2_renderRow} // this is the dropdown style
              />
            </View>
            <View style={styles.inputContainer}>
              <ModalDropdown
                dropdownListProps={{}}
                defaultValue={weightPounds}
                options={poundOptions}
                onSelect={itemPoundsIndex => {
                  setWeightPounds(stonePoundOptions[itemPoundsIndex]);
                }}
                textStyle={styles.weightEntry} // this is the selection box
                renderRow={_dropdown_2_renderRow} // this is the dropdown style
              />
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
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={weightStones}
                itemStyle={[styles.weightEntry, styles.stonesPounds]}
                onValueChange={(itemWeightStones: string) => {
                  setWeightStones(itemWeightStones);
                  if (itemWeightStones !== '') {
                    errorText = '';
                  }
                }}>
                {stoneOptions.map(weightValue => (
                  <Picker.Item
                    value={weightValue}
                    label={weightValue}
                    key={weightValue}
                    style={styles.weightEntry}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={weightPounds}
                itemStyle={[styles.weightEntry, styles.stonesPounds]}
                onValueChange={(itemWeightPounds: string) => {
                  setWeightPounds(itemWeightPounds);
                  if (itemWeightPounds !== '') {
                    errorText = '';
                  }
                }}>
                {stonePoundOptions.map(weightPound => (
                  <Picker.Item
                    value={weightPound}
                    label={weightPound}
                    key={weightPound}
                    style={styles.weightEntry}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      )}
      {weightUnits === 'kg' && Platform.OS === 'android' && (
        <View>
          <View style={styles.inputContainer}>
            <ModalDropdown
              dropdownListProps={{}}
              defaultValue={weightKg}
              options={kgOptions}
              onSelect={(itemKgIndex: string) => {
                setWeightKg(kgOptions[itemKgIndex]);
              }}
              textStyle={styles.weightEntry} // this is the selection box
              renderRow={_dropdown_2_renderRow} // this is the dropdown style
            />
          </View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
        </View>
      )}
      {weightUnits === 'kg' && Platform.OS === 'ios' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={weightKg}
              itemStyle={styles.weightEntry}
              onValueChange={(itemWeightKg: string) => {
                setWeightKg(itemWeightKg);
                if (itemWeightKg !== '') {
                  errorText = '';
                }
              }}>
              {kgOptions.map(kgValue => (
                <Picker.Item
                  value={kgValue}
                  label={kgValue}
                  key={kgValue}
                  style={styles.weightEntry}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}
      <View>
        <HelperText
          style={{fontSize: 35, color: '#404239'}}
          type="error"
          visible={hasErrors()}>
          {errorText}
        </HelperText>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calculate </Text>
      </TouchableOpacity>
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
    fontSize: width < 450 ? 75 : 90,
  },
  textBelow: {
    alignSelf: 'center',
    // width: "auto",
    textAlign: 'center',
    minWidth: 100,
    color: '#8ac4e4',
    // fontSize: 120,
    fontSize: width < 450 ? 100 : 120,
  },
  stonesPounds: {
    minWidth: 180,
    fontSize: width < 450 ? 60 : 70,
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
    fontSize: 95,
    color: '#84c4ec',
    minWidth: 190,
    // padding: 20,
  },
  inputContainer: {
    // height: 115,
    alignItems: 'center',
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
    marginBottom: 80,
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
