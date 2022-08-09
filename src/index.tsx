// import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import locale from 'antd/es/locale/zh_CN';
import 'normalize.css';
import './index.less';

import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Link from './Links';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <ConfigProvider locale={locale}>
    <BrowserRouter>
      <Link />
      <Routes />
    </BrowserRouter>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
