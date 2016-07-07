import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <Router
      routes={routes}
      history={browserHistory}
      key={process.env.NODE_ENV !== "production" ? Math.random() : false}
    />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const routes = require('./routes').default;
    render(
      <AppContainer>
        <Router
          routes={routes}
          history={browserHistory}
          key={process.env.NODE_ENV !== "production" ? Math.random() : false}
        />
      </AppContainer>,
      rootEl
    );
  });
}