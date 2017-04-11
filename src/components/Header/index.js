import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { active } from 'containers/App/App.less';
import header from './Header.less';

export default class Header extends Component {
  render() {
    return (
      <ul className={header.nav}>
        <li><IndexLink to="/" activeClassName={active}>Home</IndexLink></li>
        <li><IndexLink to="/about?id=100" activeClassName={active}>About</IndexLink></li>
        <li><IndexLink to="/registry" activeClassName={active}>Registry</IndexLink></li>
        <li><IndexLink to="/chat" activeClassName={active}>Chat</IndexLink></li>
      </ul>
    );
  }
}
