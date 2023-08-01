import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

interface PageProps {
  label: string
  onPress: any
}
const RoundedButton = ({ label, onPress }: PageProps) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 58,
        minWidth: 58,
        padding: 10,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: RFPercentage(3.4),
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default RoundedButton
