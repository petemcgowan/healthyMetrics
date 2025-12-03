import React from 'react'
import {Picker as Select} from '@react-native-picker/picker'

import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
// import { Picker, PickerColumn, PickerItem } from 'react-native-picky'
import {RFPercentage} from 'react-native-responsive-fontsize'
import Utils from '../components/Utils'
import {actionCreators, State} from '../redux/index'

const {width, height} = Dimensions.get('window')
const threeQuarterWidth = width * 0.65

const poundsOnlyOptions = Utils.selectionDropDownRange(100, 260).map(
  pound => pound.value,
)
const stoneOptions = Utils.selectionDropDownRange(5, 25).map(
  stone => stone.value,
)
const stonePoundOptions = Utils.selectionDropDownRange(0, 13).map(
  stone => stone.value,
)
const kgOptions = Utils.selectionDropDownRange(40, 160).map(kg => kg.value)

interface WeightSlideProps {
  handleCalculate: any
}

const WeightSlide = ({handleCalculate}: WeightSlideProps) => {
  const weightPoundsOnly = useSelector((state: State) => state.weightPoundsOnly)
  const weightPounds = useSelector((state: State) => state.weightPounds)
  const weightStones = useSelector((state: State) => state.weightStones)
  const weightUnits = useSelector((state: State) => state.weightUnits)
  const weightKg = useSelector((state: State) => state.weightKg)

  const dispatch = useDispatch()
  const {setWeightPounds, setWeightPoundsOnly, setWeightStones, setWeightKg} =
    bindActionCreators(actionCreators, dispatch)

  return (
    <View>
      {weightUnits === 'Pounds' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
          <View style={styles.inputParentContainer}>
            <View style={styles.inputContainer}>
              <Select
                selectedValue={weightPoundsOnly}
                itemStyle={styles.weightEntry}
                onValueChange={(itemPoundsOnly: string) => {
                  setWeightPoundsOnly(itemPoundsOnly)
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
        </View>
      )}
      {weightUnits === 'Stones/Pounds' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
          <View style={styles.inputParentContainer}>
            <View style={[styles.inputContainer, {width: width * 0.47}]}>
              <Select
                selectedValue={weightStones}
                itemStyle={[styles.weightEntry, {width: width * 0.47}]}
                onValueChange={(itemWeightStones: string) => {
                  setWeightStones(itemWeightStones)
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
            <View style={[styles.inputContainer, {width: width * 0.47}]}>
              <Select
                selectedValue={weightPounds}
                itemStyle={[styles.weightEntry, {width: width * 0.47}]}
                onValueChange={(itemWeightPounds: string) => {
                  setWeightPounds(itemWeightPounds)
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
      {weightUnits === 'kg' && (
        <View>
          <Text style={styles.textAbove}>Enter</Text>
          <Text style={styles.textBelow}>Weight</Text>
          <View style={styles.inputParentContainer}>
            <View style={styles.inputContainer}>
              <Select
                selectedValue={weightKg}
                itemStyle={styles.weightEntry}
                onValueChange={(itemKg: string) => {
                  setWeightKg(itemKg)
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
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calculate </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  textAbove: {
    marginTop: height * 0.11,
    alignSelf: 'center',
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#8ac4e4',
    fontWeight: '500',
    fontSize: RFPercentage(11),
  },
  textBelow: {
    alignSelf: 'center',
    textAlign: 'center',
    minWidth: 100,
    color: '#8ac4e4',
    fontWeight: '500',
    fontSize: RFPercentage(12),
    marginBottom: height * 0.015,
  },
  weightEntry: {
    // textAlign: 'center',
    fontWeight: '500',
    fontSize: RFPercentage(11),
    color: '#84c4ec',
    width: threeQuarterWidth,
  },
  inputParentContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 30,
    borderColor: '#84c4ec',
    paddingLeft: Platform.OS === 'android' ? 20 : 1,
    width: threeQuarterWidth,
  },
  buttonText: {
    alignSelf: 'center',
    padding: 20,
    fontSize: RFPercentage(6.5),
    color: '#84c4ec',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#84c4ec',
    backgroundColor: '#e4bc94',
    marginTop: height * 0.03,
  },
})

export default WeightSlide
