import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { helmetConfig } from 'config';
import Header from 'components/Header';
import { pageContent } from 'containers/App/App.less';

@asyncConnect([{
  key: 'AppInit',
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    // if (!isInfoLoaded(getState())) {
    //   promises.push(dispatch(loadInfo()));
    // }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])

@connect(
  state => ({ user: state.auth.user }),
  { pushState: push }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    pushState: PropTypes.func.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  };

  static defaultProps = {
    user: {
      name: 'xx'
    }
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  render() {
    return (
      <div id="app">
        <Helmet {...helmetConfig.head} />
        <Header />
        <div className={pageContent} key="pageContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}
