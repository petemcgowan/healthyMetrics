import React, { useRef, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import Video from 'react-native-video'
import { RFPercentage } from 'react-native-responsive-fontsize'
import FastImage from 'react-native-fast-image'

const { width, height } = Dimensions.get('window')

interface SlideComponentProps {
  type: string
  title: string
  description: string
  gifLink: string
  videoLink: string
  intro: boolean
  hasSeenIntro: boolean
}

const SlideComponent = ({
  type,
  title,
  description,
  gifLink,
  videoLink,
  intro,
  hasSeenIntro,
}: SlideComponentProps) => {
  const dominantColor = 'rgb(38, 27, 21)' // Dominant colour of image
  const videoRef = useRef(null)

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.setNativeProps({ paused: true }) // Pause the video
      }
    }
  }, [hasSeenIntro])

  return (
    <View style={styles.slideContainer}>
      {gifLink && (
        <View style={styles.videoContainer}>
          <FastImage
            style={styles.video}
            source={gifLink}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      )}
      {videoLink && (
        <View style={styles.videoContainer}>
          {/* <Image style={styles.video} source={videoLink} resizeMode="contain" /> */}
          <Video
            ref={videoRef}
            muted={false}
            rate={0.8}
            repeat={!hasSeenIntro}
            paused={hasSeenIntro}
            style={styles.video}
            source={videoLink}
            resizeMode="contain"
            ignoreSilentSwitch="obey"
          />
        </View>
      )}
      <View
        style={type === 'video' ? styles.textBoxVideo : styles.textBoxImage}
      >
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        style={type === 'video' ? styles.textBoxVideo : styles.textBoxImage}
      >
        <Text style={styles.text}>{description}</Text>
      </View>
    </View>
  )
}

export default SlideComponent

const styles = StyleSheet.create({
  slideContainer: {
    width: width,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // paddingBottom: 20,
  },
  textBoxImage: {
    paddingHorizontal: 20,
    alignItems: 'center',
    // marginTop: -70,
  },
  textBoxVideo: {
    paddingHorizontal: 20,
    alignItems: 'center',
    // marginTop: -70,
  },
  imageContainer: {
    width: width,
    height: height * 0.64,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  videoContainer: {
    width: width,
    height: height * 0.63,
    // paddingVertical: 5,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '90%',
    resizeMode: 'cover',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  textBox: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFPercentage(2.5),
    maxWidth: width - 40,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    maxWidth: width - 40,
    fontSize: RFPercentage(3.1),
    justifyContent: 'center',
  },
})
