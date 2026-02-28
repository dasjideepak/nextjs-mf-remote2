import React, { ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Keep this available for monitoring tools in future.
    void error;
    void errorInfo;
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "1rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1>Something went wrong.</h1>
            <button type="button" onClick={this.handleRetry}>
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
