import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './app/App';
import { BatteryProvider } from '@virtue-equi/equi/standby/feature';
import { PowerStateProvider } from '@virtue-equi/equi-shared-features';

ReactDOM.render(
  <React.StrictMode>
    <BatteryProvider>
      <PowerStateProvider>
        <App />
      </PowerStateProvider>
    </BatteryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
