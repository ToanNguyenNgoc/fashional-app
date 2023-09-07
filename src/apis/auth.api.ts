import {axiosConfig} from '@/configs';
import {ResponseDetail, User} from '@/interfaces';

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
};
