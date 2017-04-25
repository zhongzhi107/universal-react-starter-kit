import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

class NotFound extends Component {
  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    // 使用 API 获取数据
    const { intl } = this.props;
    const title = intl.formatMessage({ id: '404.title' });

    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <h1>
          <FormattedMessage id="404.title" />
        </h1>
      </div>
    );
  }
}

export default injectIntl(NotFound);
