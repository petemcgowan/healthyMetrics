import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import SlideComponent from '../../components/SlideComponent'
import { State } from '../redux/index'
import { useSelector } from 'react-redux'

import slowmotionLady from '../../assets/videos/slowMotionBikiniLadyWalkingOnBeach-8760590.mp4'

const selectUnitsVideo = require('../../assets/videos/onboarding/gifUnits.gif')
const selectValuesVideo = require('../../assets/videos/onboarding/gifEnterValues.gif')
const useHelpVideo = require('../../assets/videos/onboarding/gifUseHelp.gif')
const getResultsVideo = require('../../assets/videos/onboarding/gifResults.gif')

// const useHelpGif = require('../../assets/videos/onboarding/UseHelpGif.gif')

const { width, height } = Dimensions.get('window')

const slides = [
  {
    component: SlideComponent,
    title: 'Welcome to Healthy',
    type: 'image',
    description:
      'Find the recommended healthy weight for your weight, height and wrist size',
    videoLink: slowmotionLady,
    gifLink: null,
    // videoLink: slowmotionLady,
    color: 'rgb(38, 27, 21)',
    intro: true,
  },
  {
    component: SlideComponent,
    title: 'Measurement Units',
    type: 'image',
    description: `Select how you want to enter and see your height and weight data`,
    videoLink: null,
    gifLink: selectUnitsVideo,
    // videoLink: ,
    color: 'rgb(25, 26, 29)',
    intro: false,
  },
  {
    component: SlideComponent,
    title: 'Select Your Values',
    type: 'image',
    description: 'Select your values using the dials and checkboxes',
    videoLink: null,
    gifLink: selectValuesVideo,
    // videoLink: selectValuesVideo,
    color: 'rgb(25, 26, 29)',
    intro: false,
  },
  {
    component: SlideComponent,
    title: 'Use the Help system',
    type: 'video',
    description: `Drag up from the bottom on any page to reveal help information`,
    videoLink: null,
    gifLink: useHelpVideo,
    // videoLink: useHelpVideo,
    color: 'rgb(25, 26, 29)',
    intro: false,
  },
  {
    component: SlideComponent,
    title: 'Get Your Results',
    type: 'video',
    description:
      'On the Weight screen, Click Calculate to get your Healthy Weight',
    videoLink: null,
    gifLink: getResultsVideo,
    // videoLink: getResultsVideo,
    color: 'rgb(25, 26, 29)',
    intro: false,
  },
]

const OnboardingDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigation = useNavigation()
  const [backgroundColor, setBackgroundColor] = useState('#000')
  // const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro)
  const hasSeenIntro = false

  const onScroll = (event: any) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    )
    if (slide !== activeSlide) {
      setActiveSlide(slide)

      if (slide > slides.length - 1) {
        console.log('Slides end reached')
      } else {
        setBackgroundColor(slides[slide].color)
        console.log('slides[slide].color:' + slides[slide].color)
      }
    }
  }

  const onStartNowPress = () => {
    navigation.navigate('CustomSwiper')
  }

  useEffect(() => {}, [])

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.topContainer}>
        <ScrollView
          style={styles.scrollView}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {slides.map((slide, index) => {
            const SlideComponent = slide.component
            return (
              <SlideComponent
                type={slide.type}
                key={index}
                title={slide.title}
                description={slide.description}
                gifLink={slide.gifLink}
                videoLink={slide.videoLink}
                intro={slide.intro}
                hasSeenIntro={hasSeenIntro}
              />
            )
          })}
        </ScrollView>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <Text
              key={index}
              style={index === activeSlide ? styles.activeDot : styles.dot}
            >
              •
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={onStartNowPress}>
          <Text style={styles.buttonText}>Start Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'space-around',
  },
  topContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 0.82,
    // paddingTop: 20,
  },
  bottomContainer: {
    flex: 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width * 0.55,
    height: height * 0.06,
    backgroundColor: 'rgb(76, 175, 80)',
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 30,
    elevation: 5, // for Android
    shadowOffset: {
      // for iOS
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flex: 0.08,
  },
  dot: {
    fontSize: RFPercentage(6.8),
    color: '#888',
    marginHorizontal: 5,
  },
  activeDot: {
    fontSize: RFPercentage(6.8),
    color: '#FFF',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: RFPercentage(2.7),
    textAlign: 'center',
  },
})

export default OnboardingDeck
