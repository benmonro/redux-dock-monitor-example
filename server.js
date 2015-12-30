"use strict";
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

import { RoutingContext, match } from 'react-router';
import routes from './src/routes';
import createLocation from 'history/lib/createLocation';
import configureStore from './src/store/configureStore';

import { Provider } from 'react-redux';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

const renderFullPage = (html, initialState) => {
  return `<html>
      <head>
        <title>Hello</title>

      </head>
      <body>
        <div id="root">
          ${html}
        </div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>`;
}

app.get('*',(req, res, next) => {next()}, function(req, res) {

  const location = createLocation(req.url);

  match({ routes, location }, (err, redirectLocation, renderProps) => {

    if(err) {
      console.error("err", err);
      return res.status(500).end('Internal server error');
    }
    if(!renderProps) {
      return res.status(404).end('Not found');
    }

    // create store
    //TODO: pass whatever thing from req.session to initial store creation, ony use whatever is needed to pass to store inital state
    //TODO: in nui-express-middleware create function that populates initial data objects for navigation/lang/and footer
    const store = configureStore({});


    const InitialView = (
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    );



      // rendering with inital state
      const componentHTML = ReactDOMServer.renderToString(InitialView);
      const initialState = store.getState();
      res.status(200).end(renderFullPage(componentHTML, initialState))
   ;
  });
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
