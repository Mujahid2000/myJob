'use client'
import AuthProvider from '@/Authentication/AuthContext';
import { store } from '@/Store/Store';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

const StoreProvider = ({children}: {children: ReactNode}) => {
    return (
      <AuthProvider> 
        <Provider store={store}>
          {children}  
        </Provider>
      </AuthProvider>
      
          
    );
};

export default StoreProvider;