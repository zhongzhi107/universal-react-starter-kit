import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import {initializeWithKey} from 'redux-form';
import * as testActions from 'redux/modules/test';
import {isLoaded, load as loadTest} from 'redux/modules/test';
import {Link} from 'react-router';

@asyncConnect([{
  deferred: true,
  // eslint-disable-next-line
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadTest());
    }
  }
}])

@connect(
  state => ({
    data: state.test.data,
    error: state.test.error,
    loading: state.test.loading
  }),
  {...testActions, initializeWithKey }
)
export default class Test extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const {message} = this.props.data;
    return (
      <div className="container">
        <h1>Test33</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/registry">Registry</Link></li>
        </ul>
        <div>{message}</div>
        <Helmet title="Test title" />
        <button>Click Here</button>
      </div>
    );
  }
}
