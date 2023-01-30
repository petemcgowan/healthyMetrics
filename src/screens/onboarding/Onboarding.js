import ViewPager from '@react-native-community/viewpager';
import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import Footer from '../../components/onboarding/Footer';
import Page from '../../components/onboarding/Page';
import IntroSlide from './IntroSlide';

const selectUnitsVideo = require('../../../assets/videos/onboarding/1_SelectUnits.mp4');
const selectValuesVideo = require('../../../assets/videos/onboarding/2_SelectValues.mp4');
const useHelpVideo = require('../../../assets/videos/onboarding/3_UseHelp.mp4');
const getResultsVideo = require('../../../assets/videos/onboarding/4_GetResults.mp4');

// const {width, height} = Dimensions.get('screen');

const Onboarding = () => {
  const pagerRef = useRef(null);
  const navigation = useNavigation();

  const handlePageChange = pageNumber => {
    pagerRef.current.setPage(pageNumber);
  };

  return (
    <View style={{flex: 1}}>
      <ViewPager style={{flex: 1}} initialPage={0} ref={pagerRef}>
        <View key="1" style={styles.innerContainer}>
          <View style={styles.innerBackground}>
            <Video
              source={require('../../../assets/videos/slowMotionBikiniLadyWalkingOnBeach-8760590.mp4')}
              style={{flex: 1}}
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
            }}>
            {/* ************************************* */}
            <View>
              <IntroSlide />
              <Footer
                backgroundColor="#ffc93c"
                rightButtonLabel="Next"
                rightButtonPress={() => {
                  handlePageChange(1);
                }}
              />
            </View>
          </View>
        </View>

        <View key="2">
          <Page
            backgroundColor="#ffc93c"
            title="Select Measurement Units"
            videoLink={selectUnitsVideo}
            description="Select Measurement Units description"
          />
          <Footer
            backgroundColor="#ffc93c"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(0);
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(2);
            }}
          />
        </View>
        <View key="3">
          <Page
            backgroundColor="#ffc93c"
            title="Select Your Values"
            videoLink={selectValuesVideo}
            description="Select Your Values Description"
          />
          <Footer
            backgroundColor="#ffc93c"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(1);
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(3);
            }}
          />
        </View>
        <View key="4">
          <Page
            backgroundColor="#ffc93c"
            title="Use the Help system"
            videoLink={useHelpVideo}
            description="Use the Help system Description"
          />
          <Footer
            backgroundColor="#ffc93c"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(2);
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(4);
            }}
          />
        </View>
        <View key="5">
          <Page
            backgroundColor="#07689f"
            title="Get Your Results"
            videoLink={getResultsVideo}
            description="Get Your Results description"
          />
          <Footer
            backgroundColor="#07689f"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(3);
            }}
            rightButtonLabel="Continue"
            rightButtonPress={() => {
              navigation.navigate('CustomSwiper');
            }}
          />
        </View>
      </ViewPager>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
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
});
