import {User} from '@/interfaces';

export type ZProfileState = {
  profile: User | null;
  loading: boolean;
  getProfile: () => Promise<void>;
};
