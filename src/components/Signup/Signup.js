import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user,
    registerError: state.auth.registerError}),
  authActions)
export default class Signup extends Component {

  static propTypes = {
    user: PropTypes.object,
    registerError: PropTypes.string,
    registerUser: PropTypes.func,
    isModal: PropTypes.bool,
    closeModalPressed: PropTypes.func,
    utmSource: PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      validationError: null,
    };
  }

  onEditInput = () => {
    this.setState({
      validationError: null
    });
  }

  checkForValidation = (userDetails) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ((userDetails.username === '') || (userDetails.password === '') || (userDetails.firstName === '') || (userDetails.lastName === '')) {
      this.setState({
        validationError: 'Missing fields. Enter all fields and try again.'
      });
      return false;
    }
    if (userDetails.password.length < 6) {
      this.setState({
        validationError: 'Password should be atleast 6 characters long.'
      });
      return false;
    }
    if (!reg.test(userDetails.username)) {
      this.setState({
        validationError: 'Email is not valid.'
      });
      return false;
    }
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    const firstName = this.refs.firstName;
    const lastName = this.refs.lastName;
    const userDetails =
      {
        username: username.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        utmSource: this.props.utmSource ? this.props.utmSource : 'organic'
      };
    // TODO: Check for basic things here before making the login call
    if (!this.checkForValidation(userDetails)) {
      console.log('failed validation');
      return;
    }
    this.props.registerUser(userDetails);
    username.value = '';
    password.value = '';
    firstName.value = '';
    lastName.value = '';
  }

  render() {
    const {user, registerError, isModal, closeModalPressed} = this.props;
    const styles = require('./Signup.scss');
    return (
      <div className={styles.signup}>
      {isModal && <button type="button" onClick={closeModalPressed} className="close">&times;</button>}
        <h1>Signup</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <p><span>
                <input type="text" ref="firstName" placeholder="Enter your first name" className="form-control" onChange={this.onEditInput}/>
              </span></p>
              <p><span>
                <input type="text" ref="lastName" placeholder="Enter your last name" onChange={this.onEditInput} className="form-control"/>
              </span></p>
              <p><span>
                <input type="text" ref="username" placeholder="Enter email (Also your login)" onChange={this.onEditInput} className="form-control"/>
              </span></p>
              <p><span>
                <input type="password" ref="password" placeholder="Enter password" onChange={this.onEditInput} className="form-control" />
              </span></p>
            </div>
            <button className="btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Register
            </button>
          </form>
          {this.state.validationError &&
            <h4>{this.state.validationError}</h4>}
          {registerError &&
            <h4>{registerError}</h4>}
        </div>
        }
        {user &&
        <div>
          <p>You have already registered as {user.username}.</p>
        </div>
        }
      </div>
    );
  }
}
