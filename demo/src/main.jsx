// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ConfigProvider } from 'antd'; // Antd provider cho theme

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider /* ... */ > 
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)