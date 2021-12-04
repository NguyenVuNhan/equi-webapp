import { Subscribe } from '@react-rxjs/core';
import { scheduleAppliance$ } from '@virtue-equi/equi/scheduler/feature/appliance-state';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    {/* TODO: Currently subscribe in global scope to persist changes.
    Update this with real api calls for appliances handling */}
    <Subscribe source$={scheduleAppliance$}>
      <App />
    </Subscribe>
  </React.StrictMode>,
  document.getElementById('root')
);
