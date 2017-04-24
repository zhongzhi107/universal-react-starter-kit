import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import cx from 'classnames';
import styles from './About.less';

export default class About extends Component {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.object
    })
  };

  render() {
    return (
      <div className={cx(styles.about, 'container')}>
        <Helmet title="About" />
        <h1>About</h1>
        <h2>Features in this page:</h2>
        <ul>
          <li>Get querystring from URL</li>
        </ul>
        <p>query: {JSON.stringify(this.props.location.query)}</p>
      </div>
    );
  }
}
