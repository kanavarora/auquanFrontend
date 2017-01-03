import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as submissionActions from 'redux/modules/submissions';
import { Problem } from 'components';
import Helmet from 'react-helmet';
import Modal from 'react-modal';
import { CreateSubmission } from 'components';

const PROBLEM1 = {'id': 'problem1',
                  'title': 'Problem 1',
                  'description': 'Description of problem 1'};
const PROBLEM2 = {'id': 'problem2',
                  'title': 'Problem 2',
                  'description': 'Description of problem 2'};

@connect(
    state => ({user: state.auth.user,
               isSuccessfulSubmissionDone: state.auth.isSuccessfulSubmission}),
    submissionActions)
export default class Problems extends Component {
  static propTypes = {
    isSuccessfulSubmissionDone: PropTypes.bool,
    clearSuccessfulSubmission: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      problemData: null,
    };
  }

  openSubmissionForP1 = () => {
    const modalIsOpen = true;
    this.props.clearSuccessfulSubmission();
    this.setState({modalIsOpen: modalIsOpen,
                   problemData: PROBLEM1});
  }

  openSubmissionForP2 = () => {
    const modalIsOpen = true;
    this.props.clearSuccessfulSubmission();
    this.setState({modalIsOpen: modalIsOpen,
                   problemData: PROBLEM2});
  }

  renderSubmissionModal = () => {
    const closeModal = () => {
      this.setState({modalIsOpen: false,
                     problemData: null});
    };
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };
    const shouldClose = false;
    return (
      <Modal
        isOpen={this.state.modalIsOpen && !this.state.isSuccessfulSubmissionDone}
        contentLabel="Submit solution"
        style={customStyles}
        shouldCloseOnOverlayClick={shouldClose}>
        <CreateSubmission
          problemTitle={(this.state.problemData && this.state.problemData.title) ? this.state.problemData.title : ''}
          problemId={(this.state.problemData && this.state.problemData.id) ? this.state.problemData.id : ''}
          closeModalPressed={closeModal}
          successfulySubmitted={closeModal}
        />
      </Modal>
      );
  }

  render() {
    return (
      <div>
      <Helmet title="Problems"/>
      {this.renderSubmissionModal()}
      <h1>List of problems</h1>
      <Problem key="p1" title={PROBLEM1.title} description={PROBLEM1.description} problemId={PROBLEM1.id} onCreateSubmission={this.openSubmissionForP1}/>
      <Problem key="p2" title={PROBLEM2.title} description={PROBLEM2.description} problemId={PROBLEM2.id} onCreateSubmission={this.openSubmissionForP2}/>
      </div>
      );
  }
}
