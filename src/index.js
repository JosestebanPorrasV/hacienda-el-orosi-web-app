import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoginScreen } from './components/auth/LoginScreen';
import { LoginScreen2 } from './components/auth/LoginScreen2';
import { LoginScreen3 } from './components/auth/LoginScreen3';

ReactDOM.render(
  <React.StrictMode>
    <LoginScreen3 />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
