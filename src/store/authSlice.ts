import { createSlice } from '@reduxjs/toolkit';
import { UserData } from 'api/type/user';

const initialState: AuthState = {
  isLogin: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGIN(state, action) {
      state.isLogin = true;
      state.user = {
        ...action.payload,
      };
    },
    LOGOUT(state) {
      state.isLogin = false;
      state.user = null;
    },
    PFUPDATE(state, action) {
      const user = state.user;
      if (user) {
        user.profile = {
          ...action.payload,
        };
      } else {
        console.log('잘못된 접근입니다.');
      }
    },
  },
});

export const { LOGIN, LOGOUT, PFUPDATE } = authSlice.actions;
export default authSlice.reducer;

interface AuthState {
  isLogin: boolean;
  user: UserData | null;
}
