/* eslint-disable react-hooks/exhaustive-deps */
import {User} from '@/interfaces';
import {useProfileStore} from '@/stores/zustand';
import {ZProfileState} from '@/stores/zustand/type';
import React, {createContext, useEffect} from 'react';

export type AppContextType = {
  user: User | null;
};
export const AppContext = createContext<AppContextType | null>(null);
export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
  const [getProfile] = useProfileStore((state: ZProfileState) => [
    state.getProfile,
  ]);
  useEffect(() => {
    getProfile();
  }, []);

  const contextValue = {
    user: null,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
