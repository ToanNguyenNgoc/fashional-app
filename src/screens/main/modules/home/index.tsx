/* eslint-disable prettier/prettier */
import React, { FC } from 'react';
import { Text, View, Animated, SafeAreaView, StatusBar, Platform, ScrollView } from 'react-native';
import { NewArrival } from '@/screens/main/modules/home/components';
import { StyleSheet } from 'react-native';

export const Home: FC = () => {
  return (
    <ScrollView>
      <StatusBar
        animated={true}
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'default'}
        translucent
        backgroundColor="transparent"
      />
      <NewArrival/>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  sectionCnt: {
    paddingHorizontal: 8,
  },
});
