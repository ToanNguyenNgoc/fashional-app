import {FButton} from '@/components';
import {navigate} from '@/navigators';
import {useProfileStore} from '@/stores/zustand';
import {ZProfileState} from '@/stores/zustand/type';
import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

export const AccountScreen: FC = () => {
  const navigation = useNavigation();
  const [profile, logout] = useProfileStore((state: ZProfileState) => [
    state.profile,
    state.logout,
  ]);
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log(profile);
  //   });
  //   return unsubscribe;
  // }, [navigation, profile]);
  console.log(profile);
  return (
    <SafeAreaView>
      <View>
        {!profile ? (
          <FButton
            onPress={() => navigate('SignIn')}
            title="Đăng nhập/Đăng ký"
          />
        ) : (
          <View>
            <Text>{profile?.fullname}</Text>
            <Button mode="contained" onPress={() => logout()}>
              Đăng xuất
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
