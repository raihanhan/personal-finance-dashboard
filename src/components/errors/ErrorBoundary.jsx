import { Component } from "react";

import ErrorState from "../ui/ErrorState";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error("Unhandled UI error:", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#0b101b] p-6">
          <div className="w-full max-w-xl">
            <ErrorState
              title="Something went wrong"
              message="The page could not be displayed. Try again or return to the previous page."
              onRetry={this.handleRetry}
            />
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
