import React from 'react';
// import { useContext } from "react";
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';

import {State} from '../redux/index';
// import ColourContext from "../state/ColourContext";

const ResultSlide = ({idealWeight}) => {
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

  // const { colourData, index } = useContext(ColourContext);

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
          <Text style={styles.idealWeightText}>{Math.round(idealWeight)}</Text>
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
            <Text style={styles.detailText}>{weightPounds}</Text>
            <Text style={styles.detailText}>/</Text>
            <Text style={styles.detailText}>{weightStones}</Text>
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
  vwBottom: {
    marginTop: 230,
    flex: 0.4,
  },
  detailsHeaderText: {
    fontWeight: 'bold',
    color: '#e4bc94',
    fontSize: 27,
  },
  detailText: {
    color: '#173f6a',
    fontSize: 23,
  },
  idealWeightText: {
    fontSize: 120,
    color: 'white',
  },
  yourHealthyWeightText: {
    color: '#e4bc94',
    // color: "#8ac4e4",
    fontSize: 66,
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
  vwTop: {
    flex: 0.3,
    // maxHeight: 180,
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
