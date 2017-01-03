const LOAD = 'redux/submissions/LOAD';
const LOAD_SUCCESS = 'redux/submissions/LOAD_SUCCESS';
const LOAD_FAIL = 'redux/submissions/LOAD_FAIL';
const CREATE = 'redux/submissions/CREATE';
const CREATE_SUCCESS = 'redux/submissions/CREATE_SUCCESS';
const CREATE_FAIL = 'redux/submissions/CREATE_FAIL';
const CLEAR_SUBMISSION = 'redux/submissions/CLEAR_SUBMISSION';

const initialState = {
  loaded: false,
  loadedCreate: false,
  data: {},
  isSuccessfulSubmission: false
};

export default function submissions(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: {},
        errorLoad: action.error.error
      };
    case CREATE:
      return {
        ...state,
        loadingCreate: true,
        errorCreate: null,
        isSuccessfulSubmission: false,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        loadingCreate: false,
        loadedCreate: true,
        errorCreate: null,
        isSuccessfulSubmission: true,
        data: action.result
      };
    case CREATE_FAIL:
      return {
        ...state,
        loadingCreate: false,
        loadedCreate: false,
        isSuccessfulSubmission: false,
        errorCreate: action.error.error
      };
    case CLEAR_SUBMISSION:
      return {
        ...state,
        isSuccessfulSubmission: false
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.submissions && globalState.submissions.loaded;
}

export function loadSubmissions(problemId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/api/submissions', {
      data: {
        problemId: problemId,
      }
    })
  };
}

export function createSubmission(problemId, title, solution) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('api/createSubmission', {
      data: {
        problemId: problemId,
        title: title,
        solution: solution,
      }
    })
  };
}

export function clearSuccessfulSubmission() {
  return {
    type: CLEAR_SUBMISSION
  };
}
