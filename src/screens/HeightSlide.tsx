import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, Platform, Text, View, Dimensions} from 'react-native';
import {HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalDropdown from 'react-native-modal-dropdown';

import Utils from '../components/Utils';
import {actionCreators, State} from '../redux/index';

const {width} = Dimensions.get('window');
const threeQuarterWidth = width * 0.75;

const cmOptions = Utils.selectionDropDownRange(100, 250).map(cm => cm.value);
const ftOptions = Utils.selectionDropDownRange(3, 7).map(ft => ft.value);
const inchesOptions = Utils.selectionDropDownRange(1, 12).map(
  inches => inches.value,
);

interface HeightSlideProps {
  errorText: string;
}

const HeightSlide = ({errorText}: HeightSlideProps) => {
  const heightCm = useSelector((state: State) => state.heightCm);
  const heightFt = useSelector((state: State) => state.heightFt);
  const heightInches = useSelector((state: State) => state.heightInches);
  const heightUnits = useSelector((state: State) => state.heightUnits);

  const dispatch = useDispatch();
  const {setHeightCm} = bindActionCreators(actionCreators, dispatch);
  const {setHeightFt} = bindActionCreators(actionCreators, dispatch);
  const {setHeightInches} = bindActionCreators(actionCreators, dispatch);

  const hasErrors = () => {
    return heightCm === '';
  };

  const _dropdown_2_renderRow = rowData => {
    console.log('HeightSlide, _dropdown_2_renderRow called');
    return (
      <View style={styles.dropdown_2_row}>
        <Text style={styles.inputDropdown}>{`${rowData}`}</Text>
      </View>
    );
  };

  return (
    <View>
      {heightUnits === 'cm' && Platform.OS === 'android' && (
        <View>
          <View style={styles.inputContainer}>
            <ModalDropdown
              dropdownListProps={{}}
              defaultValue={heightCm}
              options={cmOptions}
              onSelect={(itemCmIndex: string) => {
                setHeightCm(cmOptions[itemCmIndex]);
              }}
              textStyle={styles.heightEntry} // this is the selection box
              renderRow={_dropdown_2_renderRow} // this is the dropdown style
            />
          </View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Height</Text>
        </View>
      )}
      {heightUnits === 'cm' && Platform.OS === 'ios' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Height</Text>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={heightCm}
              itemStyle={styles.heightEntry}
              style={styles.heightEntry}
              onValueChange={(itemHeightCm: string) => {
                setHeightCm(itemHeightCm);
              }}>
              {cmOptions.map(heightValue => (
                <Picker.Item
                  value={heightValue}
                  label={heightValue}
                  key={heightValue}
                  style={styles.heightEntry}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}
      {heightUnits === 'Feet/Inches' && Platform.OS === 'android' && (
        <View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={styles.feetContainer}>
              <ModalDropdown
                dropdownListProps={{}}
                defaultValue={heightFt}
                options={ftOptions}
                onSelect={itemFtIndex => {
                  setHeightFt(ftOptions[itemFtIndex]);
                }}
                textStyle={styles.heightEntry} // this is the selection box
                renderRow={_dropdown_2_renderRow} // this is the dropdown style
              />
            </View>
            <View style={styles.inchesContainer}>
              <ModalDropdown
                dropdownListProps={{}}
                defaultValue={heightInches}
                options={inchesOptions}
                onSelect={itemInchesIndex => {
                  setHeightInches(inchesOptions[itemInchesIndex]);
                }}
                textStyle={styles.heightEntry} // this is the selection box
                renderRow={_dropdown_2_renderRow} // this is the dropdown style
              />
            </View>
          </View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Height</Text>
        </View>
      )}
      {heightUnits === 'Feet/Inches' && Platform.OS === 'ios' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Height</Text>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={styles.feetContainer}>
              <Picker
                selectedValue={heightFt}
                itemStyle={styles.heightEntry}
                onValueChange={(itemHeightFt: string) => {
                  setHeightFt(itemHeightFt);
                }}>
                {ftOptions.map(heightValue => (
                  <Picker.Item
                    value={heightValue}
                    label={heightValue}
                    key={heightValue}
                    style={styles.heightEntry}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.inchesContainer}>
              <Picker
                selectedValue={heightInches}
                itemStyle={styles.heightEntry}
                onValueChange={(itemHeightInches: string) => {
                  setHeightInches(itemHeightInches);
                }}>
                {inchesOptions.map(heightValue => (
                  <Picker.Item
                    value={heightValue}
                    label={heightValue}
                    key={heightValue}
                    style={styles.heightEntry}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      )}

      <View>
        <HelperText
          style={{fontSize: 40, color: '#7de6fb'}}
          type="error"
          visible={hasErrors()}>
          {errorText}
        </HelperText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heightEntry: {
    // minWidth: threeQuarterWidth,
    // textAlign: 'center',
    color: '#7de6fb',
    // fontSize: 95,
    // alignItems: 'center',
    fontSize: 95,
  },
  textAbove: {
    alignSelf: 'center',
    // width: "auto",
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#7de6fb',
    fontSize: 93,
  },
  textBelow: {
    alignSelf: 'center',
    // width: "auto",
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#7de6fb',
    fontSize: 120,
  },
  feetContainer: {
    // height: 180,
    // alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 3,
    minWidth: 170,
    borderRadius: 30,
    borderColor: '#7de6fb',
  },
  inchesContainer: {
    // height: 180,
    // alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 3,
    minWidth: 170,
    borderRadius: 30,
    borderColor: '#7de6fb',
  },
  inputContainer: {
    // minWidth: 100,
    color: '#7de6fb',
    // alignItems: 'center',
    fontSize: 105,
    // textAlign: 'center',

    // height: 180,
    alignSelf: 'center',
    borderWidth: 3,
    minWidth: threeQuarterWidth,
    borderRadius: 30,
    borderColor: '#7de6fb',
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
    color: '#7de6fb',
    borderRadius: 50,
    // backgroundColor: 'pink',
    minWidth: threeQuarterWidth,
    padding: 12,
  },
});

export default HeightSlide;
