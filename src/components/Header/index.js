import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { active } from 'containers/App/App.less';

export default class Header extends Component {
  render() {
    return (
      <ul>
        <li><IndexLink to="/?name=Joe" activeClassName={active}>Home</IndexLink></li>
        <li><IndexLink to="/about?id=100" activeClassName={active}>About</IndexLink></li>
        <li><IndexLink to="/registry" activeClassName={active}>Registry</IndexLink></li>
      </ul>
    );
  }
}
