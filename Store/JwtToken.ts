import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TokenState {
  accessToken: string;
  refreshToken: string;
}

const initialState: TokenState = {
  accessToken: typeof window !== 'undefined' ? localStorage.getItem('Access_Token') || '' : '',
  refreshToken: typeof window !== 'undefined' ? localStorage.getItem('Refresh_Token') || '' : '',
}

export const jwtSet = createSlice({
    name: 'jwtState',
    initialState: initialState,
    reducers: {
       setJwtTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      if (!action.payload) return;
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      if(typeof window !== 'undefined'){
        localStorage.setItem('Access_Token', state.accessToken)
        localStorage.setItem('Refresh_Token', state.refreshToken)
      }
    },
    clearJwtTokens: (state) => {
      state.accessToken = ''
      state.refreshToken = ''
      if(typeof window !== 'undefined'){
        localStorage.removeItem('Access_Token')
        localStorage.removeItem('Refresh_Token')
      }
    }
    }
})

export const { setJwtTokens, clearJwtTokens } = jwtSet.actions;
export default jwtSet.reducer
