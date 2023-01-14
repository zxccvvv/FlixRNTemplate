import {create, MMKVLoader} from 'react-native-mmkv-storage';
export const MMKV = new MMKVLoader().initialize();

export const useStorage = create(MMKV);
