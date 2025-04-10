// lib/useAuth.ts

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Store/Store';
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use typed AppDispatch
  const { user, loading, verificationSent } = useSelector((state: RootState) => state.auth); // Use RootState

  

  return { user, loading, verificationSent };
};