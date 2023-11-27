import {axiosConfig} from '@/configs';
import {GOOGLE_WEB_CLIENT_ID} from '@/constants/env-key';
import {ResponseDetail, User} from '@/interfaces';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

export const authApi = {
  login: (body: {email: string; password: string}) => {
    return axiosConfig
      .post('/v1/auth/login', {...body, platform: 'CLIENT_APP'})
      .then<ResponseDetail<User>>(res => res.data);
  },
  profile: () =>
    axiosConfig
      .get('/v1/auth/profile')
      .then<ResponseDetail<User>>(res => res.data),
  loginGoogle: async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return axiosConfig
        .post('/v1/auth/login/google/moba', {
          email: userInfo.user.email,
          name: userInfo.user.name,
          avatar: userInfo.user.photo,
          server_auth_code: GOOGLE_WEB_CLIENT_ID,
        })
        .then<ResponseDetail<User>>(res => res.data);
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
  },
};
