import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
// import reducer from '../../redux/modules/reducer';
import homeActions, { isLoaded, load as loadHome } from './reducer';
import s from './Home.css';
import logo144 from '../../../static/images/144.png';
import { injectAsyncReducer } from '../../redux/create';

@asyncConnect([{
  key: 'home-init',
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
  state => (state),
  { ...homeActions }
)
class Home extends Component {
  static propTypes = {
    // intl: intlShape.isRequired,
    // data: PropTypes.shape({
    //   message: PropTypes.string.isRequired,
    // }),
  };

  // constructor(props) {
  //   super(props);
  // }

  render() {
    // const { data: { message } } = this.props;
    // const { intl } = this.props;
    const title = 'home.title';
    const keywords = 'home.keywords';
    const description = 'home.description';

    return (
      <div className={s.home}>
        <Helmet>
          <title>{title}</title>
          <meta name="keywords" content={keywords} />
          <meta name="description" content={description} />
        </Helmet>
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
      </div>
    );
  }
}

export default (store) => {
  // store.replaceReducer(reducer('home', homeActions));
  // const nodeEnv = process.env.NODE_ENV;
  // process.env.NODE_ENV = 'production';
  injectAsyncReducer(store, 'home', homeActions);
  // process.env.NODE_ENV = nodeEnv;
  return Home;
};
