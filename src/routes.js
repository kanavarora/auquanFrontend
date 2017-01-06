import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    NotFound,
    Login,
    Register,
    /*
    Problems,
    Submissions,
    Result, */
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth());
      checkAuth();
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        { /* <Route path="problems" component={Problems}/> */ }
        { /* <Route path="submissions/:problemId" component={Submissions}/> */ }
        { /* <Route path="result/:resultId" component={Result}/> */ }
      </Route>

      { /* Routes */ }
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
