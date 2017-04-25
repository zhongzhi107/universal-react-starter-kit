import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styles from './Touch.less';

class Touch extends Component {
  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    // 使用 API 获取数据
    const { intl } = this.props;
    const title = intl.formatMessage({ id: 'home.title' });
    const keywords = intl.formatMessage({ id: 'home.keywords' });
    const description = intl.formatMessage({ id: 'home.description' });

    return (
      <div className={cx(styles.touch)}>
        <Helmet>
          <title>{title}</title>
          <meta name="keywords" content={keywords} />
          <meta name="description" content={description} />
        </Helmet>
        <h1>
          <FormattedMessage id="home.title" />
        </h1>
      </div>
    );
  }
}

export default injectIntl(Touch);
