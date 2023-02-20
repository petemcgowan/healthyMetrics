import Video from 'react-native-video';
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
const VIDEO_HEIGHT = height * 0.67;
const VIDEO_WIDTH = width * 0.67;

interface PageProps {
  sintel: any;
  title: string;
  videoLink: string;
  description: string;
}

const Page = ({sintel, title, videoLink, description}: PageProps) => {
  console.log('videoLink:' + videoLink);
  // const videoLink2 =
  //   '../../../assets/videos/slowMotionBikiniLadyWalkingOnBeach-8760590.mp4';
  const videoLink2 =
    '../../../assets/videos/onboarding/4_GetResults480-30T.mp4';
  // const sintel = require('../../../assets/videos/slowMotionBikiniLadyWalkingOnBeach-8760590.mp4');
  // const sintel = require(videoLink2);
  // const sintel = require(videoLink);

  return (
    <View style={styles.slideContainer}>
      {videoLink && (
        <Video
          // source={
          //   uri: require('../../../assets/videos/slowMotionBikiniLadyWalkingOnBeach-8760590.mp4'),
          // }
          source={videoLink}
          // source={require(videoLink2)}
          // source={require('../../../assets/videos/slowMotionBikiniLadyWalkingOnBeach-8760590.mp4')}
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
        <View style={{margin: 10}}>
          <Text style={styles.basicFunctionText}>{title}</Text>
        </View>
        <View style={{margin: 15}}>
          <Text style={styles.explanationText}>{description}</Text>
        </View>
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
    fontSize: 18,
  },
  explanationText: {
    // color:  '#656839',
    // color: '#8338EC',
    color: '#3A86FF',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  video: {
    // flex: 1,
    alignSelf: 'center',
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    marginBottom: 10,
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
