/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Svg } from '@/assets';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { style } from './style';

interface FBackButtonProps {
  theme?: 'light' | 'dark'
}

export const FBackButton: FC<FBackButtonProps> = ({ theme = 'dark' }) => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      style={[style.cnt, theme === 'light' ? { backgroundColor: 'transparent' } : {}]}
      onPress={() => navigate.goBack()}
    >
      {
        theme === 'dark' ?
          <Svg.IcArrowLeftWhite fontSize={14} style={style.icon} />
          :
          <Svg.IcArrowLeft fontSize={14} style={style.icon} />
      }
    </TouchableOpacity>
  );
};
