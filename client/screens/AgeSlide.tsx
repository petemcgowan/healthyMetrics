import React from 'react'
import { Picker as Select } from '@react-native-picker/picker'
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RFPercentage } from 'react-native-responsive-fontsize'

import { Picker, PickerColumn, PickerItem } from 'react-native-picky'

import Utils from '../components/Utils'
import { actionCreators, State } from '../redux/index'

const { width } = Dimensions.get('window')
const threeQuarterWidth = width * 0.75

const AgeSlide = () => {
  const ageOptions = Utils.selectionDropDownRange(18, 74).map(
    (age) => age.value
  )
  const age = useSelector((state: State) => state.age)
  const dispatch = useDispatch()
  const { setAge } = bindActionCreators(actionCreators, dispatch)

  return (
    <View>
      {Platform.OS === 'android' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Age</Text>
          <View style={styles.inputContainer}>
            <Picker textColor="#84c4ec" textSize={60}>
              <PickerColumn
                selectedValue={age}
                onChange={(event) => setAge(event.value.toString())}
              >
                {ageOptions.map((ageValue) => (
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
                setAge(itemAgeValue)
              }}
            >
              {ageOptions.map((ageValue) => (
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
    </View>
  )
}

const styles = StyleSheet.create({
  textAbove: {
    alignSelf: 'center',
    width: threeQuarterWidth,
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#84c4ec',
    fontWeight: '500',
    fontSize: RFPercentage(14),
  },
  textBelow: {
    alignSelf: 'center',
    width: threeQuarterWidth,
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#84c4ec',
    fontWeight: '500',
    fontSize: RFPercentage(18),
  },
  input: {
    textAlign: 'center',
    fontSize: RFPercentage(18),
    fontWeight: '400',
    color: '#84c4ec',
    borderRadius: 50,
    minWidth: threeQuarterWidth,
    padding: 12,
  },
  inputContainer: {
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#84c4ec',
    width: threeQuarterWidth,
    borderRadius: 30,
  },
})

export default AgeSlide
