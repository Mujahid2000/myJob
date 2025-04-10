// lib/useAuth.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { logout, setUser } from '../Store/authSlice';
import { AppDispatch, RootState } from '@/Store/Store';


export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use typed AppDispatch
  const { user, loading, verificationSent } = useSelector((state: RootState) => state.auth); // Use RootState

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
            displayName: firebaseUser.displayName || null,
            photoURL: firebaseUser.photoURL || null,
          })
        );
      } else {
        dispatch(logout()); // This should now work without type errors
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { user, loading, verificationSent };
};