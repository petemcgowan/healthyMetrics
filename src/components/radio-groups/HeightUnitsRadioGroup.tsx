import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../../redux/index";
import { HeightUnitsReducerType } from "../../redux/reducers/HeightUnitsReducer";

// import { StateContext } from "../../state/StateContext";

interface HeightUnitsBlockProps {
  name: string;
  animatedStyle: Record<string, any>;
  defaultShow?: boolean;
}

const HeightUnitsRadioGroup = ({
  name,
  animatedStyle,
  defaultShow,
}: HeightUnitsBlockProps) => {
  // const { heightUnitsValue, setHeightUnitsValue } = useContext(StateContext);
  const heightUnits = useSelector(
    (state: HeightUnitsReducerType) => state.heightUnits
  );
  console.log("HeightUnitsRadioGroup: heightUnits:" + heightUnits);
  const dispatch = useDispatch();
  const { setHeightUnits } = bindActionCreators(actionCreators, dispatch);

  // const [value, setValue] = useState("");

  const dynamicStyles = StyleSheet.create({
    animatedBlock: {
      height: 60,
      width: 300,
      borderWidth: 3,
      borderColor: "#84c4ec",
      backgroundColor: "#84c4ec",
      alignItems: "center",
      justifyContent: "center",
    },
    animatedTextPlaceholder: {
      color: "#84c4ec",
      fontSize: 30,
    },
    animatedBlockPlaceholder: {
      height: 60,
      width: 300,
      borderWidth: 3,
      borderColor: "#84c4ec",
      alignItems: "center",
      justifyContent: "center",
      borderStyle: "dashed",
    },
  });
  return (
    <View style={styles.animatedBox}>
      {heightUnits === "Feet/Inches" ? (
        <TouchableWithoutFeedback //Feet/Inches  ON
          onPress={() => {
            setHeightUnits("cm");
          }}
        >
          <Animated.View style={dynamicStyles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Feet/Inches</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Feet/Inches  OFF
          entering={"entering" in animatedStyle ? undefined : FadeIn.delay(350)}
        >
          <TouchableOpacity
            style={dynamicStyles.animatedBlockPlaceholder}
            onPress={() => {
              setHeightUnits("Feet/Inches");
            }}
          >
            <Text style={dynamicStyles.animatedTextPlaceholder}>
              Feet/Inches
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {heightUnits === "cm" ? (
        <TouchableWithoutFeedback //cm  ON
          onPress={() => {
            setHeightUnits("Feet/Inches");
          }}
        >
          <Animated.View style={dynamicStyles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>cm</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //cm  OFF
          entering={"entering" in animatedStyle ? undefined : FadeIn.delay(350)}
        >
          <TouchableOpacity
            style={dynamicStyles.animatedBlockPlaceholder}
            onPress={() => {
              setHeightUnits("cm");
            }}
          >
            <Text style={dynamicStyles.animatedTextPlaceholder}>cm</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default HeightUnitsRadioGroup;

const styles = StyleSheet.create({
  animatedBox: {
    padding: 5,
    alignItems: "center",
  },
  animatedText: {
    color: "#ffffff",
    fontSize: 30,
  },
});
