import React, {Component} from 'react';
import {Link} from 'react-router';
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
        <ul>
          <li><Link to="/test">Test</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <RegistryForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
