import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { initializeWithKey } from 'redux-form';
import homeActions, { isLoaded, load as loadHome } from 'redux/modules/home';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import s from './Home.less';
import logo144 from '../../../static/images/144.png';

@asyncConnect([{
  key: 'HomeInit',
  deferred: true,
  // eslint-disable-next-line
  promise: ({ store: {dispatch, getState}, location }) => {
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
class Home extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { data: { message } } = this.props;
    const { intl } = this.props;
    const title = intl.formatMessage({ id: 'home.title' });
    const keywords = intl.formatMessage({ id: 'home.keywords' });
    const description = intl.formatMessage({ id: 'home.description' });

    return (
      <div className={s.home}>
        <Helmet>
          <title>{title}</title>
          <meta name="keywords" content={keywords} />
          <meta name="description" content={description} />
        </Helmet>
        <h1>
          <FormattedMessage id="home.title" />
        </h1>
        <div className="downloadBar">
          <i className="close" />
          <i className="smallLogo" />
        </div>
        <div className={s.logo}>
          <img src={logo144} alt="Universal React Starter Kit" />
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

export default injectIntl(Home);
