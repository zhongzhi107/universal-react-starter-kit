import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';
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
        <Header />
        <RegistryForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
