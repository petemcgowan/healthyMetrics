import React, {useState, useEffect, useContext, useMemo} from 'react'
import 'react-native-gesture-handler'
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  ImageBackground,
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'

import {actionCreators, State} from '../redux/index'
import BottomHelp from '../components/BottomHelp'
import ColourContext, {ColourProvider} from '../state/ColourContext'

import ListSlide from './ListSlide'
import axios from 'axios'

const {width, height} = Dimensions.get('window')
const widthBasedDiff = width * 0.85

function CustomSwiper() {
  const {colourData} = useContext(ColourContext)

  const [index, setIndex] = React.useState(0)
  const weightPounds = useSelector((state: State) => state.weightPounds)
  const weightPoundsOnly = useSelector((state: State) => state.weightPoundsOnly)
  const weightStones = useSelector((state: State) => state.weightStones)
  const weightKg = useSelector((state: State) => state.weightKg)
  const heightCm = useSelector((state: State) => state.heightCm)
  const heightFt = useSelector((state: State) => state.heightFt)
  const heightInches = useSelector((state: State) => state.heightInches)
  const heightUnits = useSelector((state: State) => state.heightUnits)
  const weightUnits = useSelector((state: State) => state.weightUnits)

  const dispatch = useDispatch()
  const {updateHasSeenIntro, setReduxIdealWeightKg, setReduxBMICalcResult} =
    bindActionCreators(actionCreators, dispatch)

  const frame = useSelector((state: State) => state.frame)
  // const age = useSelector((state: State) => state.age);
  const gender = useSelector((state: State) => state.gender)
  const [idealWeightPounds, setIdealWeightPounds] = useState(0)
  const [idealWeightStones, setIdealWeightStones] = useState(0)
  const [idealWeightKg, setIdealWeightKg] = useState(0)
  const [bmiCalcResult, setBMICalcResult] = useState(0)

  const [helpSubHeading, setHelpSubHeading] = useState('')
  const [helpText, setHelpText] = useState('')
  const refFlatList = React.useRef(null)
  let trackingScrolling = false

  const [errorText, setErrorText] = useState(null)
  const [newHelpData, setNewHelpData] = React.useState([])

  const value = useMemo(
    () => ({
      colourData,
      index,
    }),
    [index],
  )

  // useEffect notices the change in state index, so changes the Flatlist's scrollToIndex
  useEffect(() => {
    const endpoint =
      'http://ec2-52-23-111-225.compute-1.amazonaws.com:4000/graphql'
    // const endpoint = `http://localhost:4000/graphql`;

    const graphqlQuery = {
      operationName: 'allHelp',
      query: `query allHelp {
        allHelp {
          id
          subHeading
          helpText
          References {
            id
            shortTitle
            title
            link
            HelpId
          }
        }
      }
      `,
      variables: {},
    }

    const fetchHelp = async () => {
      try {
        const config = {
          method: 'post',
          url: endpoint,
          headers: {
            'Content-Type': 'application/json',
          },
          data: graphqlQuery,
        }

        const response = await axios(config)
        const dataResponse = await response.data
        console.log('dataResponse.data.allHelp:', dataResponse.data.allHelp)
        setNewHelpData(dataResponse.data.allHelp)
      } catch (error) {
        console.error('fetchHelp (axios), error:' + error)
        console.log('error.status:' + error.status)

        if (error.response) {
          console.log('client received an error response (5xx, 4xx)')
          console.log(
            'Response Error details:',
            error.config,
            error.request,
            error.message,
            error.response,
          )
        } else if (error.request) {
          console.log('client never received a response, or request never left')
          if (error.request) {
            console.log('error.config:', error.config)
            console.log('error.request:', error.request)
            console.log('error.message:', error.message)
            console.log('error.response:', error.response)
          }

          console.log(
            'Request Error details:',
            error.config,
            error.request,
            error.message,
            error.response,
          )
        }
      }
    }
    fetchHelp()

    updateHasSeenIntro(true)

    refFlatList.current?.scrollToIndex({
      index,
      animated: true,
    })
  }, [index, colourData])

  const handleCalculate = () => {
    const weightIsValidated = validate('weight')
    // resetting on a re-run
    setIdealWeightPounds(0)
    setIdealWeightStones(0)
    setIdealWeightKg(0)
    let heightCmValue = +heightCm
    if (weightIsValidated) {
      if (heightUnits === 'Feet/Inches') {
        // the + makes it a number (for calcs)
        const heightFtInches = +heightFt * 12 + +heightInches
        heightCmValue = heightFtInches * 2.54 // convert to cm
      }

      let weightKgValue = +weightKg
      if (weightUnits === 'Pounds') {
        // divide the kg value by 2.205 for lbs
        weightKgValue = +weightPoundsOnly / 2.205
      }
      if (weightUnits === 'Stones/Pounds') {
        weightKgValue = +weightStones * 12 + +weightPounds
      }

      // BMI CALC
      const heightMSquared = (heightCmValue * heightCmValue) / 100 / 100
      const bmiCalcValue = weightKgValue / heightMSquared
      console.log('bmiCalcValue:', bmiCalcValue)
      setBMICalcResult(bmiCalcValue)

      setReduxBMICalcResult(bmiCalcValue)

      // Note: Weight is not currently used in the calc

      // J. D. Robinson Formula (1983)

      // Male:	52 kg + 1.9 kg per inch over 5 feet (0.748 kg per cm)
      // Female:	49 kg + 1.7 kg per inch over 5 feet (0.3937 kg per cm)

      // 5ft = 60 inches
      let idealWeightInt = 0
      if (gender === 'Male') {
        if (heightCmValue > 152.4) {
          const heightAbove = heightCmValue - 152.4
          const extraWeight = 0.7480319 * heightAbove
          idealWeightInt = 52 + extraWeight
        } else {
          // not over 60 in (152.4 or 5 ft)
          // this is a per cm value, multiplied by height
          idealWeightInt = 0.3412 * heightCmValue //  it's 0.3412 per cm(52kg/152.4)
        }
      } else if (gender === 'Female') {
        if (heightCmValue > 152.4) {
          const heightAbove = heightCmValue - 152.4
          const extraWeight = 0.6692917 * heightAbove
          idealWeightInt = 49 + extraWeight
        } // not over 60 in
        else {
          idealWeightInt = 0.3215 * heightCmValue //  it's 0.34842 per cm(49kg/152.4)
        }
      }
      // Add 10% for a large frame size, and subtract 10% for a small frame size.
      if (frame === 'Small') {
        idealWeightInt -= idealWeightInt * 0.1
      } else if (frame === 'Large') {
        idealWeightInt += idealWeightInt * 0.1
      } // medium needs no mods

      setReduxIdealWeightKg(idealWeightInt) // will be used for AI querying

      let inPounds = idealWeightInt * 2.205

      if (weightUnits === 'kg') {
        // It's already in kg for the calc, no change
        setIdealWeightKg(idealWeightInt)
      }
      if (weightUnits === 'Stones/Pounds') {
        // divide by 14 and round the modulus down or up based on 0.5)
        // show them result in stones and pounds

        let stones = Math.floor(inPounds / 14)
        inPounds = Math.round(inPounds % 14)

        // deal with case where pounds round up to the next stone (making it 14 pounds)
        if (inPounds === 14) {
          stones++
          inPounds = 0
        }
        setIdealWeightStones(stones)
        setIdealWeightPounds(inPounds)
      }
      if (weightUnits === 'Pounds') {
        // show them result in pounds
        setIdealWeightPounds(inPounds)
      }

      setIndex(index + 1) // move to the results slide
    } // weight entry validation
  }

  const validate = title => {
    switch (title) {
      case 'gender': {
        if (gender === '') {
          // they haven't selected anything
          setErrorText('Please select a gender')
          return false
        }
        break
      }
      case 'age': {
        break
      }
      case 'frame': {
        if (frame === '') {
          // they haven't selected anything
          setErrorText('Please select a frame size')
          return false
        }
        break
      }
      case 'units': {
        break
      }
      case 'intro':
      case 'result':
      case 'resultBMI':
        break
      case 'weight': {
        break
      }
      case 'height': {
        break
      }
      default: {
        console.error(
          'Unknown/unhandled value in switch statement :title:' + title,
        )
      }
    }

    return true
  }

  const renderMainItem = ({item}) => {
    const hasImage = item.image !== null

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
                // justifyContent: 'center',
                // alignItems: 'center',
                // marginTop: 120,
                // marginBottom: 100,
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
              {newHelpData.length > 0 && newHelpData[index] && (
                <BottomHelp
                  helpSubHeading={newHelpData[index].subHeading}
                  helpText={newHelpData[index].helpText}
                  helpReferenceTitle={newHelpData[index].References[0].title}
                  helpReferenceLink={newHelpData[index].References[0].link}
                />
              )}
            </View>
          </ImageBackground>
        )}
      </View>
    )
  }

  const leftPress = () => {
    if (index === 0) {
      return
    }
    if (newHelpData[index - 1]) {
      setHelpSubHeading(newHelpData[index - 1].subHeading)
      setHelpText(newHelpData[index - 1].text)
    }

    setIndex(index - 1)

    setErrorText('')
  }

  const rightPress = () => {
    if (index === colourData.length - 1) {
      console.log('index is equal to colourdata.length - 1, RETURNING')
      return
    }
    if (newHelpData[index + 1]) {
      setHelpSubHeading(newHelpData[index + 1].subHeading)
      setHelpText(newHelpData[index + 1].text)
    }

    setIndex(index + 1)

    setErrorText('')
  }

  return (
    <ColourProvider value={value}>
      <View style={styles.container}>
        <Animated.FlatList
          ref={refFlatList}
          initialScrollIndex={index}
          data={colourData}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={e => {
            const swipeDiff = this.touchX - e.nativeEvent.contentOffset.x
            if (trackingScrolling && swipeDiff < -widthBasedDiff) {
              const result = validate(colourData[index].title) // did they enter relevant info?
              if (result) {
                if (index === 5) {
                  handleCalculate()
                }
                // entry is good
                rightPress()
              } else {
                // don't allow them to go forward yet
                refFlatList.current?.scrollToIndex({
                  index,
                  animated: true,
                })
              }
              trackingScrolling = false
            }
            if (trackingScrolling && swipeDiff > widthBasedDiff) {
              leftPress()
              trackingScrolling = false
            }
          }}
          onScrollBeginDrag={e => {
            if (this && e) {
              trackingScrolling = true
              localTouchX = e.nativeEvent.contentOffset.x
              this.touchX = e.nativeEvent.contentOffset.x
            }
          }}
          renderItem={renderMainItem}
        />
      </View>
    </ColourProvider>
  )
}

export default CustomSwiper

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
})
