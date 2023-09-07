import {color} from '@/themes';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface SectionContainerProps {
  title?: string;
  children?: React.ReactNode;
}

export const SectionContainer: FC<SectionContainerProps> = ({
  title,
  children,
}) => {
  return (
    <View style={style.cnt}>
      <Text style={style.title}>{title}</Text>
      {children}
    </View>
  );
};

const style = StyleSheet.create({
  cnt: {
    backgroundColor: color.white,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: color.primary,
    marginBottom: 4,
  },
});
