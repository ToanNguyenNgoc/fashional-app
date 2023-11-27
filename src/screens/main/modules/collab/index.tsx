import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '819581492465-39av2gcn8811t5hqmap0tfeisv1kkd5v.apps.googleusercontent.com',
});

export const Collab = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (err) {
      console.log(JSON.stringify(err));
      const error = err as any;
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <View>
      <Text>Collab</Text>
      <Button
        mode="contained"
        buttonColor="#000"
        // onPress={() => console.log('X')}
        onPress={signIn}>
        Press xxx
      </Button>
    </View>
  );
};
