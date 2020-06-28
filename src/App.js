import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Page from './components/Page';
import Error from './components/Error';

export default function App(props) {
  return <Router>
    <Switch>
      <Route path='/error' exact>
        <Error />
      </Route>

      <Route path='/:userId/:albumId' component={Page} exact/>
      
      <Route path='/:userId' component={Page} exact/>

      <Route path='/' component={Page} exact/>

      <Redirect path='*' to='/error' />
    </Switch>
  </Router>
};
