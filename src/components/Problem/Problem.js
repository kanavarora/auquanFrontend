import React, {Component, PropTypes} from 'react';

export default class Problem extends Component {
  static propTypes = {
    title: PropTypes.object,
    description: PropTypes.string,
  }
	render() {
  const {title, description} = this.props; // eslint-disable-line no-shadow
  // const styles = require('./Problem.scss');
  return (
    <div>
    <div>{title}</div>
    <div>{description}</div>
    </div>
    );
	}
}
