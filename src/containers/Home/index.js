import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { initializeWithKey } from 'redux-form';
import homeActions, { isLoaded, load as loadHome } from 'redux/modules/home';
import styles from './Home.less';
import logo from '../../../static/images/touch/logo_144.png';

@asyncConnect([{
  key: 'HomeInit',
  deferred: true,
  // eslint-disable-next-line
  promise: ({store: {dispatch, getState}, location }) => {
    console.log('=====querystring:', location.query);
    const { name } = location.query;
    if (!isLoaded(getState())) {
      return dispatch(loadHome(name));
    }
  }
}])

@connect(
  state => ({
    data: state.home.data,
    error: state.home.error,
    loading: state.home.loading
  }),
  { ...homeActions, initializeWithKey }
)
export default class Home extends Component {
  static propTypes = {
    data: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { data: { message } } = this.props;
    return (
      <div className="container">
        <Helmet title="Home title" />
        <div className={styles.logo}>
          <img src={logo} alt="Universal React Starter Kit" />
          <h1>Universal React Starter Kit</h1>
        </div>
        <h2>Features in this page:</h2>
        <ul>
          <li>Two method for fetching data</li>
          <ul>
            <li>Ajax in browser</li>
            <li>HTTP.Request in server side</li>
          </ul>
        </ul>
        <div>String from API server: {message}</div>
      </div>
    );
  }
}
