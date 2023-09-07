import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {style} from './style';
import {ActivityIndicator} from 'react-native';
import {color} from '@/themes';

interface FButtonProps extends TouchableOpacityProps {
  title: string;
  btnStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
}

export const FButton = (props: FButtonProps) => {
  const {loading = false} = props;
  return (
    <TouchableOpacity
      {...props}
      disabled={loading}
      style={[style.cnt, props.style]}>
      <Text style={style.textCnt}>
        {loading ? (
          <Text style={style.loadCnt}>
            <ActivityIndicator color={color.white} />
          </Text>
        ) : (
          <Text style={[style.text, props.textStyle]}>{props.title}</Text>
        )}
      </Text>
    </TouchableOpacity>
  );
};
