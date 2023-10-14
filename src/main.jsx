import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ErrorHandlerProvider } from './hooks/useErrorHandler';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ErrorHandlerProvider>
        <Router>
          <App />
        </Router>
      </ErrorHandlerProvider>
  </React.StrictMode>
);