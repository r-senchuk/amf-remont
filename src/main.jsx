/**
 * React Application Entry Point
 * Initializes the React application
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

// Import global styles
import './css/design-system.css';
import './css/global.css';
import './css/main.css';
import './css/types.css';
import './css/ol-article.css';
import './css/project.css';

// Remove loading class from body when app is ready
document.body.classList.remove('loading');

// Create React root and render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

