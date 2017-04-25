import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { active } from 'containers/App/App.less';
import header from './Header.less';

export default class Header extends Component {
  render() {
    return (
      <ul className={header.nav}>
        <li>
          <IndexLink to="/" activeClassName={active}>
            <FormattedMessage id="app.header.menu.home" />
          </IndexLink>
        </li>
        <li>
          <IndexLink to="/chat" activeClassName={active}>
            <FormattedMessage id="app.header.menu.chat" />
          </IndexLink>
        </li>
        <li>
          <IndexLink to="/registry" activeClassName={active}>
            <FormattedMessage id="app.header.menu.form" />
          </IndexLink>
        </li>
        <li>
          <IndexLink to="/about?id=100" activeClassName={active}>
            <FormattedMessage id="app.header.menu.about" />
          </IndexLink>
        </li>
        <li>
          <IndexLink to="/touch" activeClassName={active}>
            <FormattedMessage id="app.header.menu.touch" />
          </IndexLink>
        </li>
      </ul>
    );
  }
}
