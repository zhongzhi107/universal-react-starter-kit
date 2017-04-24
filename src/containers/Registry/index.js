import React, { Component } from 'react';
import Helmet from 'react-helmet';
import RegistryForm from 'components/RegistryForm';

export default class Registry extends Component {

  handleSubmit = (values) => {
    console.log(values);
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Registry" />
        <h1>Registry</h1>
        <h2>Features in this page:</h2>
        <ul>
          <li>Form interactive with redux</li>
        </ul>
        <RegistryForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
