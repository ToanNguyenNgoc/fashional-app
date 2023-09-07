import React from 'react';
// import { SafeAreaView } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Collab, Shop, News, AccountScreen} from './modules';
import {Svg} from '@/assets';

const Tab = createBottomTabNavigator();

export const Main = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, tabBarIcon: () => <Svg.IcUser />}}
      />
      <Tab.Screen name="Collab" component={Collab} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="News" component={News} />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
