import React from 'react';
import ReactDOM from 'react-dom';
import { MainProvider } from './context/MainContext'
import App from './App';
import './index.css';

ReactDOM.render(
  <MainProvider>
    <App />
  </MainProvider>,
  document.getElementById('root')
);
