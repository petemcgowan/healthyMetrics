import React, { useContext, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { HelperText, TextInput } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  cancelAnimation,
  interpolate,
  Extrapolate,
  withSpring,
} from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

// import {
//   initialSideWidth,
//   initialWaveCenter,
// } from "../components/LiquidSwipe/WeaveHelpers";
import GenderPicker from "../components/pickers/GenderPicker";
import { actionCreators, State } from "../redux/index";
import ColourContext from "../state/ColourContext";

export const assets = [
  require("../components/LiquidSwipe/assets/firstPageImage.png"),
  require("../components/LiquidSwipe/assets/secondPageImage.png"),
];

const GenderSlide = ({ errorText }) => {
  const { colourData, index } = useContext(ColourContext);
  const gender = useSelector((state: State) => state.gender);
  console.log("GenderSlide: gender:" + gender);
  const dispatch = useDispatch();
  const { setGender } = bindActionCreators(actionCreators, dispatch);

  const { width } = Dimensions.get("window");
  // const maxDist = width - initialSideWidth;

  console.log("GenderSlide, index:" + index);

  const hasErrors = () => {
    return errorText !== "";
  };

  const dynamicStyles = StyleSheet.create({
    textAbove: {
      alignSelf: "center",
      width: "auto",
      textAlign: "center",
      minWidth: 100,
      color: "#84c4ec",
      fontSize: 80,
    },
    textBelow: {
      alignSelf: "center",
      width: "auto",
      textAlign: "center",
      minWidth: 100,
      color: "#84c4ec",
      fontSize: 120,
    },
    input: {
      height: 70,
      width: "auto",
      textAlign: "center",
      fontSize: 65,
      // fontWeight: "bold",
      color: "#84c4ec",
      minWidth: 150,
      padding: 5,
    },
  });

  useEffect(() => {}, []);

  return (
    <View>
      <Text style={dynamicStyles.textAbove}>Select</Text>
      <Text style={dynamicStyles.textBelow}>Gender</Text>
      <GenderPicker gender={gender} setGender={setGender} />
      <View style={styles.textContainer}>
        <HelperText
          style={{ fontSize: 35, color: colourData[index].darkVibrant }}
          type="error"
          visible={hasErrors()}
        >
          {errorText}
        </HelperText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignSelf: "center",
    minWidth: 150,
    height: 45,
  },
});

export default GenderSlide;
