import React, {Component, PropTypes} from 'react';
import { LinkContainer } from 'react-router-bootstrap';

export default class Problem extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    problemId: PropTypes.string,
    onCreateSubmission: PropTypes.func
  }
	render() {
  const {title, description, problemId, onCreateSubmission} = this.props; // eslint-disable-line no-shadow
  const styles = require('./Problem.scss');
  return (
    <div className={styles.problem}>
    <div className={styles.title}>{title}</div>
    <div className={styles.description}>{description}</div>
    <LinkContainer to={'/submissions/' + problemId}>
      <button className={styles.viewSubmissions}>View Submissions</button>
    </LinkContainer>
    <button onClick={onCreateSubmission} className={styles.viewSubmissions}>Create Submission</button>
    </div>
    );
	}
}
