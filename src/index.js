/* global process */

import React from 'react';
import ReactDOM from 'react-dom';
import merge from 'lodash/merge';
import App from './App';
import { parseStringSettings, loadGoogleFont } from './utils';
import i18nInit from './i18n';
import DEFAULT_SETTINGS from './settings';

// Load 'Roboto' and 'Open Sans' fonts
loadGoogleFont('Roboto');
loadGoogleFont('Open Sans');

const COMPONENT_ID = process.env.COMPONENT_ID || 'fitxes';

// Hook main react component into container
window.addEventListener('load', () => {
  const container = document.getElementById(COMPONENT_ID);
  if (!container)
    console.error(`Error: El document no té cap element amb l'identificador: "${COMPONENT_ID}"`);
  else {
    const settings = merge(DEFAULT_SETTINGS, parseStringSettings(container.dataset));
    i18nInit(settings);
    ReactDOM.render(
      <App {...{ settings }} />,
      container
    );
  }
});
