/* eslint-disable react/no-this-in-sfc */
// import {ResizeMode, Video} from 'expo-av';
import Video from 'react-native-video';
// import { StatusBar } from "expo-status-bar";
import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  createContext,
} from 'react';
import 'react-native-gesture-handler';
import {
  LogBox,
  StyleSheet,
  View,
  ListRenderItem,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';

import BottomHelp from '../components/BottomHelp';
import {State} from '../redux/index';
import ColourContext, {
  ColourProvider,
  ColourType,
} from '../state/ColourContext';
import {ValuesContext, ValuesProvider} from '../state/ValuesContext';
import ListSlide from './ListSlide';

// export const ValuesContext = createContext();

const {width, height} = Dimensions.get('screen');
// const ITEM_WIDTH = width;
// const ITEM_HEIGHT = height * 0.8;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
// const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

function CustomSwiper() {
  const {colourData} = useContext(ColourContext);

  const [index, setIndex] = React.useState(0);

  const weightPounds = useSelector((state: State) => state.weightPounds);
  const weightStones = useSelector((state: State) => state.weightStones);
  const weightKg = useSelector((state: State) => state.weightKg);
  const heightCm = useSelector((state: State) => state.heightCm);
  const heightFt = useSelector((state: State) => state.heightFt);
  const heightInches = useSelector((state: State) => state.heightInches);
  const heightUnits = useSelector((state: State) => state.heightUnits);
  const weightUnits = useSelector((state: State) => state.weightUnits);
  console.log(
    'CustomSwiper: weightPounds:' +
      weightPounds +
      ', weightStones:' +
      +weightStones,
  );
  console.log(
    'CustomSwiper: heightCm:' +
      heightCm +
      ', heightFt:' +
      heightFt +
      ', heightInches:' +
      heightInches,
  );

  const frame = useSelector((state: State) => state.frame);
  const age = useSelector((state: State) => state.age);
  const gender = useSelector((state: State) => state.gender);
  console.log('CustomSwiper: frame:' + frame);
  console.log('CustomSwiper: age:' + age);
  console.log('CustomSwiper: gender:' + gender);
  const [idealWeight, setIdealWeight] = useState(0);
  const [helpTitle, setHelpTitle] = useState('');
  const [helpSubHeading, setHelpSubHeading] = useState('');
  const [helpText, setHelpText] = useState('');
  const refFlatList = React.useRef(null);
  const [loading, setLoading] = useState(true);
  // console.log("CustomSwiper: before useContext weightValue:" + weightValue);

  // const { heightUnitsValue, weightUnitsValue } = useContext(StateContext);
  // const { weightUnitsValue } = useContext(StateContext);

  const [errorText, setErrorText] = useState(null);
  LogBox.ignoreAllLogs();

  // TODO put this back when the Colour Context works throughout
  const value = useMemo(
    () => ({
      // dominantColour,
      // lightMutedColour,
      // lightVibrantColour,
      // darkVibrant,
      colourData,
      index,
    }),
    [index],
  );

  const helpSlideValues = [
    {
      // title: "Info",
      subHeading: 'Welcome',
      text: "Find related info on the screen you're on here 😎 ",
    },
    {
      // title: "Info",
      subHeading: 'Units',
      text: `TODO
               `,
    },
    {
      // title: "Info",
      subHeading: 'Gender',
      text: `Generally, females weigh less than males even though they naturally have a higher percentage of body fat.

      This is because the male body generally has higher muscle mass, and muscle is heavier than fat.

      * Women generally have lower bone density.

      * Last but not least, males tend to be taller than females.`,
    },
    {
      // title: "Info",
      subHeading: 'Age',
      text: `In theory, age shouldn't be a large determinant of an ideal body weight past the ages of 14-15 for girls and 16-17 for boys, after which most people stop growing.

      It is actually expected that human males and females to lose 1.5 and 2 inches in height respectively by age 70.

      It is possible to remove the effects of aging by adopting various habits such as monitoring diet, exercise, stress, supplementation and sleep.`,
    },
    {
      title: 'Info',
      subHeading: 'Height',
      text: 'The taller the person, the more muscle mass and body fat they have, which results in more weight. A male at a similar height to a female should weigh about 10-20% heavier.',
    },
    {
      // title: "Info",
      subHeading: 'Frame',
      text: `Body frame size is another factor that can have a significant impact on the measurement of ideal weight.

      Body frame size is typically categorized as small, medium, or large boned. It is measured based on the circumference of a person's wrist in relation to their height, as shown below.

      For women:

      Height under 5 ft 2 in
      Small boned = wrist size less than 5.5 in
      Medium boned = wrist size 5.5 in to 5.75 in
      Large boned = wrist size over 5.75 in
      Height between 5 ft 2 in and 5 ft 5 in
      Small boned = wrist size less than 6 in
      Medium boned = wrist size 6 in to 6.25 in
      Large boned = wrist size over 6.25 in
      Height over 5 ft 5 in
      Small boned = wrist size less than 6.25 in
      Medium boned = wrist size 6.25 in to 6.5 in
      Large boned = wrist size over 6.5 in

      For men:

      Height over 5 ft 5 in
      Small boned = wrist size 5.5 in to 6.5 in
      Medium boned = wrist size 6.5 in to 7.5 in
      Large boned = wrist size over 7.5 in

      A person who is large boned will naturally weigh more than someone who is small boned, even at the same height, making body frame size a factor that can affect measurements such as IBW and BMI.`,
    },
    {
      // title: "Info",
      subHeading: 'Weight',
      text: '4th text item',
    },
    {
      // title: "Info",
      subHeading: 'Results',
      text: `D. R. Miller Formula (1983)

      Male:	56.2 kg + 1.41 kg per inch over 5 feet
      Female:	53.1 kg + 1.36 kg per inch over 5 feet

      Modification of the Devine Formula.`,
    },
  ];

  console.log('App Render');
  // useEffect notices the change in state index, so changes the Flatlist's scrollToIndex
  useEffect(() => {
    console.log('App useEffect');
    refFlatList.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, [index]);

  const handleCalculate = () => {
    const weightIsValidated = validate('weight');
    console.log(
      'handleCalculate, heightCm:' +
        heightCm +
        ', heightFt:' +
        heightFt +
        ', heightInches:' +
        heightInches,
    );
    console.log('handleCalculate, frame:' + frame);

    if (weightIsValidated) {
      // const ageValue = +age;
      // console.log("handleCalculate, age:" + ageValue);

      let heightCmValue = +heightCm;
      if (heightUnits === 'Feet/Inches') {
        // the + makes it a number (for calcs)
        const heightFtInches = +heightFt * 12 + +heightInches;
        console.log('heightFtInches:' + heightFtInches);
        heightCmValue = heightFtInches * 2.54; // convert to cm
      }
      console.log('heightCmValue:' + heightCmValue);

      // Note: Weight is not currently used in the calc

      // D. R. Miller Formula (1983)
      // Male:	56.2 kg + 1.41 kg per inch over 5 feet
      // Female:	53.1 kg + 1.36 kg per inch over 5 feet

      // 5ft = 60 inches
      let idealWeightInt = 0;
      // **Pseudo code**
      if (gender === 'Male') {
        console.log('Doing Male calc');
        if (heightCmValue > 60) {
          const heightAbove = heightCmValue - 60;
          console.log('heightAbove:' + heightAbove);
          const extraWeight = 1.41 * heightAbove;
          console.log('extraWeight:' + extraWeight);
          idealWeightInt = 56.2 + extraWeight;
        } else {
          // not over 60 in
          idealWeightInt = 1.0676 * heightCmValue; //  it's 1.0676 per in(56.2kg/60)
          // so if they're 40in it's 40*1.0676
        }
      } else if (gender === 'Female') {
        console.log('Doing Female calc');
        if (heightCmValue > 60) {
          const heightAbove = heightCmValue - 60;
          console.log('heightAbove:' + heightAbove);
          const extraWeight = 1.36 * heightAbove;
          console.log('extraWeight:' + extraWeight);
          idealWeightInt = 53.1 + extraWeight;
        } // not over 60 in
        else {
          idealWeightInt = 1.1299 * heightCmValue; //  it's 1.1299 per in(53.1kg/60)
          // so if they're 40in it's 40*1.1299
        }
      }
      console.log('idealWeightInt before frame mod:' + idealWeightInt);
      // Add 10% for a large frame size, and subtract 10% for a small frame size.
      if (frame === 'Small') {
        idealWeightInt -= idealWeightInt * 0.1;
      } else if (frame === 'Large') {
        idealWeightInt += idealWeightInt * 0.1;
      } // medium needs no mods
      console.log('idealWeightInt after frame mod:' + idealWeightInt);

      setIdealWeight(idealWeightInt);
      setIndex(index + 1); // move to the results slide
    } // weight entry validation
  };

  const validate = title => {
    console.log('validate(title):' + title);
    switch (title) {
      case 'gender': {
        if (gender === '') {
          // they haven't selected anything
          console.log('validate(gender):' + gender);
          setErrorText('Please select a gender');
          return false;
        }
        break;
      }
      case 'age': {
        console.log('ageValue:' + age);
        if (age === '') {
          // they haven't selected anything
          console.log('validate(age):' + age);
          setErrorText('Please enter an age');
          return false;
        }
        break;
      }
      case 'frame': {
        if (frame === '') {
          // they haven't selected anything
          console.log('validate(frame):' + frame);
          setErrorText('Please select a frame size');
          return false;
        }
        break;
      }
      case 'units': {
        break;
      }
      case 'intro':
      case 'result':
        break;
      case 'weight': {
        if (weightUnits === 'kg') {
          if (weightKg === '') {
            // they haven't selected anything
            console.log('validate(weightPounds):' + weightPounds);
            setErrorText('Please enter a weight in kg');
            return false;
          }
        }
        if (weightUnits === 'Pounds' || weightUnits === 'Stone/Pounds') {
          if (weightPounds === '') {
            // they haven't selected anything
            console.log('validate(weightPounds):' + weightPounds);
            setErrorText('Please enter a weight in pounds');
            return false;
          }
        }
        break;
      }
      case 'height': {
        // todo heightFeet and inches needed here depending on units measure
        if (heightUnits === 'cm') {
          if (heightCm === '') {
            // they haven't selected anything
            console.log('validate(heightCm):' + heightCm);
            setErrorText('Please enter a height');
            return false;
          }
        }
        if (heightUnits === 'Feet/Inches') {
          if (heightFt === '') {
            // they haven't selected anything
            console.log('validate(height Feet/Inches):' + heightFt);
            setErrorText('Please enter a height');
            return false;
          }
        }
        break;
      }
      default: {
        console.error(
          'Unknown/unhandled value in switch statement :title:' + title,
        );
      }
    }

    return true;
  };

  const leftPress = () => {
    if (index === 0) {
      return;
    }
    setHelpTitle(helpSlideValues[index - 1].title);
    setHelpSubHeading(helpSlideValues[index - 1].subHeading);
    setHelpText(helpSlideValues[index - 1].text);

    setIndex(index - 1);
    console.log('colourData[index].dominant):' + colourData[index].dominant);

    console.log('index(prev):' + index);

    setErrorText('');
  };

  const rightPress = () => {
    if (index === colourData.length - 1) {
      return;
    }
    setHelpTitle(helpSlideValues[index + 1].title);
    setHelpSubHeading(helpSlideValues[index + 1].subHeading);
    setHelpText(helpSlideValues[index + 1].text);

    setIndex(index + 1);
    console.log('colourData[index].dominant):' + colourData[index].dominant);

    setErrorText('');
  };

  // TODO Videos should be playing by default, I turned off cause they're distracting
  console.log('CustomSwiper: before return block');
  return (
    // <ValuesContext.Provider
    //   value={(weightValue, setWeightValue, heightValue, setHeightValue)}
    // >
    <ValuesProvider>
      <ColourProvider value={value}>
        <View style={styles.container}>
          {/* <StatusBar /> */}
          <Animated.FlatList
            ref={refFlatList}
            initialScrollIndex={index}
            data={colourData}
            keyExtractor={(_, index) => index.toString()}
            // keyExtractor={(item: ColourType) => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            renderItem={({item}) => {
              const hasImage = item.image !== null;
              // eslint-disable-next-line react-hooks/rules-of-hooks
              // const opacity = useMemo(() => new Animated.Value(0), []);
              console.log(
                'item.title:' +
                  item.title +
                  ', item.image:' +
                  item.image +
                  ', hasImage:' +
                  hasImage,
              );
              return (
                <View
                  style={{width, height}}
                  onTouchStart={e => {
                    // console.log("onTouchStart, e:" + e + ", this:" + this);
                    if (this && e) {
                      this.touchX = e.nativeEvent.pageX;
                    }
                  }}
                  onTouchEnd={e => {
                    if (this && e) {
                      // check for undefined
                      if (this.touchX - e.nativeEvent.pageX > 210) {
                        console.log(
                          'Swiped left' +
                            this.touchX +
                            ', e.nativeEvent.pageX:' +
                            e.nativeEvent.pageX +
                            ', subtracted:' +
                            (this.touchX - e.nativeEvent.pageX),
                        );

                        const result = validate(item.title); // did they enter relevant info?
                        console.log(
                          'result:' + result + ', item.title' + item.title,
                        );
                        console.log('index' + index);
                        if (result) {
                          // entry is good
                          console.log("rightPress it's good");
                          rightPress();
                        } else {
                          refFlatList.current?.scrollToIndex({
                            index,
                            animated: true,
                          }); // setIndex(index);
                        }
                      }
                      if (this.touchX - e.nativeEvent.pageX < -210) {
                        leftPress();
                      }
                      console.log(
                        'Swiped right, this.touchX' +
                          this.touchX +
                          ', e.nativeEvent.pageX:' +
                          e.nativeEvent.pageX +
                          ', subtracted:' +
                          (this.touchX - e.nativeEvent.pageX),
                      );
                    }
                  }}>
                  {hasImage && (
                    <ImageBackground
                      source={item.image}
                      resizeMode={'cover'}
                      style={{flex: 1}}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                        }}>
                        {/* ************************************* */}
                        <ListSlide
                          errorText={errorText}
                          helpSlideValues={helpSlideValues}
                          index={index}
                          handleCalculate={handleCalculate}
                          idealWeight={idealWeight}
                          item={item}
                        />
                        {/* ************************************* */}
                        <BottomHelp
                          helpTitle={helpSlideValues[index].title}
                          helpSubHeading={helpSlideValues[index].subHeading}
                          helpText={helpSlideValues[index].text}
                        />
                      </View>
                    </ImageBackground>
                  )}
                  {!hasImage && (
                    <View style={styles.innerContainer}>
                      <View style={styles.innerBackground}>
                        <Animated.View style={[styles.backgroundViewWrapper]}>
                          {/* <Video
                            isLooping
                            isMuted
                            rate={0.7}
                            positionMillis={500}
                            resizeMode={ResizeMode.COVER}
                            shouldPlay={false}
                            source={require('../../assets/videos/slowMotionBikiniLadyWalkingOnBeach-8760590.mp4')}
                            style={{flex: 1}}
                          /> */}
                          <Video
                            source={require('../../assets/videos/slowMotionBikiniLadyWalkingOnBeach-8760590.mp4')}
                            // posterResizeMode={"cover"}
                            style={{flex: 1}}
                            // onError={onVideoError}
                            // positionMillis={500}
                            muted={true}
                            repeat={true}
                            // buffered={true}
                            // onLoad={onVideoLoaded}
                            paused={false}
                            resizeMode={'cover'}
                            rate={0.7}
                            // ignoreSilentSwitch={'obey'}
                          />
                        </Animated.View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                        }}>
                        {/* ************************************* */}
                        <ListSlide
                          errorText={errorText}
                          helpSlideValues={helpSlideValues}
                          index={index}
                          handleCalculate={handleCalculate}
                          idealWeight={idealWeight}
                          item={item}
                        />
                        {/* ************************************* */}
                        <BottomHelp
                          helpTitle={helpSlideValues[index].title}
                          helpSubHeading={helpSlideValues[index].subHeading}
                          helpText={helpSlideValues[index].text}
                        />
                      </View>
                    </View>
                  )}
                </View>
              );
            }}
          />
        </View>
      </ColourProvider>
    </ValuesProvider>
    // </ValuesContext.Provider>
  );
}

export default CustomSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: "center",
    justifyContent: 'center',
    // paddingTop: StatusBar.currentHeight,
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
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginTop: 90,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  inputContainer: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    // height: 70,
  },
  input: {
    height: 70,
    backgroundColor: '#666666',
    color: '#ffffff',
    paddingLeft: 15,
    paddingRight: 15,
  },
});
