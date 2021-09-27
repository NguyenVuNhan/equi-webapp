import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './app/App';
import { BatteryProvider } from '@virtue-equi/equi/standby/feature';

ReactDOM.render(
  <React.StrictMode>
    <BatteryProvider>
      <App />
    </BatteryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
