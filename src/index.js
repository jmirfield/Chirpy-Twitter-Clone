import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { AuthProvider } from './context/AuthContext'
import App from './App';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
