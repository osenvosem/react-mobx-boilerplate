import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.listen(3000);

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const publicPath = '/assets';
app.use(publicPath, express.static(path.join(__dirname, 'public')));

import api from './api/';
app.use('/api/', api);

// Development
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import webpackDevConfig from '../webpack.dev.js';

if (process.env.NODE_ENV === 'development') {
  new webpackDevServer(webpack(webpackDevConfig), {
    publicPath: webpackDevConfig.output.publicPath,
    contentBase: __dirname,
    inline: true,
    hot: true,
    historyApiFallback: true,
    noInfo: true,
    proxy: {
      "/api/*": "http://127.0.0.1:3000"
    }
  }).listen(8080, "localhost", () => { console.log('[WDS started on 8080]'); });
}

// Production
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../app/routes';

if (process.env.NODE_ENV === 'production') {

  // javascript links
  const jsLinks = [
    path.join(publicPath, 'vendor.bundle.js'),
    path.join(publicPath, 'main.bundle.js'),
  ];

  // css links
  const cssLinks = [
    path.join(publicPath, 'styles.bundle.css'),
    "https://fonts.googleapis.com/css?family=Ubuntu:400,300italic,300,400italic,500,500italic,700,700italic"
  ];

  app.get('*', (req, res) => {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        res.render('index', {
          jsLinks,
          cssLinks,
          reactRoot: renderToString(<RouterContext {...renderProps} />)
        });
      } else {
        res.status(404).send('Not found')
      }
    })
  });
}