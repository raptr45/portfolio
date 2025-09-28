"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface LoadingContextType {
  isComponentLoading: (componentId: string) => boolean;
  setComponentLoading: (componentId: string, loading: boolean) => void;
  isAnyLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingComponents, setLoadingComponents] = useState<Set<string>>(
    new Set()
  );

  const setComponentLoading = useCallback(
    (componentId: string, loading: boolean) => {
      setLoadingComponents((prev) => {
        const newSet = new Set(prev);
        if (loading) {
          newSet.add(componentId);
        } else {
          newSet.delete(componentId);
        }
        return newSet;
      });
    },
    []
  );

  const isComponentLoading = useCallback(
    (componentId: string) => {
      return loadingComponents.has(componentId);
    },
    [loadingComponents]
  );

  const isAnyLoading = loadingComponents.size > 0;

  return (
    <LoadingContext.Provider
      value={{
        isComponentLoading,
        setComponentLoading,
        isAnyLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
