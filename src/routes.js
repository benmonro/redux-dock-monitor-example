import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import * as containers from './containers';


const {
  CounterPage
} = containers;

let HelloPage = React.createClass({
  render() {
    return <div>hello</div>
  }
});

export default (
  <Route component={App}>
    <Route path="/" component={CounterPage} />
    <Route path="/hello" component={HelloPage} />
  </Route>
);
