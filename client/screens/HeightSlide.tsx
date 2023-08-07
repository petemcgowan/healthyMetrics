import React from 'react'
import { Picker as Select } from '@react-native-picker/picker'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { StyleSheet, Platform, Text, View, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Picker, PickerColumn, PickerItem } from 'react-native-picky'
import Utils from '../components/Utils'
import { actionCreators, State } from '../redux/index'

const { width } = Dimensions.get('window')
const threeQuarterWidth = width * 0.85

const cmOptions = Utils.selectionDropDownRange(100, 250).map((cm) => cm.value)
const ftOptions = Utils.selectionDropDownRange(3, 7).map((ft) => ft.value)
const inchesOptions = Utils.selectionDropDownRange(0, 11).map(
  (inches) => inches.value
)

const HeightSlide = () => {
  const heightCm = useSelector((state: State) => state.heightCm)
  const heightFt = useSelector((state: State) => state.heightFt)
  const heightInches = useSelector((state: State) => state.heightInches)
  const heightUnits = useSelector((state: State) => state.heightUnits)

  const dispatch = useDispatch()
  const { setHeightCm } = bindActionCreators(actionCreators, dispatch)
  const { setHeightFt } = bindActionCreators(actionCreators, dispatch)
  const { setHeightInches } = bindActionCreators(actionCreators, dispatch)

  return (
    <View>
      {heightUnits === 'cm' && Platform.OS === 'android' && (
        <View>
          <View style={styles.inputContainer}>
            <Picker textColor="#7de6fb" textSize={60}>
              <PickerColumn
                selectedValue={heightCm}
                onChange={(event) => setHeightCm(event.value.toString())}
              >
                {cmOptions.map((cmValue) => (
                  <PickerItem
                    label={cmValue.toString()}
                    value={cmValue.toString()}
                    key={cmValue}
                  />
                ))}
              </PickerColumn>
            </Picker>
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
            <Select
              selectedValue={heightCm}
              itemStyle={styles.heightEntry}
              style={styles.heightEntry}
              onValueChange={(itemHeightCm: string) => {
                setHeightCm(itemHeightCm)
              }}
            >
              {cmOptions.map((heightValue) => (
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
      {heightUnits === 'Feet/Inches' && Platform.OS === 'android' && (
        <View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <View style={styles.feetContainer}>
              <Picker textColor="#7de6fb" textSize={60}>
                <PickerColumn
                  selectedValue={heightFt}
                  onChange={(event) => setHeightFt(event.value.toString())}
                >
                  {ftOptions.map((ftValue) => (
                    <PickerItem
                      label={ftValue.toString()}
                      value={ftValue.toString()}
                      key={ftValue}
                    />
                  ))}
                </PickerColumn>
              </Picker>
            </View>
            <View style={styles.inchesContainer}>
              <Picker textColor="#7de6fb" textSize={50}>
                <PickerColumn
                  selectedValue={heightInches}
                  onChange={(event) => setHeightInches(event.value.toString())}
                >
                  {inchesOptions.map((inchValue) => (
                    <PickerItem
                      label={inchValue.toString()}
                      value={inchValue.toString()}
                      key={inchValue}
                    />
                  ))}
                </PickerColumn>
              </Picker>
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
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <View style={styles.feetContainer}>
              <Select
                selectedValue={heightFt}
                itemStyle={styles.heightEntry}
                onValueChange={(itemHeightFt: string) => {
                  setHeightFt(itemHeightFt)
                }}
              >
                {ftOptions.map((heightValue) => (
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
                }}
              >
                {inchesOptions.map((heightValue) => (
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
  heightEntry: {
    color: '#7de6fb',
    fontSize: RFPercentage(15),
  },
  textAbove: {
    alignSelf: 'center',
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#7de6fb',
    fontSize: RFPercentage(12),
  },
  textBelow: {
    alignSelf: 'center',
    textAlign: 'center',
    minWidth: threeQuarterWidth,
    color: '#7de6fb',
    fontSize: RFPercentage(13),
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
    alignSelf: 'center',
    borderWidth: 3,
    width: width,
    borderRadius: 30,
    borderColor: '#7de6fb',
  },
})

export default HeightSlide
