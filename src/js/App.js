import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Page from './components/Page';
import Error from './components/Error';
import { PUBLIC_URL } from './constants/config';

export default function App () {
  return <Router>
    <Switch>
      <Route path={`${PUBLIC_URL}/error`} exact>
        <Error />
      </Route>

      <Route path={`${PUBLIC_URL}/:userId/:albumId/:photoId`} component={Page} exact />

      <Route path={`${PUBLIC_URL}/:userId/:albumId`} component={Page} exact />

      <Route path={`${PUBLIC_URL}/:userId`} component={Page} exact />

      <Route path={`${PUBLIC_URL}/`} component={Page} exact />

      <Redirect path='*' to={`${PUBLIC_URL}/error`} />
    </Switch>
  </Router>;
}
