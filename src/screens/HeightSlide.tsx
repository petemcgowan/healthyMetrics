import {Picker} from '@react-native-picker/picker';
import React, {useContext} from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import ModalDropdown from 'react-native-modal-dropdown';

import Utils from '../components/Utils';
import {actionCreators, State} from '../redux/index';
import ColourContext from '../state/ColourContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
const threeQuarterWidth = width * 0.75;

const cmOptions = Utils.selectionDropDownRange(100, 250).map(cm => cm.value);
const ftOptions = Utils.selectionDropDownRange(3, 7).map(ft => ft.value);
const inchesOptions = Utils.selectionDropDownRange(1, 12).map(
  inches => inches.value,
);

const HeightSlide = ({errorText}) => {
  const {colourData, index} = useContext(ColourContext);
  const heightCm = useSelector((state: State) => state.heightCm);
  const heightFt = useSelector((state: State) => state.heightFt);
  const heightInches = useSelector((state: State) => state.heightInches);
  const heightUnits = useSelector((state: State) => state.heightUnits);

  console.log(
    'HeightSlide: heightCm:' +
      heightCm +
      ', heightFt:' +
      heightFt +
      ', heightInches:' +
      heightInches,
  );
  const dispatch = useDispatch();
  const {setHeightCm} = bindActionCreators(actionCreators, dispatch);
  const {setHeightFt} = bindActionCreators(actionCreators, dispatch);
  const {setHeightInches} = bindActionCreators(actionCreators, dispatch);

  const hasErrors = () => {
    return heightCm === '';
  };

  const dynamicStyles = StyleSheet.create({
    heightEntry: {
      // minWidth: threeQuarterWidth,
      // textAlign: 'center',
      color: colourData[index].lightVibrant,
      // fontSize: 95,
      // alignItems: 'center',
      fontSize: 95,
    },
    textAbove: {
      alignSelf: 'center',
      // width: "auto",
      textAlign: 'center',
      minWidth: threeQuarterWidth,
      color: colourData[index].lightVibrant,
      fontSize: 93,
    },
    textBelow: {
      alignSelf: 'center',
      // width: "auto",
      textAlign: 'center',
      minWidth: threeQuarterWidth,
      color: colourData[index].lightVibrant,
      fontSize: 120,
    },
    // input: {
    //   height: 110,
    //   width: "auto",
    //   textAlign: "center",
    //   fontSize: 120,
    //   margin: 10,
    //   color: colourData[index].lightVibrant,
    //   minWidth: threeQuarterWidth,
    //   padding: 10,
    // },
    feetContainer: {
      // height: 180,
      // alignItems: 'center',
      alignSelf: 'center',
      borderWidth: 3,
      minWidth: 170,
      borderRadius: 30,
      borderColor: colourData[index].lightVibrant,
    },
    inchesContainer: {
      // height: 180,
      // alignItems: 'center',
      alignSelf: 'center',
      borderWidth: 3,
      minWidth: 170,
      borderRadius: 30,
      borderColor: colourData[index].lightVibrant,
    },
    inputContainer: {
      // minWidth: 100,
      color: colourData[index].lightVibrant,
      // alignItems: 'center',
      fontSize: 105,
      // textAlign: 'center',

      // height: 180,
      alignSelf: 'center',
      borderWidth: 3,
      minWidth: threeQuarterWidth,
      borderRadius: 30,
      borderColor: colourData[index].lightVibrant,
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
      <View style={dynamicStyles.dropdown_2_row}>
        <Text style={dynamicStyles.inputDropdown}>{`${rowData}`}</Text>
      </View>
    );
  };

  return (
    <View>
      {heightUnits === 'cm' && Platform.OS === 'android' && (
        <View>
          <View style={dynamicStyles.inputContainer}>
            <ModalDropdown
              defaultValue={heightCm}
              options={cmOptions}
              onSelect={(itemCmIndex: string) => {
                console.log('itemCmIndex:' + itemCmIndex);
                setHeightCm(cmOptions[itemCmIndex]);
              }}
              textStyle={dynamicStyles.heightEntry} // this is the selection box
              renderRow={_dropdown_2_renderRow} // this is the dropdown style
            />
          </View>
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Height</Text>
        </View>
      )}
      {heightUnits === 'cm' && Platform.OS === 'ios' && (
        <View>
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Height</Text>
          <View style={dynamicStyles.inputContainer}>
            <Picker
              selectedValue={heightCm}
              itemStyle={dynamicStyles.heightEntry}
              style={dynamicStyles.heightEntry}
              onValueChange={(itemHeightCm: string) => {
                setHeightCm(itemHeightCm);
                console.log('itemHeightCm:' + itemHeightCm);
              }}>
              {cmOptions.map(heightValue => (
                <Picker.Item
                  value={heightValue}
                  label={heightValue}
                  key={heightValue}
                  style={dynamicStyles.heightEntry}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}
      {heightUnits === 'Feet/Inches' && Platform.OS === 'android' && (
        <View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={dynamicStyles.feetContainer}>
              <ModalDropdown
                defaultValue={heightFt}
                options={ftOptions}
                onSelect={itemFtIndex => {
                  console.log('itemFtIndex:' + itemFtIndex);
                  setHeightFt(ftOptions[itemFtIndex]);
                }}
                textStyle={dynamicStyles.heightEntry} // this is the selection box
                renderRow={_dropdown_2_renderRow} // this is the dropdown style
              />
            </View>
            <View style={dynamicStyles.inchesContainer}>
              <ModalDropdown
                defaultValue={heightInches}
                options={inchesOptions}
                onSelect={itemInchesIndex => {
                  console.log('itemInchesIndex:' + itemInchesIndex);
                  setHeightInches(inchesOptions[itemInchesIndex]);
                }}
                textStyle={dynamicStyles.heightEntry} // this is the selection box
                renderRow={_dropdown_2_renderRow} // this is the dropdown style
              />
            </View>
          </View>
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Height</Text>
        </View>
      )}
      {heightUnits === 'Feet/Inches' && Platform.OS === 'ios' && (
        <View>
          {/* <TouchableOpacity
            style={{width: width, height: 100}}
            onPress={() => {
              console.log('onPress');
              ///TEMP
              setHeightCm('150');
              setHeightFt('5');
              setHeightInches('11');
            }}></TouchableOpacity> */}
          <Text style={dynamicStyles.textAbove}>Enter</Text>
          <Text style={dynamicStyles.textBelow}>Height</Text>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={dynamicStyles.feetContainer}>
              <Picker
                selectedValue={heightFt}
                itemStyle={dynamicStyles.heightEntry}
                onValueChange={(itemHeightFt: string) => {
                  setHeightFt(itemHeightFt);
                  console.log('itemHeightFt:' + itemHeightFt);
                }}>
                {ftOptions.map(heightValue => (
                  <Picker.Item
                    value={heightValue}
                    label={heightValue}
                    key={heightValue}
                    style={dynamicStyles.heightEntry}
                  />
                ))}
              </Picker>
            </View>
            <View style={dynamicStyles.inchesContainer}>
              <Picker
                selectedValue={heightInches}
                itemStyle={dynamicStyles.heightEntry}
                onValueChange={(itemHeightInches: string) => {
                  setHeightInches(itemHeightInches);
                  console.log('itemHeightInches:' + itemHeightInches);
                }}>
                {inchesOptions.map(heightValue => (
                  <Picker.Item
                    value={heightValue}
                    label={heightValue}
                    key={heightValue}
                    style={dynamicStyles.heightEntry}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      )}

      <View>
        <HelperText
          style={{fontSize: 40, color: colourData[index].lightVibrant}}
          type="error"
          visible={hasErrors()}>
          {errorText}
        </HelperText>
      </View>
    </View>
  );
};

export default HeightSlide;
