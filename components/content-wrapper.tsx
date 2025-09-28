"use client";

import { ReactNode } from "react";
import { useLoadingContext } from "./loading-context";

interface ContentWrapperProps {
  children: ReactNode;
}

export function ContentWrapper({ children }: ContentWrapperProps) {
  const { isInitialLoading } = useLoadingContext();

  return (
    <div
      style={{
        visibility: isInitialLoading ? "hidden" : "visible",
        opacity: isInitialLoading ? 0 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}
