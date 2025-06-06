'use client';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
  User,
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';

import { ReactNode } from 'react';
import { auth } from './firebase';

interface AuthContextType {
  currentUser: User | null;
  signup: (name: string, email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  tabloading: boolean;
  setTabLoading: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  handleTab: (param: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>({name:"mujahid"});
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState('Personal');
  const [tabloading, setTabLoading] = useState(true);
  
  async function signup(name: string, email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      return userCredential;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to sign up: ${error.message}`);
      } else {
        throw new Error('Failed to sign up: An unknown error occurred.');
      }
    }
  }

  async function login(email: string, password: string): Promise<UserCredential> {
    console.log(email, password)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential)
      return userCredential;

    } catch (error) {
      throw error;
    }
  }

  async function logout(): Promise<void> {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      throw error;
    }
  }

  const handleTab = (param: string) => {
    setActiveTab(param);
    setTabLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    currentUser,
    signup,
    login,
    logout,
    loading,
    setLoading,
    tabloading,
    setTabLoading,
    setActiveTab,
    activeTab,
    handleTab,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};