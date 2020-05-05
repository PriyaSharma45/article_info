import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "../src/components/AuthWrapper";
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";

const onRedirectCallback = appState => {
  createBrowserHistory().push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain="dev-mjt5l0yh.eu.auth0.com"
    client_id="BsFc5f88QkaQGOp70q3IpLXPyNOoSLWj"
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
