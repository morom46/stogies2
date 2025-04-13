import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-8">
          <div className="max-w-md w-full space-y-4">
            <div className="flex items-center justify-center">
              <AlertTriangle className="w-16 h-16 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-center">Something went wrong</h2>
            <p className="text-gray-400 text-center">
              We're sorry, but something went wrong. Please try refreshing the page.
            </p>
            {this.state.error && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-400">Error details:</p>
                <p className="text-red-400 text-sm mt-2">{this.state.error.message}</p>
                {this.state.errorInfo && (
                  <pre className="mt-2 text-xs text-gray-500 overflow-auto max-h-32">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 