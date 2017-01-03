import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

@connect(
    state => ({user: state.auth.user}))
export default class Result extends Component {
  render() {
    return (
      <div>
      <Helmet title="Result"/>
      </div>
      );
  }
}
