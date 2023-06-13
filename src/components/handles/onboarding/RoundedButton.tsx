import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface PageProps {
  label: string;
  onPress: any;
}

const RoundedButton = ({label, onPress}: PageProps) => {
  return (
    <TouchableOpacity
      style={{alignItems: 'center', justifyContent: 'center'}}
      onPress={onPress}>
      <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;
