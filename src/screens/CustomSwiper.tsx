import React, {useState, useEffect, useContext, useMemo} from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actionCreators, State} from '../redux/index';
import BottomHelp from '../components/BottomHelp';
import ColourContext, {ColourProvider} from '../state/ColourContext';
// import {ValuesProvider} from '../state/ValuesContext';
import ListSlide from './ListSlide';

const {width, height} = Dimensions.get('window');
const widthBasedDiff = width * 0.85;

function CustomSwiper() {
  const {colourData} = useContext(ColourContext);

  const [index, setIndex] = React.useState(0);
  // const nativeEventPageX = -1; // tracked by mouse move
  // const handlerTouchX = -1; // tracked by mouse move
  const weightPounds = useSelector((state: State) => state.weightPounds);
  const weightPoundsOnly = useSelector(
    (state: State) => state.weightPoundsOnly,
  );
  const weightStones = useSelector((state: State) => state.weightStones);
  const weightKg = useSelector((state: State) => state.weightKg);
  const heightCm = useSelector((state: State) => state.heightCm);
  const heightFt = useSelector((state: State) => state.heightFt);
  const heightInches = useSelector((state: State) => state.heightInches);
  const heightUnits = useSelector((state: State) => state.heightUnits);
  const weightUnits = useSelector((state: State) => state.weightUnits);

  const dispatch = useDispatch();
  const {updateHasSeenIntro} = bindActionCreators(actionCreators, dispatch);

  const frame = useSelector((state: State) => state.frame);
  // const age = useSelector((state: State) => state.age);
  const gender = useSelector((state: State) => state.gender);
  const [idealWeightPounds, setIdealWeightPounds] = useState(0);
  const [idealWeightStones, setIdealWeightStones] = useState(0);
  const [idealWeightKg, setIdealWeightKg] = useState(0);
  const [bmiCalcResult, setBMICalcResult] = useState(0);

  const [helpTitle, setHelpTitle] = useState('');
  const [helpSubHeading, setHelpSubHeading] = useState('');
  const [helpText, setHelpText] = useState('');
  const refFlatList = React.useRef(null);
  let localTouchX = 0;
  let trackingScrolling = false;

  const [errorText, setErrorText] = useState(null);
  console.log('CustomSwiper, width:' + width + ', height:' + height);

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
    {
      subHeading: 'Units',
      text: `Do you weigh yourself in pounds?  Stones and Pounds?  Kg?  Specify that on this page!

Do you measure your height in cm (metric) or feet and inches (imperial)?

Specify here and we'll stick to that unless you change it here...
               `,
      references: [{title: '', link: ''}],
    },
    {
      subHeading: 'Gender',
      text: `Generally, females weigh less than males even though they naturally have a higher percentage of body fat.

      This is because the male body generally has higher muscle mass, and muscle is heavier than fat.

      * Women generally have lower bone density.

      * Last but not least, males tend to be taller than females.`,
      references: [
        {
          title:
            'Sex differences in human adipose tissues: the biology of pear shape',
          link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3411490/',
        },
      ],
    },
    {
      subHeading: 'Age',
      text: `In theory, age shouldn't be a large determinant of an ideal body weight past the ages of 14-15 for girls and 16-17 for boys, after which most people stop growing.

      It is actually expected that human males and females to lose 1.5 and 2 inches in height respectively by age 70.

      It is possible to remove the effects of aging by adopting various habits such as monitoring diet, exercise, stress, supplementation and sleep.`,
      references: [
        {
          title:
            'A Research Agenda: The Changing Relationship Between Body Weight and Health in Aging',
          link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4984841/',
        },
      ],
    },
    {
      subHeading: 'Height',
      text: 'The taller the person, the more muscle mass and body fat they have, which results in more weight. A male at a similar height to a female should weigh about 10-20% heavier.',
      references: [
        {
          title:
            'Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M, Determination of ideal body weight for drug dosage calculations. Am J Hosp Parm 1983',
          link: 'https://pubmed.ncbi.nlm.nih.gov/6869387/',
        },
      ],
    },
    {
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
      references: [
        {
          title: 'How to Measure Your Wrist to Get Your Body Frame Size',
          link: 'https://www.livestrong.com/article/175491-how-to-measure-wrist-size-for-body-frame-measurement/',
        },
      ],
    },
    {
      subHeading: 'Weight',
      text: `

      Although healthy body weight (HBW) today is sometimes based on perceived visual appeal, HBW was actually introduced to estimate dosages for medical use, and the formulas that calculate it are not at all related to how a person looks at a given weight.

      It has since been determined that the metabolism of certain drugs is more based on HBW than it is total body weight. Today, HBW is also used widely throughout sports, since many sports classify people based on their body weight.

      Note that HBW is not a perfect measurement. It does not consider the percentages of body fat and muscle in a person's body. This means that it is possible for highly fit, healthy athletes to be considered overweight based on their HBW.

      This is why HBW should be considered with the perspective that it is an imperfect measure and not necessarily indicative of health, or a weight that a person should necessarily strive toward; it is possible to be over or under your "HBW" and be perfectly healthy.

      How much a person should weigh is not an exact science. It is highly dependent on each individual. Thus far, there is no measure, be it HBW, body mass index (BMI), or any other that can definitively state how much a person should weigh to be healthy.

      They are only references, and it's more important to adhere to making healthy life choices such as regular exercise, eating a variety of unprocessed foods, getting enough sleep, etc. than it is to chase a specific weight based on a generalized formula.

      That being said, many factors can affect the healthy weight; the major factors are listed below. Other factors include health conditions, fat distribution, progeny, etc.`,
      references: [
        {
          title: 'Ideal Body Weight',
          link: 'https://www.sciencedirect.com/topics/medicine-and-dentistry/ideal-body-weight',
        },
      ],
    },
    null,
    // {
    //   subHeading: 'Results',
    //   text: `J. D. Robinson Formula (1983)

    //   Male:	52 kg + 1.9 kg per inch over 5 feet
    //   Female:	49 kg + 1.7 kg per inch over 5 feet

    //   Modification of the Devine Formula.`,
    //   references: [
    //     {
    //       title:
    //         'Robinson JD, Lupkiewicz SM, Palenik L, Lopez LM, Ariet M, Determination of ideal body weight for drug dosage calculations. Am J Hosp Parm 1983',
    //       link: 'https://pubmed.ncbi.nlm.nih.gov/6869387/',
    //     },
    //   ],
    // },
    null,
    null,
  ];

  // useEffect notices the change in state index, so changes the Flatlist's scrollToIndex
  useEffect(() => {
    console.log('App useEffect');
    // We've seen the onboarding, so hide it from now on
    updateHasSeenIntro(true);
    refFlatList.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, [index]);

  const handleCalculate = () => {
    console.log('handleCalculate, frame:' + frame);
    const weightIsValidated = validate('weight');
    //resetting on a re-run
    setIdealWeightPounds(0);
    setIdealWeightStones(0);
    setIdealWeightKg(0);
    let heightCmValue = +heightCm;
    if (weightIsValidated) {
      if (heightUnits === 'Feet/Inches') {
        // the + makes it a number (for calcs)
        const heightFtInches = +heightFt * 12 + +heightInches;
        console.log('handleCalculate, heightFtInches:' + heightFtInches);
        heightCmValue = heightFtInches * 2.54; // convert to cm
      }
      console.log('handleCalculate, heightCmValue:' + heightCmValue);

      let weightKgValue = +weightKg;
      if (weightUnits === 'Pounds') {
        // divide the kg value by 2.205 for lbs
        weightKgValue = +weightPoundsOnly / 2.205;
      }
      if (weightUnits === 'Stones/Pounds') {
        weightKgValue = +weightStones * 12 + +weightPounds;
      }
      console.log(
        'CustomSwiper(after weight conversion), weightKgValue:' + weightKgValue,
      );

      // BMI CALC
      const heightMSquared = (heightCmValue * heightCmValue) / 100 / 100;
      console.log('handleCalculate, heightMSquared:' + heightMSquared);
      const bmiCalcValue = weightKgValue / heightMSquared;
      console.log('handleCalculate, bmiCalcValue:' + bmiCalcValue);
      setBMICalcResult(bmiCalcValue);
      // Todo: weightPoundsOnly (bmi calc)
      // Todo: weightStones / weightPounds (bmi calc)

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
          const extraWeight = 0.7480319 * heightAbove;
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
          const extraWeight = 0.6692917 * heightAbove;
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
        // console.log('ageValue:' + age);
        // if (age === '') {
        //   // they haven't selected anything
        //   setErrorText('Please enter an age');
        //   return false;
        // }
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
        // if (weightUnits === 'kg') {
        //   if (weightKg === '') {
        //     // they haven't selected anything
        //     setErrorText('Please enter a weight in kg');
        //     return false;
        //   }
        // }
        // if (weightUnits === 'Pounds' || weightUnits === 'Stones/Pounds') {
        //   if (weightPounds === '') {
        //     // they haven't selected anything
        //     setErrorText('Please enter a weight in pounds');
        //     return false;
        //   }
        // }
        break;
      }
      case 'height': {
        // todo heightFeet and inches needed here depending on units measure
        // if (heightUnits === 'cm') {
        //   if (heightCm === '') {
        //     // they haven't selected anything
        //     setErrorText('Please enter a height');
        //     return false;
        //   }
        // }
        // if (heightUnits === 'Feet/Inches') {
        //   if (heightFt === '') {
        //     // they haven't selected anything
        //     setErrorText('Please enter a height');
        //     return false;
        //   }
        // }
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
    // console.log('MAIN renderItem called:' + item.title);
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
                bmiCalcResult={bmiCalcResult}
                itemTitle={item.title}
                setIndex={setIndex}
                index={index}
              />
              {/* ************************************* */}
              {helpSlideValues[index] !== null && (
                <BottomHelp
                  helpSubHeading={helpSlideValues[index].subHeading}
                  helpText={helpSlideValues[index].text}
                  helpReferenceTitle={
                    helpSlideValues[index].references[0].title
                  }
                  helpReferenceLink={helpSlideValues[index].references[0].link}
                />
              )}
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
    if (helpSlideValues[index - 1] !== null) {
      // setHelpTitle(helpSlideValues[index - 1].title);
      setHelpSubHeading(helpSlideValues[index - 1].subHeading);
      setHelpText(helpSlideValues[index - 1].text);
    }

    setIndex(index - 1);

    setErrorText('');
  };

  const rightPress = () => {
    if (index === colourData.length - 1) {
      console.log(
        'index:' +
          index +
          ', colourdata.length - 1:' +
          (colourData.length - 1) +
          ', RETURNING',
      );
      console.log('index is equal to colourdata.length - 1, RETURNING');
      return;
    }
    if (helpSlideValues[index + 1] !== null) {
      // setHelpTitle(helpSlideValues[index + 1].title);
      setHelpSubHeading(helpSlideValues[index + 1].subHeading);
      setHelpText(helpSlideValues[index + 1].text);
    }

    console.log('setIndex, index:' + index + ', index + 1:' + (index + 1));
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
          onScroll={e => {
            const swipeDiff = this.touchX - e.nativeEvent.contentOffset.x;
            if (trackingScrolling && swipeDiff < -widthBasedDiff) {
              // console.log(
              //   'SCROLL BELIEVES THIS IS A RIGHT LIVE ONE:' +
              //     swipeDiff +
              //     ', localTouchX:' +
              //     localTouchX +
              //     ', this.touchX:' +
              //     this.touchX,
              // );
              const result = validate(colourData[index].title); // did they enter relevant info?
              if (result) {
                if (index === 5) {
                  // todo enum time!
                  console.log('RUN HANDLECALCULATE');
                  handleCalculate();
                }
                // entry is good
                rightPress();
              } else {
                console.log(
                  'dont allow them to go forward yet:swipeDiff:' + swipeDiff,
                );
                // don't allow them to go forward yet
                refFlatList.current?.scrollToIndex({
                  index,
                  animated: true,
                }); // setIndex(index);
              }
              trackingScrolling = false;
            }
            if (trackingScrolling && swipeDiff > widthBasedDiff) {
              // console.log(
              //   'SCROLL BELIEVES THIS IS A LEFT LIVE ONE:' +
              //     swipeDiff +
              //     ', localTouchX:' +
              //     localTouchX +
              //     ', this.touchX:' +
              //     this.touchX,
              // );
              leftPress();
              trackingScrolling = false;
            }
          }}
          onScrollBeginDrag={e => {
            if (this && e) {
              trackingScrolling = true;
              // console.log(
              //   'BEGINe.nativeEvent.contentOffset.x:' +
              //     e.nativeEvent.contentOffset.x +
              //     ', this.touchX:' +
              //     this.touchX,
              // );
              localTouchX = e.nativeEvent.contentOffset.x;
              this.touchX = e.nativeEvent.contentOffset.x;
            }
          }}
          onScrollEndDrag={e => {
            // const swipeDiff = this.touchX - e.nativeEvent.contentOffset.x;
            // console.log('ENDswipeDiff:' + swipeDiff + ', index:' + index);
            // console.log(
            //   'ENDlocalTouchX:' +
            //     localTouchX +
            //     ', e.nativeEvent.contentOffset.x:' +
            //     e.nativeEvent.contentOffset.x,
            // );
            // if (swipeDiff < -widthBasedDiff) {
            //   console.log(
            //     'ENDPASSED:swipeDiff:' + swipeDiff + ', index:' + index,
            //   );
            //   const result = validate(colourData[index].title); // did they enter relevant info?
            //   if (result) {
            //     if (index === 5) {
            //       // todo enum time!
            //       console.log('RUN HANDLECALCULATE');
            //       handleCalculate();
            //     }
            //     // entry is good
            //     rightPress();
            //   } else {
            //     console.log(
            //       'dont allow them to go forward yet:swipeDiff:' + swipeDiff,
            //     );
            //     // don't allow them to go forward yet
            //     refFlatList.current?.scrollToIndex({
            //       index,
            //       animated: true,
            //     }); // setIndex(index);
            //   }
            // }
            // if (swipeDiff > widthBasedDiff) {
            //   console.log(
            //     'ENDPASSED:swipeDiff:' + swipeDiff + ', index:' + index,
            //   );
            //   leftPress();
            // }
          }}
          renderItem={renderMainItem}
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
