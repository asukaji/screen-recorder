// import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';

import locale from 'antd/es/locale/zh_CN';
import 'normalize.css';
import './index.less';
// import Recorder from './Recorder';
import FlameGraph from './FlameGraph';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ConfigProvider locale={locale}>
    <FlameGraph />
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
