import React from 'react';
import { FormErrors } from './FormErrors';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from './auth-reduser';


export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is incorrect';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
    
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  render() {
    const styleMoldForm = {
      width: '500px',
      margin: 'auto'
    };
const { handleSubmit } = this.props
    return (
      <div>
        <div className="App-header">
          <h2 className="text-header">Workplace Reservation</h2>
        </div>
        <form className="demoForm" style={styleMoldForm} onSubmit={handleSubmit}>
          <h2 className='textForm'>Login up</h2>
          <div className='errorText'>
            <FormErrors formErrors={this.state.formErrors}/>
          </div>
          <div className='form-group'>
            <TextField
              id="outlined-basic"
              label="Email address"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleUserInput}
              className="form-control" name="email"/>
          </div>
          <div className='form-group'>
            <TextField
              id="outlined-password-input"
              type="password"
              label="Password"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleUserInput}
              className="form-control" name="password"
            />
          </div>
          <Button type="submit" className='buttonLogin' variant="contained" color="primary" disabled={!this.state.formValid}>Login up</Button>
        </form>
      </div>
    )
  }

}

const LoginRuduxForm = reduxForm({ form: 'login' })(LoginForm);
const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password);
    console.log(formData.email)
  }
  return <div>
    <LoginRuduxForm onSubmit={onSubmit} />
  </div>
}

export default connect(null, {login})(Login);