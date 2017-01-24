import React, {Component} from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import cx from 'classnames';
import styles from './About.less';

export default class About extends Component {
  render() {
    return (
      <div className={cx(styles.about, 'container')}>
        <h1>About</h1>
        <Helmet title="About" />
        <ul>
          <li><Link to="/test">Test</Link></li>
          <li><Link to="/registry">Registry</Link></li>
        </ul>
      </div>
    );
  }
}
