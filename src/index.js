// index.js > App 의 진입점 역할
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore } from 'redux';
import reducers from './reducers';

import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  // Provider 컴포넌트로 리덕스를 적용시킬 컴포넌트를 래핑해주면 복잡한 작업들을 대신 처리해 줌
  // component > action > reducer > store
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  // /public/index.html 에서 넘어옴 (id = 'root')
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
