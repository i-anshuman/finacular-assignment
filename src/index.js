import React from 'react';
import { render } from 'react-dom';
import './styles/globals.scss';
import Finacular from './app';
import reportWebVitals from './reportWebVitals';

render(
  <React.StrictMode>
    <Finacular />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
