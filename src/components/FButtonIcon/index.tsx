/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface FButtonIconProps extends TouchableOpacityProps {
  icon?: React.JSX.Element;
  size?: number;
  boxType?: 'circle' | 'square';
  style?: StyleProp<ViewStyle>;
}

export const FButtonIcon = (props: FButtonIconProps) => {
  const {size = 32, boxType = 'square'} = props;
  return (
    <TouchableOpacity
      {...props}
      style={[
        style.cnt,
        {
          width: size,
          height: size,
          borderRadius: boxType === 'square' ? 4 : size / 2,
        },
        props.style,
      ]}>
      {props.icon}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  cnt: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
