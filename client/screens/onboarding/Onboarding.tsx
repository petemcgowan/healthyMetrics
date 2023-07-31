import ViewPager from '@react-native-community/viewpager'
import { useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import Video from 'react-native-video'
import Footer from '../../components/onboarding/Footer'
import Page from '../../components/onboarding/Page'
import IntroSlide from './IntroSlide'
import slowmotionLady from '../../assets/videos/slowMotionBikiniLadyWalkingOnBeach-8760590.mp4'

const useHelpVideo = require('../../assets/videos/onboarding/3_UseHelp480-30T.mp4')
const getResultsVideo = require('../../assets/videos/onboarding/4_GetResults480-30T.mp4')
const selectUnitsVideo = require('../../assets/videos/onboarding/1SelectUnits.mp4')
const selectValuesVideo = require('../../assets/videos/onboarding/2SelectValues.mp4')

const Onboarding = () => {
  const pagerRef = useRef(null)
  const navigation = useNavigation()

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber)
  }

  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="1" style={styles.innerContainer}>
          <View style={styles.innerBackground}>
            <Video
              source={slowmotionLady}
              style={{ flex: 1 }}
              muted={true}
              repeat={true}
              paused={false}
              resizeMode={'cover'}
              rate={0.7}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* ************************************* */}
            <View>
              <IntroSlide />
              <Footer
                backgroundColor="#ffc93c"
                rightButtonLabel="Next"
                rightButtonPress={() => {
                  handlePageChange(1)
                }}
              />
            </View>
          </View>
        </View>

        <View key="2">
          <Page
            title="Select Measurement Units"
            videoLink={selectUnitsVideo}
            description="Select how you want to enter and see your height and weight data"
          />
          <Footer
            backgroundColor="#ffc93c"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(0)
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(2)
            }}
          />
        </View>
        <View key="3">
          <Page
            title="Select Your Values"
            videoLink={selectValuesVideo}
            description="Select your values using the dials and checkboxes"
          />
          <Footer
            backgroundColor="#ffc93c"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(1)
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(3)
            }}
          />
        </View>
        <View key="4">
          <Page
            title="Use the Help system"
            videoLink={useHelpVideo}
            description="Drag up from the bottom on any page to reveal help information"
          />
          <Footer
            backgroundColor="#ffc93c"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(2)
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(4)
            }}
          />
        </View>
        <View key="5">
          <Page
            title="Get Your Results"
            videoLink={getResultsVideo}
            description="On the Weight screen, Click Calculate to get your Healthy Weight"
          />
          <Footer
            backgroundColor="#07689f"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(3)
            }}
            rightButtonLabel="Continue"
            rightButtonPress={() => {
              navigation.navigate('CustomSwiper')
            }}
          />
        </View>
      </ViewPager>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  innerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
})
