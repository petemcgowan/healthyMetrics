import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const threeQuarterWidth = width * 0.8;

interface AnimatedBlockProps {
  animatedStyle: Record<string, any>;
  gender: string;
  setGender: any;
}

const GenAnimatedRadioGroup = ({
  animatedStyle,
  gender,
  setGender,
}: AnimatedBlockProps) => {
  const dynamicStyles = StyleSheet.create({
    animatedBlock: {
      height: 60,
      // flex: 1,
      width: threeQuarterWidth,
      borderWidth: 3,
      borderColor: '#84c4ec',
      backgroundColor: '#84c4ec',
      alignItems: 'center',
      justifyContent: 'center',
    },
    animatedTextPlaceholder: {
      color: '#84c4ec',
      fontSize: 40,
      // alignItems: 'center',
      // textAlignVertical: 'center',
      // justifyContent: 'center',
      // textAlign: 'center',
    },
    animatedBlockPlaceholder: {
      height: 60,
      margin: 3,
      width: threeQuarterWidth,
      borderWidth: 4,
      borderColor: '#84c4ec',
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'dashed',
    },
  });
  return (
    <View style={styles.animatedBox}>
      {gender === 'Female' ? (
        <TouchableWithoutFeedback //Female  ON
          onPress={() => {
            setGender('Male');
          }}>
          <Animated.View style={dynamicStyles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Female</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Female  OFF
          entering={
            'entering' in animatedStyle ? undefined : FadeIn.delay(350)
          }>
          <TouchableOpacity
            style={dynamicStyles.animatedBlockPlaceholder}
            onPress={() => {
              setGender('Female');
            }}>
            <Text style={dynamicStyles.animatedTextPlaceholder}>Female</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {gender === 'Male' ? (
        <TouchableWithoutFeedback //Male  ON
          onPress={() => {
            setGender('Female');
          }}>
          <Animated.View style={dynamicStyles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Male</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Male  OFF
          entering={
            'entering' in animatedStyle ? undefined : FadeIn.delay(350)
          }>
          <TouchableOpacity
            style={dynamicStyles.animatedBlockPlaceholder}
            onPress={() => {
              setGender('Male');
            }}>
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
    alignItems: 'center',
  },
  animatedText: {
    color: '#ffffff',
    fontSize: 40,
  },
});
