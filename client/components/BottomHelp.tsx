import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import React, { useContext, useCallback, useEffect } from 'react'
import {
  StyleSheet,
  Linking,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import ColourContext from '../state/ColourContext'
import CustomBackground from './CustomBackground'
import { CustomNewBackground } from './CustomNewBackground'
import { HeaderHandle } from './handles/HeaderHandle'

const { width, height } = Dimensions.get('window')
const ITEM_HEIGHT = height * 0.8

interface BottomHelpProps {
  helpSubHeading: string
  helpText: string
  helpReferenceTitle: string
  helpReferenceLink: string
}

const BottomHelp = ({
  helpSubHeading,
  helpText,
  helpReferenceTitle,
  helpReferenceLink,
}: BottomHelpProps) => {
  // console.log(
  //   "BottomHelp, height:" +
  //     height +
  //     ", ITEM_HEIGHT:" +
  //     ITEM_HEIGHT +
  //     ", width:" +
  //     width
  // );
  // console.log("helpSubHeading:" + helpSubHeading);

  /* snapPoints are the points where the bottom sheet can be pulled to
  e.g. 200 up, 500 up.

  I changed the view to have a height of 926 - 740, so it's about 25% of the screen.  Therefore the snap points, which are height dependent would now be (approx) 220, 870, 170
  snapPoints={[height - ITEM_HEIGHT, height - 70, ITEM_HEIGHT - 70]}
  The initialSnapIndex is which of the array of snap Points do you snap to 1st.  I have it set to 0 aka the 1st.
*/
  const { colourData, index } = useContext(ColourContext)

  // const renderHeaderHandle = useCallback(
  //   (props) => <HeaderHandle {...props} children="Custom Background" />,
  //   []
  // );

  return (
    <BottomSheet
      animateOnMount
      backgroundComponent={CustomNewBackground}
      // backgroundComponent={CustomBackground}
      snapPoints={[
        height > 750 ? height * 0.08 : height * 0.14,
        ITEM_HEIGHT - height * 0.1,
      ]}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
      }}
    >
      <BottomSheetScrollView
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.51,
          shadowRadius: 13.16,
          elevation: 20,
        }}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text style={{ fontSize: 23 }}>{helpSubHeading}</Text>
        <View style={{ marginVertical: 20 }}>
          <Text style={{ color: colourData[index].dominant, fontSize: 17 }}>
            {helpText}
          </Text>

          {helpReferenceTitle !== null && (
            <Text style={{ fontStyle: 'italic', marginTop: 15 }}>
              Reference:{' '}
            </Text>
          )}

          {helpReferenceTitle !== null && (
            <Text
              style={{
                fontStyle: 'italic',
                color: colourData[index].dominant,
                fontSize: 17,
              }}
            >
              {helpReferenceTitle}
            </Text>
          )}

          {helpReferenceLink !== null && (
            <Text
              style={{ color: 'mediumblue' }}
              onPress={() => Linking.openURL(helpReferenceLink)}
            >
              {helpReferenceLink}
            </Text>
          )}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

export default BottomHelp
