import React from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlixLoader from './Component/FlixLoader';
import FlixToast from './Component/FlixToast';
import {persistor, store} from './Redux/store';
import Routes from './Routes';

import './Helper/console';

LogBox.ignoreLogs([
  'Require cycle: node_modules',
  "Can't perform a React state update on an unmounted component",
  'Non-serializable values were found in the navigation state',
  'new NativeEventEmitter()',
]);

export default App = props => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Routes />
          <FlixToast />
          <FlixLoader />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};
