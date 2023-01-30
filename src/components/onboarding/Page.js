// import {Feather as Icon} from '@expo/vector-icons';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import {Video} from 'expo-av';
import Video from 'react-native-video';
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
const VIDEO_HEIGHT = height * 0.67;
const VIDEO_WIDTH = width * 0.67;

const Page = ({backgroundColor, title, videoLink, imageLink, description}) => {
  return (
    <View style={styles.slideContainer}>
      {videoLink && (
        <Video
          source={videoLink}
          style={styles.video}
          muted={true}
          repeat={true}
          buffered={true}
          paused={false}
          resizeMode={'cover'}
          rate={0.8}
        />
      )}
      <View style={styles.textBoxes}>
        <Text style={styles.basicFunctionText}>{title}</Text>
        <Text style={styles.explanationText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffc93c',
    // backgroundColor: "#ecf0f1",
  },
  basicFunctionText: {
    fontWeight: 'bold',
  },
  explanationText: {
    color: '#bbb',
    padding: 20,
  },
  video: {
    alignSelf: 'center',
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    marginBottom: 30,
  },
  textBoxes: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // previous
  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
  },
  innerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  backgroundViewWrapper: {
    // ...StyleSheet.absoluteFillObject,
  },
});

export default Page;
