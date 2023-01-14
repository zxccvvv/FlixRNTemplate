import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    AuthLogin: (state, action) => {
      state.data = action.payload;
    },
    AuthLogout: state => {
      console.log('[ReducerAuth] run');
      state.data = null;
    },
  },
});

export const {AuthLogin, AuthLogout} = AuthSlice.actions;
export default AuthSlice.reducer;
