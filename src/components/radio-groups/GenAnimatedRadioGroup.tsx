import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import ColourContext from "../../state/ColourContext";

interface AnimatedBlockProps {
  name: string;
  animatedStyle: Record<string, any>;
  defaultShow?: boolean;
  gender: string;
  setGender: any;
}

const GenAnimatedRadioGroup = ({
  name,
  animatedStyle,
  defaultShow,
  gender,
  setGender,
}: AnimatedBlockProps) => {
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
      {gender === "Female" ? (
        <TouchableWithoutFeedback //Female  ON
          onPress={() => {
            setGender("Male");
          }}
        >
          <Animated.View style={dynamicStyles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Female</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Female  OFF
          entering={"entering" in animatedStyle ? undefined : FadeIn.delay(350)}
        >
          <TouchableOpacity
            style={dynamicStyles.animatedBlockPlaceholder}
            onPress={() => {
              setGender("Female");
            }}
          >
            <Text style={dynamicStyles.animatedTextPlaceholder}>Female</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {gender === "Male" ? (
        <TouchableWithoutFeedback //Male  ON
          onPress={() => {
            setGender("Female");
          }}
        >
          <Animated.View style={dynamicStyles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Male</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Male  OFF
          entering={"entering" in animatedStyle ? undefined : FadeIn.delay(350)}
        >
          <TouchableOpacity
            style={dynamicStyles.animatedBlockPlaceholder}
            onPress={() => {
              setGender("Male");
            }}
          >
            <Text style={dynamicStyles.animatedTextPlaceholder}>Male</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default GenAnimatedRadioGroup;

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
