// Store/authSlice.ts
import { auth } from '@/Authentication/firebase';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, signOut, sendEmailVerification, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { RootState } from './Store';


// Define user type for consistency
interface AuthUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL?: string | null; // Optional, if used
}

// Async thunk for signup
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
        displayName: userCredential.user.displayName || null,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
        displayName: userCredential.user.displayName || null,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

// Async thunk to resend verification email
export const resendVerificationEmail = createAsyncThunk(
  'auth/resendVerificationEmail',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState; // Use imported RootState
    const { user } = state.auth;
    if (!user) return rejectWithValue('No user logged in');
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      } else {
        throw new Error('No authenticated user');
      }
      return true;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk to update profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ displayName, photoURL }: { displayName: string; photoURL: string }, { rejectWithValue }) => {
    try {
      if (!auth.currentUser) {
        throw new Error('No authenticated user');
      }
      await updateProfile(auth.currentUser, { displayName, photoURL });
      return { displayName, photoURL };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as AuthUser | null,
    loading: false,
    error: null as string | null,
    verificationSent: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.verificationSent = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.verificationSent = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.verificationSent = false;
      })
      .addCase(resendVerificationEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.loading = false;
        state.verificationSent = true;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
          ...action.payload,
          email: state.user?.email ?? null,
          uid: state.user?.uid || '',
          emailVerified: state.user?.emailVerified ?? false,
        };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;