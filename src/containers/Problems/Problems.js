import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import { Problem } from 'components';

const PROBLEM1_TITLE = 'Problem 1';
const PROBLEM1_DESCRIPTION = 'Description of problem1 ';

const PROBLEM2_TITLE = 'Problem 2';
const PROBLEM2_DESCRIPTION = 'Description of problem2 ';

@connect(
    state => ({user: state.auth.user}),
    authActions)
export default class Problems extends Component {
  render() {
    return (
      <div>
      <Problem title={PROBLEM1_TITLE} description={PROBLEM1_DESCRIPTION}/>
      <Problem title={PROBLEM2_TITLE} description={PROBLEM2_DESCRIPTION}/>
      </div>
      );
  }
}
