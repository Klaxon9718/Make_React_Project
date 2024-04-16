import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/**
 index.js
 -최초 진입 시 불려지는 파일
 
 1. ReactDOM.render(컴포넌트, 위치)
    첫 번째 인자에는 일반적인 HTML의 태그처럼 생긴 Component들을 'root'라는 id를 갖고 있는 element에 띄워 달라는 의미
 2. <React.StrictMode>
    코드의 잠재적인 문제점을 파악하기 위한 도구이다. 렌더링은 되지 않아 보이는 UI가 없으며, 미리 잠재적인 문제점들을 경고해주도록 도와준다.
 3. <App />
    App.js에서 만든 Component를 띄운다.
 */