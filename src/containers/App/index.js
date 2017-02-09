import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import cx from 'classnames';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { helmet } from 'config';
import styles from './App.less';

@asyncConnect([{
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
    const pageContentClass = cx(styles.main);

    return (
      <div id="app">
        <Helmet {...helmet.head} />
        <div key="pageContent" className={pageContentClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
