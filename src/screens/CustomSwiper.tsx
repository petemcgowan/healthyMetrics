import React, {useState, useEffect, useContext, useMemo} from 'react';
import 'react-native-gesture-handler';
import {
  LogBox,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';

import BottomHelp from '../components/BottomHelp';
import {State} from '../redux/index';
import ColourContext, {ColourProvider} from '../state/ColourContext';
// import {ValuesProvider} from '../state/ValuesContext';
import ListSlide from './ListSlide';

const {width, height} = Dimensions.get('screen');

function CustomSwiper() {
  const {colourData} = useContext(ColourContext);

  const [index, setIndex] = React.useState(0);
  // const nativeEventPageX = -1; // tracked by mouse move
  // const handlerTouchX = -1; // tracked by mouse move
  const weightPounds = useSelector((state: State) => state.weightPounds);
  const weightStones = useSelector((state: State) => state.weightStones);
  const weightKg = useSelector((state: State) => state.weightKg);
  const heightCm = useSelector((state: State) => state.heightCm);
  const heightFt = useSelector((state: State) => state.heightFt);
  const heightInches = useSelector((state: State) => state.heightInches);
  const heightUnits = useSelector((state: State) => state.heightUnits);
  const weightUnits = useSelector((state: State) => state.weightUnits);

  const frame = useSelector((state: State) => state.frame);
  const age = useSelector((state: State) => state.age);
  const gender = useSelector((state: State) => state.gender);
  const [idealWeightPounds, setIdealWeightPounds] = useState(0);
  const [idealWeightStones, setIdealWeightStones] = useState(0);
  const [idealWeightKg, setIdealWeightKg] = useState(0);
  const [helpTitle, setHelpTitle] = useState('');
  const [helpSubHeading, setHelpSubHeading] = useState('');
  const [helpText, setHelpText] = useState('');
  const refFlatList = React.useRef(null);

  const [errorText, setErrorText] = useState(null);
  LogBox.ignoreAllLogs();

  // const memoizedValue = useMemo(
  //   () => renderMainItem,
  //   [
  //     weightPounds,
  //     weightStones,
  //     weightKg,
  //     weightKg,
  //     heightCm,
  //     heightFt,
  //     heightInches,
  //     heightUnits,
  //     weightUnits,
  //     frame,
  //     age,
  //     gender,
  //     idealWeightPounds,
  //     idealWeightStones,
  //     idealWeightKg,
  //   ],
  // );

  const value = useMemo(
    () => ({
      colourData,
      index,
    }),
    [index],
  );

  const helpSlideValues = [
    // {
    //   // title: "Info",
    //   subHeading: 'Welcome',
    //   text: "Find related info on the screen you're on here 😎 ",
    // },
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
      text: `J. D. Robinson Formula (1983)

      Male:	52 kg + 1.9 kg per inch over 5 feet
      Female:	49 kg + 1.7 kg per inch over 5 feet

      Modification of the Devine Formula.`,
    },
  ];

  // useEffect notices the change in state index, so changes the Flatlist's scrollToIndex
  useEffect(() => {
    console.log('App useEffect');
    refFlatList.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, [index]);

  const handleCalculate = () => {
    console.log('handleCalculate, frame:' + frame);
    const weightIsValidated = validate('weight');

    if (weightIsValidated) {
      let heightCmValue = +heightCm;
      if (heightUnits === 'Feet/Inches') {
        // the + makes it a number (for calcs)
        const heightFtInches = +heightFt * 12 + +heightInches;
        console.log('handleCalculate, heightFtInches:' + heightFtInches);
        heightCmValue = heightFtInches * 2.54; // convert to cm
      }
      console.log('handleCalculate, heightCmValue:' + heightCmValue);

      // Note: Weight is not currently used in the calc

      // J. D. Robinson Formula (1983)

      // Male:	52 kg + 1.9 kg per inch over 5 feet (0.748 kg per cm)
      // Female:	49 kg + 1.7 kg per inch over 5 feet (0.3937 kg per cm)

      // 5ft = 60 inches
      let idealWeightInt = 0;
      if (gender === 'Male') {
        console.log('Doing Male calc');
        if (heightCmValue > 152.4) {
          const heightAbove = heightCmValue - 152.4;
          console.log('handleCalculate, heightAbove:' + heightAbove);
          const extraWeight = 0.748 * heightAbove;
          console.log('handleCalculate, extraWeight:' + extraWeight);
          idealWeightInt = 52 + extraWeight;
        } else {
          // not over 60 in (152.4 or 5 ft)
          // this is a per cm value, multiplied by height
          idealWeightInt = 0.3412 * heightCmValue; //  it's 0.3412 per cm(52kg/152.4)
        }
      } else if (gender === 'Female') {
        console.log('Doing Female calc');
        if (heightCmValue > 152.4) {
          const heightAbove = heightCmValue - 152.4;
          console.log('handleCalculate, heightAbove:' + heightAbove);
          const extraWeight = 0.3937 * heightAbove;
          console.log('handleCalculate, extraWeight:' + extraWeight);
          idealWeightInt = 49 + extraWeight;
        } // not over 60 in
        else {
          idealWeightInt = 0.3215 * heightCmValue; //  it's 0.34842 per cm(49kg/152.4)
        }
      }
      console.log(
        'handleCalculate, idealWeightInt before frame mod:' + idealWeightInt,
      );
      // Add 10% for a large frame size, and subtract 10% for a small frame size.
      if (frame === 'Small') {
        idealWeightInt -= idealWeightInt * 0.1;
      } else if (frame === 'Large') {
        idealWeightInt += idealWeightInt * 0.1;
      } // medium needs no mods
      console.log(
        'handleCalculate, idealWeightInt after frame mod:' + idealWeightInt,
      );

      let inPounds = idealWeightInt * 2.205;
      console.log('inPounds:' + inPounds);
      if (weightUnits === 'kg') {
        // It's already in kg for the calc, no change
        console.log('setIdealWeightKg KG:' + idealWeightInt);
        setIdealWeightKg(idealWeightInt);
      }
      if (weightUnits === 'Stones/Pounds') {
        // divide by 14 and round the modulus down or up based on 0.5)
        // show them result in stones and pounds
        console.log(
          'setIdealWeightStones/Pounds Stones:' + Math.round(inPounds / 14),
        );
        let stones = Math.floor(inPounds / 14);
        inPounds = Math.round(inPounds % 14);
        console.log('stones, inPounds before mods' + stones + ', :' + inPounds);
        // deal with case where pounds round up to the next stone (making it 14 pounds)
        if (inPounds === 14) {
          console.log('Augmenting for edge rounding case...');
          stones++;
          inPounds = 0;
        }
        setIdealWeightStones(stones);
        setIdealWeightPounds(inPounds);
      }
      if (weightUnits === 'Pounds') {
        // show them result in pounds
        console.log('setIdealWeightPounds Pounds:' + inPounds);
        setIdealWeightPounds(inPounds);
      }

      console.log('handleCalculate (before switch), index:' + index);
      setIndex(index + 1); // move to the results slide
    } // weight entry validation
  };

  const validate = title => {
    console.log('validate(title):' + title);
    switch (title) {
      case 'gender': {
        if (gender === '') {
          // they haven't selected anything
          setErrorText('Please select a gender');
          return false;
        }
        break;
      }
      case 'age': {
        console.log('ageValue:' + age);
        if (age === '') {
          // they haven't selected anything
          setErrorText('Please enter an age');
          return false;
        }
        break;
      }
      case 'frame': {
        if (frame === '') {
          // they haven't selected anything
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
            setErrorText('Please enter a weight in kg');
            return false;
          }
        }
        if (weightUnits === 'Pounds' || weightUnits === 'Stones/Pounds') {
          if (weightPounds === '') {
            // they haven't selected anything
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
            setErrorText('Please enter a height');
            return false;
          }
        }
        if (heightUnits === 'Feet/Inches') {
          if (heightFt === '') {
            // they haven't selected anything
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

  const renderMainItem = ({item}) => {
    const hasImage = item.image !== null;
    console.log('MAIN renderItem called:' + item.title);
    return (
      <View style={{width, height, backgroundColor: 'white'}}>
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
                handleCalculate={handleCalculate}
                idealWeightStones={idealWeightStones}
                idealWeightPounds={idealWeightPounds}
                idealWeightKg={idealWeightKg}
                itemTitle={item.title}
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
      </View>
    );
  };

  const leftPress = () => {
    if (index === 0) {
      return;
    }
    setHelpTitle(helpSlideValues[index - 1].title);
    setHelpSubHeading(helpSlideValues[index - 1].subHeading);
    setHelpText(helpSlideValues[index - 1].text);

    setIndex(index - 1);

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

    setErrorText('');
  };

  return (
    // <ValuesProvider>
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
          onScrollBeginDrag={e => {
            if (this && e) {
              this.touchX = e.nativeEvent.contentOffset.x;
            }
          }}
          onScrollEndDrag={e => {
            if (this.touchX - e.nativeEvent.contentOffset.x < -210) {
              const result = validate(colourData[index].title); // did they enter relevant info?
              if (result) {
                // entry is good
                rightPress();
              } else {
                // don't allow them to go forward yet
                refFlatList.current?.scrollToIndex({
                  index,
                  animated: true,
                }); // setIndex(index);
              }
            }
            if (this.touchX - e.nativeEvent.contentOffset.x > 210) {
              leftPress();
            }
          }}
          renderItem={renderMainItem}
          // renderItem={({item}) => {
          // const hasImage = item.image !== null;
          // console.log('MAIN renderItem called');
          // return (
          //   <View style={{width, height, backgroundColor: 'white'}}>
          //     {hasImage && (
          //       <ImageBackground
          //         source={item.image}
          //         resizeMode={'cover'}
          //         style={{flex: 1}}>
          //         <View
          //           style={{
          //             flex: 1,
          //             justifyContent: 'center',
          //             alignItems: 'center',
          //             width: '100%',
          //           }}>
          //           {/* ************************************* */}
          //           <ListSlide
          //             errorText={errorText}
          //             handleCalculate={handleCalculate}
          //             idealWeightStones={idealWeightStones}
          //             idealWeightPounds={idealWeightPounds}
          //             idealWeightKg={idealWeightKg}
          //             itemTitle={item.title}
          //           />
          //           {/* ************************************* */}
          //           <BottomHelp
          //             helpTitle={helpSlideValues[index].title}
          //             helpSubHeading={helpSlideValues[index].subHeading}
          //             helpText={helpSlideValues[index].text}
          //           />
          //         </View>
          //       </ImageBackground>
          //     )}
          //   </View>
          // );
          // }}
        />
      </View>
    </ColourProvider>
    // </ValuesProvider>
  );
}

export default CustomSwiper;

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
  },
  input: {
    height: 70,
    backgroundColor: '#666666',
    color: '#ffffff',
    paddingLeft: 15,
    paddingRight: 15,
  },
});
