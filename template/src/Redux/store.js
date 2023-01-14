import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import ReducerAuth from './reducers/ReducerAuth';

const storage = new MMKVLoader().withInstanceID('Redux').initialize();

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['fetch'],
};

const rootReducer = combineReducers({
  user: ReducerAuth,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
