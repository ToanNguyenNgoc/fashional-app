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
import {PaperProvider} from 'react-native-paper';
function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
