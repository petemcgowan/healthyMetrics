import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

import {State} from '../redux/index';

const {width} = Dimensions.get('window');

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
  const weightStones = useSelector((state: State) => state.weightStones);
  const weightKg = useSelector((state: State) => state.weightKg);
  const frame = useSelector((state: State) => state.frame);
  const age = useSelector((state: State) => state.age);
  const gender = useSelector((state: State) => state.gender);
  const heightUnits = useSelector((state: State) => state.heightUnits);
  const weightUnits = useSelector((state: State) => state.weightUnits);

  return (
    <SafeAreaView style={styles.vwResultSlide}>
      {/* specifics top */}
      {/* healthy weight section */}
      {/* todo  */}
      {/* <Text style={styles.healthyWeightText}>Healthy Weight Range:</Text> */}

      <View style={styles.vwTop}>
        <View style={styles.vwIdealWeight}>
          <Text style={styles.yourHealthyWeightText}>Your</Text>
          <Text style={styles.yourHealthyWeightText}>Healthy</Text>
          <Text style={styles.yourHealthyWeightText}>Weight</Text>
          {weightUnits === 'kg' && (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={styles.idealWeightText}>
                {Math.round(idealWeightKg)}
              </Text>
              <Text style={[styles.weightUnits, {marginBottom: 25}]}>kg</Text>
            </View>
          )}
          {weightUnits === 'Pounds' && (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={styles.idealWeightText}>
                {Math.round(idealWeightPounds)}
              </Text>
              <Text style={[styles.weightUnits, {marginBottom: 25}]}>
                pounds
              </Text>
            </View>
          )}
          {weightUnits === 'Stones/Pounds' && (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.idealWeightText}>
                  {Math.round(idealWeightStones)}
                </Text>
                <Text style={styles.idealWeightText}>/</Text>
                <Text style={styles.idealWeightText}>
                  {Math.round(idealWeightPounds)}
                </Text>
              </View>
              <Text style={[styles.weightUnits, {marginBottom: 25}]}>
                stones/pounds
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.vwBottom}>
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
            <Text style={styles.detailsHeaderText}>Height (feet/inches)</Text>
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
            <Text style={styles.detailText}>{weightPounds}</Text>
          </View>
        )}
        {weightUnits === 'Stones/Pounds' && (
          <View style={styles.vwWeight}>
            <Text style={styles.detailsHeaderText}>Weight(Stones/Pounds)</Text>
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
  },
  vwTop: {
    // flex: 1,
    // maxHeight: 180,
  },
  vwBottom: {
    // marginTop: 180,
    // flex: 1,
  },
  detailsHeaderText: {
    fontWeight: 'bold',
    color: '#e4bc94',
    // fontSize: 27,
    fontSize: width < 450 ? 24 : 27,
  },
  detailText: {
    color: '#173f6a',
    fontSize: width < 450 ? 20 : 23,
  },
  idealWeightText: {
    fontSize: width < 450 ? 100 : 125,
    color: 'white',
    fontWeight: '500',
  },
  yourHealthyWeightText: {
    color: '#e4bc94',
    fontSize: width < 450 ? 58 : 83,
    fontWeight: '500',
  },
  weightUnits: {
    // color: '#e4bc94',
    color: 'white',
    fontSize: width < 450 ? 33 : 43,
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
