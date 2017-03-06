import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import cx from 'classnames';
import Header from 'components/Header';
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
        <p>query: {JSON.stringify(this.props.location.query)}</p>
        <Header />
      </div>
    );
  }
}
