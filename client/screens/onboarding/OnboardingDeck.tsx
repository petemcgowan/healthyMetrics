import React, {useState, useEffect} from 'react'
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import SlideComponent from '../../components/SlideComponent'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import {State} from '../../redux/index'

const defaultPoster = require('../../assets/posters/OnboardingSlidePoster.jpg')

const {width, height} = Dimensions.get('window')

const CLOUDFRONT_URL = 'https://d2h7fyutgry3l1.cloudfront.net'

const slides = [
  {
    component: SlideComponent,
    title: 'Welcome to Healthy',
    type: 'image',
    posterSource: defaultPoster,
    description:
      'Find the recommended healthy weight for your weight, height and wrist size',
    videoSource: {
      uri: `${CLOUDFRONT_URL}/hls/welcome/slowMotionBikiniLadyWalkingOnBeach-8760590.m3u8`,
    },
    color: 'rgb(38, 27, 21)',
    intro: true,
  },
  {
    component: SlideComponent,
    title: 'Get Your Results',
    type: 'video',
    posterSource: defaultPoster,
    description:
      "On the Weight screen, click 'Calculate' to get your target weight+BMI",
    videoSource: {
      uri: `${CLOUDFRONT_URL}/hls/welcome/GetResults.m3u8`,
    },
    color: 'rgb(25, 26, 29)',
    intro: false,
  },
  {
    component: SlideComponent,
    title: 'Use the Help system',
    type: 'video',
    posterSource: defaultPoster,
    description: `Drag up from the bottom on any page to reveal help information`,
    videoSource: {
      uri: `${CLOUDFRONT_URL}/hls/welcome/UseHelpAI.m3u8`,
    },
    color: 'rgb(25, 26, 29)',
    intro: false,
  },
  {
    component: SlideComponent,
    title: 'Measurement Units',
    type: 'video',
    posterSource: defaultPoster,
    description: `You can select pounds, kg, inches, stones, whatever you work with!`,
    videoSource: {
      uri: `${CLOUDFRONT_URL}/hls/welcome/SelectUnitsAI.m3u8`,
    },
    color: 'rgb(25, 26, 29)',
    intro: false,
  },
  {
    component: SlideComponent,
    title: 'Chat Health with AI',
    type: 'video',
    posterSource: defaultPoster,
    description: 'Chat to AI for health and nutrition tips',
    videoSource: {
      uri: `${CLOUDFRONT_URL}/hls/welcome/UseAIAI.m3u8`,
    },
    color: 'rgb(25, 26, 29)',
    intro: false,
  },
]

const OnboardingDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigation = useNavigation()
  const [backgroundColor, setBackgroundColor] = useState('#000')
  const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro)
  // const hasSeenIntro = false;

  const onScroll = (event: any) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    )
    if (slide !== activeSlide) {
      console.log
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
      style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View style={styles.topContainer}>
        <ScrollView
          style={styles.scrollView}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}>
          {slides.map((slide, index) => {
            const isActive = index === activeSlide
            // const distance = Math.abs(activeSlide - index);
            // const shouldRenderVideo = distance <= 1;

            return (
              <SlideComponent
                key={index}
                title={slide.title}
                description={slide.description}
                videoSource={slide.videoSource}
                posterSource={slide.posterSource}
                intro={slide.intro}
                hasSeenIntro={hasSeenIntro}
                shouldPlay={isActive}
                // shouldRenderVideo={shouldRenderVideo}
              />
            )
          })}
        </ScrollView>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <Text
              key={index}
              style={index === activeSlide ? styles.activeDot : styles.dot}>
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
