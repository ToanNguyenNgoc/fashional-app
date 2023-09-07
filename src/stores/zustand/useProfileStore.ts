import {authApi} from '@/apis';
import {REFRESH_TOKEN} from '@/constants';
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
        set(() => ({loading: false}));
      }
    }
  },
}));
