"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface LoadingContextType {
  isInitialLoading: boolean;
  setInitialLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <LoadingContext.Provider
      value={{
        isInitialLoading,
        setInitialLoading: setIsInitialLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingContext() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
}
