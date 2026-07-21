import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-[#080b14] p-8">
          <div className="max-w-md text-center">
            <p className="text-lg font-mono text-destructive mb-2">✗ CRASH</p>
            <p className="text-xs font-mono text-muted-foreground mb-4">
              {this.state.error?.message || "Unknown error"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/30 text-primary font-mono text-xs hover:bg-primary/30 transition-all"
            >
              {`> restart --force`}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
