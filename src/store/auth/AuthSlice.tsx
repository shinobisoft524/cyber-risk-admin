import { createSlice } from '@reduxjs/toolkit';

interface StateType {
  isLogin: boolean;
  user?: any;
}

const initialState: StateType = {
  isLogin: false,
  user: null,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: StateType, action) => {
      state.isLogin = action.payload.isLogin;
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
