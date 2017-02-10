import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { active } from 'containers/App/App.less';

export default class Header extends Component {
  render() {
    return (
      <ul>
        <li><IndexLink to="/" activeClassName={active}>Home</IndexLink></li>
        <li><IndexLink to="/about" activeClassName={active}>About</IndexLink></li>
        <li><IndexLink to="/registry" activeClassName={active}>Registry</IndexLink></li>
      </ul>
    );
  }
}
