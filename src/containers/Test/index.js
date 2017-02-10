import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { initializeWithKey } from 'redux-form';
// import * as testActions from 'redux/modules/test';
import testActions, { isLoaded, load as loadTest } from 'redux/modules/test';
import Header from 'components/Header';

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
  { ...testActions, initializeWithKey }
)
export default class Test extends Component {
  static propTypes = {
    data: PropTypes.shape({
      message: PropTypes.string
    }).isRequired,
  };

  render() {
    const { message } = this.props.data;
    return (
      <div className="container">
        <Helmet title="Test title" />
        <h1>Test</h1>
        <Header />
        <div>{message}</div>
        <button>Click Here</button>
      </div>
    );
  }
}
