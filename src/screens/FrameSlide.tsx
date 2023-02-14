import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';

import FramePicker from '../components/pickers/FramePicker';
import {actionCreators, State} from '../redux/index';

interface FrameSlideProps {
  errorText: string;
}

const FrameSlide = ({errorText}: FrameSlideProps) => {
  const frame = useSelector((state: State) => state.frame);
  console.log('FrameSlide: frame:' + frame);
  const dispatch = useDispatch();
  const {setFrame} = bindActionCreators(actionCreators, dispatch);

  const hasErrors = () => {
    return errorText !== '';
  };

  return (
    <View>
      <Text style={styles.textAbove}>Select</Text>
      <Text style={styles.textBelow}>Frame</Text>
      <FramePicker frame={frame} setFrame={setFrame} />
      <View style={styles.textContainer}>
        <HelperText
          style={{fontSize: 40, color: '#7de6fb'}}
          type="error"
          visible={hasErrors()}>
          {errorText}
        </HelperText>
      </View>
    </View>
  );
};

export default FrameSlide;

const styles = StyleSheet.create({
  textContainer: {
    alignSelf: 'center',
    minWidth: 150,
    height: 75,
  },
  textAbove: {
    alignSelf: 'center',
    width: 'auto',
    textAlign: 'center',
    minWidth: 100,
    color: '#7de6fb', // "#FFCB1F",
    fontSize: 90,
    // fontWeight: "bold",
  },
  textBelow: {
    alignSelf: 'center',
    width: 'auto',
    textAlign: 'center',
    minWidth: 100,
    color: '#7de6fb',
    fontSize: 123,
  },
});
