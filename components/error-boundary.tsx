"use client";

import { Button } from "@/components/ui/button";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Something went wrong</h2>
              <Button onClick={() => this.setState({ hasError: false })}>
                Try again
              </Button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
