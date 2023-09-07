/* eslint-disable prettier/prettier */
import React, { FC } from 'react';
import { Text, View, Animated, SafeAreaView, StatusBar, Platform } from 'react-native';
import { NewArrival } from '@/screens/main/modules/home/components';
import { StyleSheet } from 'react-native';

export const Home: FC = () => {
  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'default'}
        translucent
        backgroundColor="transparent"
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  sectionCnt: {
    paddingHorizontal: 8,
  },
});
