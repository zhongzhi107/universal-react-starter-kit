import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { nav, active } from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <ul className={nav}>
        <li>
          <IndexLink to="/" activeClassName={active}>首页</IndexLink>
        </li>
        <li>
          <IndexLink to="/chat" activeClassName={active}>聊天室</IndexLink>
        </li>
        <li>
          <IndexLink to="/registry" activeClassName={active}>表单</IndexLink>
        </li>
        <li>
          <IndexLink to="/about?id=100" activeClassName={active}>关于</IndexLink>
        </li>
      </ul>
    );
  }
}
