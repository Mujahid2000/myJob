// Store/authSlice.ts
import { auth } from '@/Authentication/firebase';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './Store';

// Define user type for consistency
interface AuthUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL?: string | null; // Optional, if used
}


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as AuthUser | null,
    loading: false,
    error: null as string | null,
    verificationSent: false,
  },
  reducers: {
     
  },
});

export const {  } = authSlice.actions;
export default authSlice.reducer;
