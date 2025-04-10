import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, UserCredential, User } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from './firebase';

interface AuthContextType {
    currentUser: User | null;
    signup : (name: string, email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props type for AuthProvider


import { ReactNode } from 'react';

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function signup (name:string, email:string, password:string): Promise<UserCredential>{
        try {
            const UserCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(UserCredential.user,{
                displayName: name
            })
            return UserCredential
        } catch (error) {
           throw error 
        }
    }

    // async function sendEmailVerification(): Promise<void> {
    //     if (auth.currentUser) {
    //         try {
    //             await auth.currentUser.sendEmailVerification();
    //         } catch (error) {
    //             throw error;
    //         }
    //     } else {
    //         throw new Error("No user is currently signed in.");
    //     }
    // }
    
    async function login (email:string, password:string):Promise<UserCredential>{
        try {
            const UserCredential = await signInWithEmailAndPassword(auth, email, password);
        return UserCredential;
        } catch (error) {
             throw error
        }
    }
     async function logout (): Promise<void> {
        try {
            await signOut(auth)
        } catch (error) {
            throw error
        }
     }

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged((user: User | null) =>{
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe()
    }, [])

const value = {
currentUser,
signup,
login,
logout
}
    
return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;