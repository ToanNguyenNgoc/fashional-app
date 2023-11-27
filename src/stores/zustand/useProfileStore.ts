import {authApi} from '@/apis';
import {ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_EX_AT} from '@/constants';
import {ZProfileState} from '@/stores/zustand/type';
import {storage} from '@/utils';
import {create} from 'zustand';

export const useProfileStore = create<ZProfileState>()(set => ({
  profile: null,
  loading: false,
  getProfile: async () => {
    const refreshToken = await storage.getItem(REFRESH_TOKEN);
    if (refreshToken) {
      try {
        const data = await authApi.profile();
        set(() => ({profile: data.context, loading: false}));
      } catch (error) {
        console.log(error);
        set(() => ({loading: false, profile: null}));
      }
    }
  },
  logout: async () => {
    await storage.removeItem(ACCESS_TOKEN);
    await storage.removeItem(REFRESH_TOKEN);
    await storage.removeItem(TOKEN_EX_AT);
    set(() => ({profile: null}));
  },
}));
