import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

import {State} from '../redux/index';

const {width, height} = Dimensions.get('window');

interface ResultSlideProps {
  idealWeightStones: number;
  idealWeightPounds: number;
  idealWeightKg: number;
}

const ResultSlide = ({
  idealWeightStones,
  idealWeightPounds,
  idealWeightKg,
}: ResultSlideProps) => {
  const heightCm = useSelector((state: State) => state.heightCm);
  const heightFt = useSelector((state: State) => state.heightFt);
  const heightInches = useSelector((state: State) => state.heightInches);
  const weightPounds = useSelector((state: State) => state.weightPounds);
  const weightPoundsOnly = useSelector(
    (state: State) => state.weightPoundsOnly,
  );
  const weightStones = useSelector((state: State) => state.weightStones);
  const weightKg = useSelector((state: State) => state.weightKg);
  const frame = useSelector((state: State) => state.frame);
  const age = useSelector((state: State) => state.age);
  const gender = useSelector((state: State) => state.gender);
  const heightUnits = useSelector((state: State) => state.heightUnits);
  const weightUnits = useSelector((state: State) => state.weightUnits);

  return (
    <SafeAreaView style={styles.vwResultSlide}>
      {/* todo  */}
      {/* <Text style={styles.healthyWeightText}>Healthy Weight Range:</Text> */}

      <View style={styles.vwTop}>
        <View style={styles.vwIdealWeight}>
          <Text style={styles.yourHealthyWeightText}>Your</Text>
          <Text style={styles.yourHealthyWeightText}>Healthy</Text>
          <Text style={styles.yourHealthyWeightText}>Weight</Text>
          {weightUnits === 'kg' && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.idealWeightText}>
                {Math.round(idealWeightKg)}
              </Text>
              <Text style={[styles.weightUnits]}>kg</Text>
            </View>
          )}
          {weightUnits === 'Pounds' && (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={styles.idealWeightText}>
                {Math.round(idealWeightPounds)}
              </Text>
              <Text style={[styles.weightUnits]}>pounds</Text>
            </View>
          )}
          {weightUnits === 'Stones/Pounds' && (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.idealWeightSPText}>
                  {Math.round(idealWeightStones)}
                </Text>
                <Text style={[styles.weightUnits]}>st</Text>
                <Text style={styles.idealWeightSPText}>
                  {Math.round(idealWeightPounds)}
                </Text>
                <Text style={[styles.weightUnits]}>po</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.vwBottom}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontStyle: 'italic',
            }}>
            Entered Info:
          </Text>
        </View>
        <View style={styles.vwGender}>
          <Text style={styles.detailsHeaderText}>Gender:</Text>
          <Text style={styles.detailText}>{gender}</Text>
        </View>

        <View style={styles.vwBodyFrame}>
          <Text style={styles.detailsHeaderText}>Body Frame</Text>
          <Text style={styles.detailText}>{frame}</Text>
        </View>
        {/* specifics bottom */}

        {heightUnits === 'cm' && (
          <View style={styles.vwHeight}>
            <Text style={styles.detailsHeaderText}>Height(cm)</Text>
            <Text style={styles.detailText}>{heightCm}</Text>
          </View>
        )}
        {heightUnits === 'Feet/Inches' && (
          <View style={styles.vwHeight}>
            <Text style={styles.detailsHeaderText}>Height (ft/in)</Text>
            <Text style={styles.detailText}>{heightFt}</Text>
            <Text style={styles.detailText}>/</Text>
            <Text style={styles.detailText}>{heightInches}</Text>
          </View>
        )}

        <View style={styles.vwAge}>
          <Text style={styles.detailsHeaderText}>Age</Text>
          <Text style={styles.detailText}>{age}</Text>
        </View>
        {weightUnits === 'kg' && (
          <View style={styles.vwWeight}>
            <Text style={styles.detailsHeaderText}>Weight(kg)</Text>
            <Text style={styles.detailText}>{weightKg}</Text>
          </View>
        )}
        {weightUnits === 'Pounds' && (
          <View style={styles.vwWeight}>
            <Text style={styles.detailsHeaderText}>Weight (Pounds)</Text>
            <Text style={styles.detailText}>{weightPoundsOnly}</Text>
          </View>
        )}
        {weightUnits === 'Stones/Pounds' && (
          <View style={styles.vwWeight}>
            <Text style={styles.detailsHeaderText}>Weight(St/Po)</Text>
            <Text style={styles.detailText}>{weightStones}</Text>
            <Text style={styles.detailText}>/</Text>
            <Text style={styles.detailText}>{weightPounds}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  vwResultSlide: {
    flexDirection: 'column',
    flex: 1,
    width: width,
  },
  vwTop: {
    // flex: 1,
    // maxHeight: 180,
    marginBottom: 15,
  },
  vwBottom: {
    alignItems: 'center',
    // marginTop: 25,
    // flex: 1,
  },
  detailsHeaderText: {
    // fontWeight: 'bold',
    color: '#e4bc94',
    padding: 1,
    // fontSize: 27,
    fontSize: width < 380 ? 21 : 24,
  },
  detailText: {
    color: '#173f6a',
    padding: 1,
    fontSize: width < 380 ? 19 : 23,
  },
  idealWeightText: {
    fontSize: width < 380 ? 100 : 125,
    color: 'white',
    fontWeight: '500',
  },
  idealWeightSPText: {
    fontSize: width < 380 ? 80 : 105,
    color: 'white',
    fontWeight: '500',
  },
  yourHealthyWeightText: {
    color: '#e4bc94',
    fontSize: width < 380 ? 50 : 62,
    fontWeight: '500',
  },
  weightUnits: {
    // color: '#e4bc94',
    color: 'white',
    fontSize: width < 380 ? 30 : 40,
  },
  vwGender: {
    flexDirection: 'row',
  },
  vwBodyFrame: {
    flexDirection: 'row',
    // flex: 0.5,
  },
  vwWeight: {
    flexDirection: 'row',
  },
  vwHeight: {
    flexDirection: 'row',
  },
  vwAge: {
    flexDirection: 'row',
  },
  healthyWeightText: {
    fontSize: 14,
  },
  vwIdealWeight: {
    // color: "#fff",
    // color: "white",
    alignItems: 'center',
  },
});

export default ResultSlide;
