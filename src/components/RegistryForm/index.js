import React, {Component, PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';

@reduxForm({
  form: 'registry',
})
export default class RegistryForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text" placeholder="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text" />
        </div>
      </form>
    );
  }
}
