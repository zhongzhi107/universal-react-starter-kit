import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class NotFound extends Component {
  static propTypes = {
  };

  render() {
    // 使用 API 获取数据

    return (
      <div>
        <Helmet>
          <title>404</title>
        </Helmet>
        <h1>404</h1>
      </div>
    );
  }
}
