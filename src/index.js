import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from './store/configureStore';
import reportWebVitals from './reportWebVitals';

const store=configureStore();

ReactDOM.render(
  <Provider store={store}>
  <Router basename={process.env.PUBLIC_URL}>
    <App/>
  </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
