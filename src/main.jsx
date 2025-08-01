import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom';
import App from './App'
import './index.css'

root.render(
  <React.StrictMode>
    <HashRouter basename="/Weather-Dashboard">
      <App />
    </HashRouter>
  </React.StrictMode>
);
