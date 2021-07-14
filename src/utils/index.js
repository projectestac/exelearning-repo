/*!
 *  File    : utils/index.js
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

import STOP_WORDS from './stopwords.json';

/**
 * Combines a potential `className` field passed in `props` with the element
 * class name specified in `classes.root`
 * @param {Object} props - Inherited properties. Can contain a `className` property. Can also be _null_.
 * @param {Object} classes - Class set to be used. Only the `root` element, if exists, will be re-factorized.
 * @param {String=} root - Optional parameter with an alternative name for the `root` key.
 */
export function mergeClasses(props, classes, root = 'root') {
  if (props && props.className && classes && classes[root])
    classes[root] = `${classes[root]} ${props.className}`;
  return classes;
}

/**
 * Loads the specified Google Font
 * @param {string=} fontName - The name of the Google Font to be loaded. Default is 'Roboto'
 * @param {string=} weights - The desired font weights, separed by comma. Defaults to '300,400,500,700'
 */
export function loadGoogleFont(fontName = 'Roboto', weights = '300,400,500,700') {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css?family=${fontName}:${weights}&display=swap`;
  document.head.appendChild(link);
}

/**
 * Returns a clone of the provided object, interpreting string values staring with "{" or "[" as JSOm expressions that
 * will be parsed and converted to real objects and arrays
 * @param {object} data 
 * @returns object
 */
export function parseStringSettings(data = {}) {
  return Object.keys(data).reduce((result, k) => {
    const v = data[k];
    result[k] = /^[{[]/.test(v) ? JSON.parse(v) : v === 'true' ? true : v === 'false' ? false : v;
    return result;
  }, {});
}

/**
 * Updates window.history.state and the query params of current URL, thus allowing
 * to navigate between different app states
 * @param {object} project - Project to display, or `null` to show the projects list
 * @param {string} projectKey - Key used both as query param on the URL and on the history state object
 * @param {boolean} replace - When `true`, the current state is replaced. Otherwise, a new state is pushed.
 */
export function updateHistoryState(project, projectKey, replace = false) {
  const id = project && project?.id || null;
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  searchParams.set(projectKey, id || '');
  url.search = searchParams.toString();
  window.history[replace ? 'replaceState' : 'pushState']({ ...window.history.state, [projectKey]: id }, document.title, url);
}

/**
 * Returns a large string with all single words in a text fragment, excluding those defined as "stop words"
 * for the specified language.
 * Useful for full text search engines
 * @param {string} text - The text fragment to process
 * @param {string} lang - The code of the language to check for stopwords
 * @returns string - A long string with all words, separed by whitespaces, ignoring duplicates and excluding stopwords.
 */
export function getTextTokens(text, lang) {
  text = text
    // Remove URLS
    .replace(/https?:[-/.\w?=#&%@]+/g, '')
    // Remove ISO dates
    .replace(/\d{4}-\d{2}-\d{2}T[-\w.:]+/g, '')
    // Take symbols as separators
    .replace(/[-_\s(){}[\]#*<>,.;:¿?/'@~=+\\|¡!"£$€^&`´]+/g, ' ')
    // Convert to lower case
    .toLowerCase();

  // Convert text to an array of unique words
  const tokens = Array.from(new Set(text.split(' ')))
    // Exclude stopwords and single chars
    .filter(token => token.length > 1 && !STOP_WORDS[lang].includes(token))
    // Sort list
    .sort();

  return tokens.join(' ');
}

/**
 * Checks id the provided text is a 'stopword' for the specified language
 * @param {string} word - The word to check
 * @param {string} lang - The language to use
 * @returns boolean - `true` if it's a 'stopword'
 */
export function isStopWord(word='', lang){
  return STOP_WORDS[lang].includes(word.trim().toLowerCase());
}
