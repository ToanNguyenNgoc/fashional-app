/* eslint-disable prettier/prettier */
import { FBackButton } from '@/components/FButtonBack';
import React, { FC } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { style } from './style';
import { color, shadow } from '@/themes';

interface HeaderProps {
  title?: string;
  left?: React.JSX.Element;
  boxShadow?: boolean;
  style?: StyleProp<ViewStyle>
}

export const Header: FC<HeaderProps> = ({ title = 'Header title', left, boxShadow = false, style: styleCus }) => {
  return (
    <View style={[style.cnt, boxShadow ? { ...shadow, backgroundColor: color.white } : {}, styleCus]}>
      <FBackButton theme="light" />
      <Text style={style.title}>{title}</Text>
      <View style={style.right}>
        {left}
      </View>
    </View>
  );
};
