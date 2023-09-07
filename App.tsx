/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {queryClient} from '@/configs';
import {AppContextProvider} from '@/context';
import {AppNavigator} from '@/navigators';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppNavigator />
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
