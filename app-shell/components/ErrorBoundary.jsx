import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // State to hold information about the error
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // This lifecycle method is called when an error is thrown
  static getDerivedStateFromError(error) {
    // Update state to indicate that an error has been caught
    return { hasError: true };
  }

  // This lifecycle method is called to log error information
  componentDidCatch(error, errorInfo) {
    // You can log the error or send it to an error reporting service
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    // If there's an error, show the fallback UI
    if (this.state.hasError) {
      return (
        <div className="d-flex flex-column bg-primary ">
          <h2 >Something went wrong with loading remote component</h2>
          <details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Otherwise, render the children as usual
    return this.props.children;
  }
}

export default ErrorBoundary;
