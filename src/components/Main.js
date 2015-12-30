import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

export default class Main extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <div>
        <div>
        <Link to="/hello">Hello</Link> { ' ' }
        <Link to="/">Counter</Link>
        </div>
          {/* this will render the child routes */}
          {this.props.children}
      </div>
    );
  }
}
