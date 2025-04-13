"use client";
import AuthProvider from "@/Authentication/AuthContext";
import TabControl from "@/Hooks/TabControl";
import { store } from "@/Store/Store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <TabControl>
        <Provider store={store}>{children}</Provider>
      </TabControl>
    </AuthProvider>
  );
};

export default StoreProvider;
