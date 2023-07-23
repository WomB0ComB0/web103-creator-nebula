import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ErrorHandlerProvider } from './hooks/useErrorHandler';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ErrorHandlerProvider>
        <App />
      </ErrorHandlerProvider>
  </React.StrictMode>
);