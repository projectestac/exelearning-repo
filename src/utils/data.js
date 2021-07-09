/*!
 *  File    : utils/data.js
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

import Papa from 'papaparse';

/**
 * Loads the CSV dataset
 * @param String url - The URL of the remote CSV file
 * @param Object t - The i18next object used to translate messages
 * @returns Promise - Resolves to the data array
 */
export function loadData(url, t) {

  if (!url)
    return Promise.reject(new Error(t('error_no_source')));

  return fetch(url)
    .then(response => {
      if (!response.ok)
        throw new Error(t('error_network', { code: response.status, text: response.statusText }));
      return response;
    })
    .then(response => response.text())
    .then(text => {
      const results = Papa.parse(text, {
        header: true,
        transformHeader: h => h.toLocaleLowerCase().replace(/\s/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      });
      if (!results || !results.data)
        throw new Error(t('error_bad_data'));
      if (results.errors.length > 0)
        console.error('CSV data parsed with errors', results.errors);
      if (process.env.NODE_ENV === 'development')
        console.log('Data loaded', results);
      return results.data;
    });
}
