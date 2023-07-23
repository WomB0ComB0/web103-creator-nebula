import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
const ErrorHandlerContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export function useErrorHandler() {
  const context = useContext(ErrorHandlerContext);
  if (!context) {
    throw new Error('useErrorHandler must be used within an ErrorHandlerProvider');
  }
  return context;
}
export function ErrorHandlerProvider({ children }) {
  const [error, setError] = useState(null);
  const handleError = (error) => {
    setError(error);
  };
  const clearError = () => {
    setError(null);
  };
  return (
    <ErrorHandlerContext.Provider value={{ error, handleError, clearError }}>
      {children}
    </ErrorHandlerContext.Provider>
  );
}
ErrorHandlerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};