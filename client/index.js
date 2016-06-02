import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import Router from '../common/router';
import store from '../common/stores/';

const rootEl = document.getElementById('root');

render(
  <AppContainer>
    {Router}
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('../common/router', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('../common/router').default;
    render(
      <AppContainer>
        {NextApp}
      </AppContainer>,
      rootEl
    );
  });
}

module.exports = store;