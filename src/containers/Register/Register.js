import React, {Component} from 'react';
// import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { Signup } from 'components';

export default class Register extends Component {
  render() {
    const styles = require('./Register.scss');
    return (
      <div className={styles.registerPage + ' container'}>
        <Helmet title="Register"/>
        <Signup isModal={false} utmSource={this.props.location.query.utm_source}/>
      </div>
    );
  }
}
