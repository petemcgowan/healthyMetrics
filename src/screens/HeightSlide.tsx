import {Picker} from '@react-native-picker/picker';
import React, {useContext} from 'react';
import {StyleSheet, Platform, Text, View} from 'react-native';
import {HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import Utils from '../components/Utils';
import {actionCreators, State} from '../redux/index';
import ColourContext from '../state/ColourContext';

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
      // minWidth: 250,
      color: colourData[index].lightVibrant,
      // fontSize: 95,
      fontSize: Platform.OS === 'ios' ? 95 : 60,
    },
    textAbove: {
      alignSelf: 'center',
      // width: "auto",
      textAlign: 'center',
      minWidth: 100,
      color: colourData[index].lightVibrant,
      fontSize: 93,
    },
    textBelow: {
      alignSelf: 'center',
      // width: "auto",
      textAlign: 'center',
      minWidth: 100,
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
    //   minWidth: 150,
    //   padding: 10,
    // },
    feetContainer: {
      // height: 180,
      alignSelf: 'center',
      borderWidth: 3,
      minWidth: 170,
      borderRadius: 30,
      borderColor: colourData[index].lightVibrant,
    },
    inchesContainer: {
      // height: 180,
      alignSelf: 'center',
      borderWidth: 3,
      minWidth: 170,
      borderRadius: 30,
      borderColor: colourData[index].lightVibrant,
    },
    inputContainer: {
      // minWidth: 100,
      color: colourData[index].lightVibrant,
      fontSize: 105,

      // height: 180,
      alignSelf: 'center',
      borderWidth: 3,
      minWidth: 250,
      borderRadius: 30,
      borderColor: colourData[index].lightVibrant,
    },
  });
  return (
    <View>
      <Text style={dynamicStyles.textAbove}>Enter</Text>
      <Text style={dynamicStyles.textBelow}>Height</Text>
      {heightUnits === 'cm' && (
        <View style={dynamicStyles.inputContainer}>
          <Picker
            selectedValue={heightCm}
            itemStyle={dynamicStyles.heightEntry}
            style={dynamicStyles.heightEntry}
            onValueChange={(itemHeightCm, itemIndex) => {
              setHeightCm(itemHeightCm);
              console.log('itemHeightCm:' + itemHeightCm);
            }}>
            {Utils.selectionDropDownRange(100, 250).map(height => (
              <Picker.Item
                value={height.value}
                label={height.label}
                key={height.label}
                style={dynamicStyles.heightEntry}
              />
            ))}
          </Picker>
        </View>
      )}
      {heightUnits === 'Feet/Inches' && (
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <View style={dynamicStyles.feetContainer}>
            <Picker
              selectedValue={heightFt}
              itemStyle={dynamicStyles.heightEntry}
              onValueChange={(itemHeightFt, itemIndex) => {
                setHeightFt(itemHeightFt);
                console.log('itemHeightFt:' + itemHeightFt);
              }}>
              {Utils.selectionDropDownRange(3, 7).map(height => (
                <Picker.Item
                  value={height.value}
                  label={height.label}
                  key={height.label}
                  style={dynamicStyles.heightEntry}
                />
              ))}
            </Picker>
          </View>
          <View style={dynamicStyles.inchesContainer}>
            <Picker
              selectedValue={heightInches}
              // itemStyle={dynamicStyles.heightEntry}
              onValueChange={(itemHeightInches, itemIndex) => {
                setHeightInches(itemHeightInches);
                console.log('itemHeightInches:' + itemHeightInches);
              }}>
              {Utils.selectionDropDownRange(1, 12).map(height => (
                <Picker.Item
                  value={height.value}
                  label={height.label}
                  key={height.label}
                  style={dynamicStyles.heightEntry}
                />
              ))}
            </Picker>
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
