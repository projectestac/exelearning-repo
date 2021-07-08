import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { create } from 'jss';
import App from './App';

// Enclose the react app into a Web Component to avoid undesirable CSS effects
// See:
// https://developer.mozilla.org/en-US/docs/Web/Web_Components
// https://stackoverflow.com/a/57128971/3588740
// https://stackoverflow.com/a/56516753/3896566

class WCRoot extends HTMLElement {

  connectedCallback() {
    const settings = JSON.parse(this.getAttribute('data-settings') || "{}");
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const mountPoint = document.createElement('span');
    // first we need to store a reference to an element INSIDE of the shadow root        
    const reactRoot = shadowRoot.appendChild(mountPoint);

    // now we use that saved reference to create a JSS configuration
    const jss = create({
      ...jssPreset(),
      insertionPoint: reactRoot,
    });

    // finally we need to wrap our application in a StylesProvider
    ReactDOM.render(
      <StylesProvider jss={jss}>
        <App {...{ settings }} />
      </StylesProvider>,
      mountPoint);
  }
}

customElements.define('exelearning-repo', WCRoot);