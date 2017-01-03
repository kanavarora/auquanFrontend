import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as submissionActions from 'redux/modules/submissions';

@connect(
  state => ({errorCreate: state.submissions.errorCreate,
    isSuccessfulSubmission: state.submissions.isSuccessfulSubmission,
    loadingCreate: state.submissions.loadingCreate}),
  submissionActions)

export default class CreateSubmission extends Component {
    static propTypes = {
      errorCreate: PropTypes.string,
      isSuccessfulSubmission: PropTypes.bool,
      createSubmission: PropTypes.func,
      loadingCreate: PropTypes.bool,
      problemTitle: PropTypes.string,
      problemId: PropTypes.string,
      closeModalPressed: PropTypes.func,
      successfulySubmitted: PropTypes.func,
    }

  readFile = (ref, title) => {
    const reader = new FileReader();
    const file = ref.files[0];
    const that = this;
    reader.onload = function(upload) {
      that.props.createSubmission(that.props.problemId, title, upload.target.result);
    };
    reader.readAsText(file);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.loadingCreate) {
      return;
    }
    const title = this.refs.title.value;
    this.readFile(this.refs.solutionFile, title);
    // this.props.createSubmission(this.props.problemId, title, solution);
  }

  render() {
    const {errorCreate} = this.props;
    const styles = require('./CreateSubmission.scss');
    return (
        <div className={styles.submissionPage}>
        <button type="button" onClick={this.props.closeModalPressed} className="close">&times;</button>
          <h1>Create Submission</h1>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <p><span>
                <input type="text" ref="title" placeholder="Enter a title" className="form-control"/>
              </span></p>
              <p><span>
                <input type="file" ref="solutionFile" placeholder="Upload solution file" className="form-control"/>
              </span></p>
            </div>
            <button className="btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Submit
            </button>
          </form>
          {errorCreate && <div>{errorCreate}</div>}
        </div>
        );
  }
}
