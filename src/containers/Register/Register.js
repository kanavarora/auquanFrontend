import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user,
    registerError: state.auth.registerError}),
  authActions)
export default class Register extends Component {
  static propTypes = {
    user: PropTypes.object,
    registerError: PropTypes.string,
    registerUser: PropTypes.func,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    // TODO: Check for basic things here before making the login call
    this.props.registerUser(username.value, password.value);
    username.value = '';
    password.value = '';
  }

  render() {
    const {user, registerError} = this.props;
    const styles = require('./Register.scss');
    return (
      <div className={styles.registerPage + ' container'}>
        <Helmet title="Register"/>
        <h1>Register</h1>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
              <input type="password" ref="password" placeholder="Enter password" className="form-control" />
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Register
            </button>
          </form>
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
