import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

interface AnimatedRadioGroupProps {
  animatedStyle: Record<string, any>;
  frame: string;
  setFrame: any;
}

const AnimatedRadioGroup = ({
  animatedStyle,
  frame,
  setFrame,
}: AnimatedRadioGroupProps) => {
  return (
    <View style={styles.animatedBox}>
      {frame === 'Small' ? (
        <TouchableWithoutFeedback //Small  ON
          onPress={() => {
            setFrame('Medium');
          }}>
          <Animated.View style={styles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Small</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Small  OFF
          entering={
            'entering' in animatedStyle ? undefined : FadeIn.delay(350)
          }>
          <TouchableOpacity
            style={styles.animatedBlockPlaceholder}
            onPress={() => {
              setFrame('Small'); // Turning SMALL ON
            }}>
            <Text style={styles.animatedTextPlaceholder}>Small</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {frame === 'Medium' ? (
        <TouchableWithoutFeedback //Medium  ON
          onPress={() => {
            setFrame('Small');
          }}>
          <Animated.View style={styles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Medium</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Medium  OFF
          entering={
            'entering' in animatedStyle ? undefined : FadeIn.delay(350)
          }>
          <TouchableOpacity
            style={styles.animatedBlockPlaceholder}
            onPress={() => {
              setFrame('Medium'); // Turning MEDIUM ON
            }}>
            <Text style={styles.animatedTextPlaceholder}>Medium</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {frame === 'Large' ? (
        <TouchableWithoutFeedback //Large  ON
          onPress={() => {
            setFrame('Small');
          }}>
          <Animated.View style={styles.animatedBlock} {...animatedStyle}>
            <Text style={styles.animatedText}>Large</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      ) : (
        <Animated.View //Large  OFF
          entering={
            'entering' in animatedStyle ? undefined : FadeIn.delay(350)
          }>
          <TouchableOpacity
            style={styles.animatedBlockPlaceholder}
            onPress={() => {
              setFrame('Large'); // Turning Large ON
            }}>
            <Text style={styles.animatedTextPlaceholder}>Large</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  animatedBlock: {
    height: 60,
    width: 300,
    borderWidth: 3,
    borderColor: '#ddb583',
    backgroundColor: '#ddb583',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedTextPlaceholder: {
    color: 'white',
    fontSize: 30,
  },
  animatedBlockPlaceholder: {
    height: 60,
    width: 300,
    borderWidth: 3,
    borderColor: '#ddb583',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  animatedBox: {
    padding: 5,
    alignItems: 'center',
  },
  animatedText: {
    color: '#ffffff',
    fontSize: 30,
  },
});

export default AnimatedRadioGroup;
