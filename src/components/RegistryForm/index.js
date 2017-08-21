import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

@reduxForm({
  form: 'registry'
})
export default class RegistryForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">
            First Name
            <Field id="firstName" name="firstName" component="input" type="text" placeholder="firstName" />
          </label>
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name
            <Field id="lastName" name="lastName" component="input" type="text" />
          </label>
        </div>
      </form>
    );
  }
}
