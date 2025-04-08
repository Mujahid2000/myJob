

// lib/useAuth.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import {  logout, setUser } from '../Store/authSlice';


export const useAuth = () => {
  const dispatch = useDispatch();
  interface User {
    uid: string;
    email: string | null;
    emailVerified: boolean;
  }

  const { user, loading, verificationSent } = useSelector((state: { auth: { user: User | null; loading: boolean; verificationSent: boolean } }) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
          displayName: firebaseUser.displayName || null,
          photoURL: firebaseUser.photoURL || null, // Include photoURL if used
        }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { user, loading, verificationSent };
};