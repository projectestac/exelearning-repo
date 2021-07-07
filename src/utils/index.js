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
  link.href = `http://fonts.googleapis.com/css?family=${fontName}:${weights}&display=swap`;
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
