import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { active } from 'containers/App/App.less';
import header from './Header.less';

export default class Header extends Component {
  render() {
    return (
      <ul className={header.nav}>
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
