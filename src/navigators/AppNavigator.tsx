/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusApp} from '@/hooks';
import {RootStackParamList} from '@/navigators/type';
import {navigationRef} from '@/navigators/utils';
import {Main, ProductDetailScreen} from '@/screens';
import {SignInScreen} from '@/screens/auth/SignIn';
import {useProfileStore} from '@/stores/zustand';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC, useEffect} from 'react';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: FC = () => {
  const [getProfile] = useProfileStore(state => [state.getProfile]);
  useFocusApp(() => getProfile());
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
