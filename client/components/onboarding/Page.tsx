import Video from 'react-native-video'
import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

const { width, height } = Dimensions.get('window')
const VIDEO_HEIGHT = height * 0.67
const VIDEO_WIDTH = width * 0.67

interface PageProps {
  title: string
  videoLink: string
  description: string
}

const Page = ({ title, videoLink, description }: PageProps) => {
  console.log('videoLink:' + videoLink)

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
        <View style={{ margin: 10 }}>
          <Text style={styles.basicFunctionText}>{title}</Text>
        </View>
        <View style={{ margin: 15 }}>
          <Text style={styles.explanationText}>{description}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffc93c',
  },
  basicFunctionText: {
    fontWeight: '500',
    fontSize: RFPercentage(3),
  },
  explanationText: {
    color: '#3A86FF',
    textAlign: 'center',
    fontSize: RFPercentage(2.6),
    marginBottom: 10,
  },
  video: {
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
})

export default Page
