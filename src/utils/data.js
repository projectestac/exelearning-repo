/* global process */

import Papa from 'papaparse';

/**
 * Load the remote dataset
 * @param String url - The URL of the remote CSV file
 * @returns Promise - Resolves to the data array
 */
export function loadData(url) {

  if (!url)
    return Promise.reject(new Error('No heu especificat la ubicació del fitxer CSV'));

  return fetch(url)
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.statusText || 'No s\'han pogut descarregar les dades'} (${response.status})`);
      return response;
    })
    .then(response => response.text())
    .then(text => {
      const results = Papa.parse(text, {
        header: true,
        transformHeader: h => h.toLocaleLowerCase().replace(/\s/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      });
      if (!results || !results.data)
        throw new Error('Dades incorrectes!');
      if (results.errors.length > 0)
        console.error('CSV data parsed with errors', results.errors);
      if (process.env.NODE_ENV === 'development')
        console.log('Data loaded', results);
      return results.data;
    });
}

