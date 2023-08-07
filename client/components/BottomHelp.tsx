import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import React, { useContext, useEffect } from 'react'
import { Linking, Text, View, Dimensions } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import ColourContext from '../state/ColourContext'
import { CustomNewBackground } from './CustomNewBackground'

const { height } = Dimensions.get('window')
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
  /* snapPoints are the points where the bottom sheet can be pulled to
  e.g. 200 up, 500 up.

  I changed the view to have a height of 926 - 740, so it's about 25% of the screen.  Therefore the snap points, which are height dependent would now be (approx) 220, 870, 170
  snapPoints={[height - ITEM_HEIGHT, height - 70, ITEM_HEIGHT - 70]}
  The initialSnapIndex is which of the array of snap Points do you snap to 1st.  I have it set to 0 aka the 1st.
  */
  // useEffect(() => {
  //   console.log(
  //     'height:' +
  //       height +
  //       ', height * 0.08:' +
  //       height * 0.08 +
  //       ', height * 0.14:' +
  //       height * 0.14
  //   )
  //   console.log(
  //     'ITEM_HEIGHT:' +
  //       ITEM_HEIGHT +
  //       ', ITEM_HEIGHT - height * 0.1' +
  //       (ITEM_HEIGHT - height * 0.1)
  //   )
  // })

  // const { colourData, index } = useContext(ColourContext)

  return (
    <BottomSheet
      animateOnMount
      backgroundComponent={CustomNewBackground}
      // snapPoints={[100, 300]}
      snapPoints={[
        height > 750 ? height * 0.1 : height * 0.14,
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
        <Text style={{ fontSize: RFPercentage(5), color: 'white' }}>
          {helpSubHeading}
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Text
            style={{
              // color: colourData[index].dominant,
              color: 'white',
              fontSize: RFPercentage(2.5),
            }}
          >
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
                color: 'rgba(255,255,255, 0.8)',
                fontSize: RFPercentage(2),
              }}
            >
              {helpReferenceTitle}
            </Text>
          )}

          {helpReferenceLink !== null && (
            <Text
              style={{ color: 'mediumblue', textDecorationLine: 'underline' }}
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
