/*!
 *  File    : settings.js
 *  Created : 2021-07-06
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  eXeLearning repo
 *  Embeddable front-end for a repository of eXeLearning resources
 *  https://projectes.xtec.cat/exelearning
 *
 *  @source https://github.com/projectestac/exelearning-repo
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2021 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 *  @module
 */

/* global process */

import { loadGoogleFont } from './utils';

export const mainFont = ['Roboto', 'Arial', '"sans-serif"'].join(',');
export const titleFont = ['"Open Sans"', 'Arial', '"sans-serif"'].join(',');
export function initFonts() {
  loadGoogleFont('Roboto');
  loadGoogleFont('Open Sans');
}

export const DEFAULT_THEME = {
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#fbc02d' },
  },
  typography: {
    fontFamily: mainFont,
    fontDisplay: 'swap',
    h1: {
      fontFamily: titleFont,
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontFamily: titleFont,
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontFamily: titleFont,
      fontWeight: 700,
      fontSize: '1.5rem',
      marginBottom: '0.6rem',
    },
    body3: {
      fontFamily: mainFont,
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
  },
};

export const DEFAULT_SETTINGS = {
  csv: process.env.CSV_URL || '',
  theme: DEFAULT_THEME,
  lang: 'ca',
  projectKey: process.env.PROJECT_KEY || 'prj',
  langKey: process.env.LANG_KEY || 'lang',
  langDefault: process.env.LANG_DEFAULT || 'ca',
  shareSites: { twitter: true, facebook: true, telegram: true, whatsapp: true, pinterest: true, email: true, classroom: true },
  shareMeta: { hash: 'eXeLearning,edu', via: 'xtec' },
  facebookId: process.env.FACEBOOK_ID || '',
  logo: process.env.LOGO || '',
  displayTitle: process.env.DISPLAY_TITLE === 'false' ? false : true,
  displaySubtitle: process.env.DISPLAY_SUBTITLE === 'false' ? false : true,
}

export default DEFAULT_SETTINGS;
