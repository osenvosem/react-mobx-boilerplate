import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, Notes } from './components/';
import { Router, browserHistory } from 'react-router';
import store from './stores/';

export default (
  <Router history={browserHistory} key={Math.random()}>
    <Route path="/" component={App} store={store}>
      <IndexRoute component={Home} />
      <Route path="notes" component={Notes} />
    </Route>
  </Router>
);