/**
 * Global Error Boundary Component
 * Catches and handles errors in the React component tree
 * 
 * @typedef {Object} ErrorBoundaryState
 * @property {boolean} hasError - Whether an error has occurred
 * @property {Error|null} error - The error object
 * @property {import('react').ErrorInfo|null} errorInfo - React error info
 * 
 * @typedef {Object} ErrorBoundaryProps
 * @property {React.ReactNode} children - Child components to wrap
 */
import { Component } from 'react';
import './ErrorBoundary.css';

/**
 * Error Boundary component that catches JavaScript errors in its child component tree
 */
class ErrorBoundary extends Component {
  /**
   * @type {ErrorBoundaryState}
   */
  state = { 
    hasError: false,
    error: null,
    errorInfo: null 
  };

  /**
   * Lifecycle method called when an error is thrown in a child component
   * @param {Error} error - The error that was thrown
   * @returns {ErrorBoundaryState} - Updated state with error flag
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  /**
   * Lifecycle method called after an error has been caught
   * @param {Error} error - The error that was thrown
   * @param {import('react').ErrorInfo} errorInfo - React error info
   */
  componentDidCatch(error, errorInfo) {
    // Log error information to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // You can also log to an error reporting service here
    this.setState({ 
      error: error,
      errorInfo: errorInfo 
    });
  }

  /**
   * Reset the error state to allow retry
   */
  handleRetry = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
  }

  /**
   * Render either the error fallback UI or the children
   * @returns {React.ReactNode}
   */
  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h1 className="error-boundary-title">Wystąpił błąd</h1>
            <p className="error-boundary-message">
              Przepraszamy, wystąpił nieoczekiwany błąd w aplikacji.
            </p>
            <div className="error-boundary-details">
              <p className="error-boundary-error">
                <strong>Błąd:</strong> {this.state.error?.message || 'Nieznany błąd'}
              </p>
            </div>
            <div className="error-boundary-actions">
              <button 
                onClick={this.handleRetry}
                className="error-boundary-retry-button"
              >
                Spróbuj ponownie
              </button>
              <a 
                href="/"
                className="error-boundary-home-button"
              >
                Wróć do strony głównej
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;