import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TokenState {
  token: string
}

const initialState: TokenState = {
  token: '',
}

export const jwtSet = createSlice({
    name: 'jwtState',
    initialState: initialState,
    reducers: {
       setJwtToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      console.log(state.token)
      if(state.token){
        localStorage.setItem('Access_Token', state.token)
      }
    },
    }
})


export const {setJwtToken} = jwtSet.actions;
export default jwtSet.reducer

