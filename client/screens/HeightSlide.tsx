import React from 'react'
import {Picker as Select} from '@react-native-picker/picker'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {bindActionCreators} from 'redux'
// import { Picker, PickerColumn, PickerItem } from 'react-native-picky'
import Utils from '../components/Utils'
import {actionCreators, State} from '../redux/index'

const {width, height} = Dimensions.get('window')
const threeQuarterWidth = width * 0.7

const cmOptions = Utils.selectionDropDownRange(100, 250).map(cm => cm.value)
const ftOptions = Utils.selectionDropDownRange(3, 7).map(ft => ft.value)
const inchesOptions = Utils.selectionDropDownRange(0, 11).map(
  inches => inches.value,
)

const HeightSlide = () => {
  const {heightCm, heightFt, heightInches, heightUnits} = useSelector(
    (state: State) => ({
      heightCm: state.heightCm,
      heightFt: state.heightFt,
      heightInches: state.heightInches,
      heightUnits: state.heightUnits,
    }),
    shallowEqual,
  )

  const dispatch = useDispatch()
  const {setHeightCm, setHeightFt, setHeightInches} = bindActionCreators(
    actionCreators,
    dispatch,
  )

  return (
    <View>
      {heightUnits === 'cm' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Height</Text>
          <View style={styles.inputContainer}>
            <Select
              selectedValue={heightCm}
              itemStyle={styles.heightEntry}
              style={styles.heightEntry}
              onValueChange={(itemHeightCm: string) => {
                setHeightCm(itemHeightCm)
              }}>
              {cmOptions.map(heightValue => (
                <Select.Item
                  value={heightValue}
                  label={heightValue}
                  key={heightValue}
                  style={styles.heightEntry}
                />
              ))}
            </Select>
          </View>
        </View>
      )}
      {heightUnits === 'Feet/Inches' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Height</Text>
          <View style={styles.centralContainer}>
            <View style={styles.feetContainer}>
              <Select
                selectedValue={heightFt}
                itemStyle={styles.heightEntry}
                onValueChange={(itemHeightFt: string) => {
                  setHeightFt(itemHeightFt)
                }}>
                {ftOptions.map(heightValue => (
                  <Select.Item
                    value={heightValue}
                    label={heightValue}
                    key={heightValue}
                    style={styles.heightEntry}
                  />
                ))}
              </Select>
            </View>
            <View style={styles.inchesContainer}>
              <Select
                selectedValue={heightInches}
                itemStyle={styles.heightEntry}
                onValueChange={(itemHeightInches: string) => {
                  setHeightInches(itemHeightInches)
                }}>
                {inchesOptions.map(heightValue => (
                  <Select.Item
                    value={heightValue}
                    label={heightValue}
                    key={heightValue}
                    style={styles.heightEntry}
                  />
                ))}
              </Select>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  centralContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  heightEntry: {
    color: '#7de6fb',
    fontSize: RFPercentage(12.5),
  },
  textAbove: {
    marginTop: height * 0.12,
    alignSelf: 'center',
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#7de6fb',
    fontSize: RFPercentage(11),
  },
  textBelow: {
    alignSelf: 'center',
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#7de6fb',
    fontSize: RFPercentage(12),
    marginBottom: 10,
  },
  feetContainer: {
    alignSelf: 'center',
    borderWidth: 3,
    width: width / 2,
    borderRadius: 30,
    borderColor: '#7de6fb',
  },
  inchesContainer: {
    alignSelf: 'center',
    borderWidth: 3,
    width: width / 2,
    borderRadius: 30,
    borderColor: '#7de6fb',
  },
  inputContainer: {
    color: '#7de6fb',
    paddingLeft: Platform.OS === 'android' ? 20 : 1,
    alignSelf: 'center',
    borderWidth: 3,
    width: threeQuarterWidth,
    borderRadius: 30,
    borderColor: '#7de6fb',
  },
})

export default HeightSlide
