import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { loadSubmissions } from 'redux/modules/submissions';
import { asyncConnect } from 'redux-async-connect';
import ReactTable from 'react-table';
import { LinkContainer } from 'react-router-bootstrap';

@asyncConnect([{
  promise: ({store: {dispatch}, params}) => {
    const promises = [];
    promises.push(dispatch(loadSubmissions(params.problemId)));
    return Promise.all(promises);
  }
}])
@connect(
    state => ({user: state.auth.user,
      data: state.submissions.data}))
export default class Submissions extends Component {
  static propTypes = {
    user: PropTypes.object,
    data: PropTypes.object
  }

  render() {
    const {data} = this.props;
    const styles = require('./Submissions.scss');
    const columns = [{
      header: 'Time',
      id: 'date',
      accessor: row => new Date(row.date.$date * 1000).toString(),
      className: styles.dateColumn,
    },
      {
        header: 'Title',
        accessor: 'title',
        id: 'title'
      },
      {
        header: 'Details',
        'id': 'Button for details',
        accessor: row => row._id.$oid,
        className: styles.viewDetailsColumn,
        render: props => <LinkContainer to={'result/' + props.value}>
        <div>View Details</div></LinkContainer>
      }];

    return (
      <div className={styles.submissionsPage}>
      <Helmet title="Submissions"/>
      <ReactTable data={data.submissions} columns={columns}/>
      </div>
      );
  }
}
