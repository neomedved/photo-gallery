import React from 'react';
import { Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Page from './components/Page';

export default class App extends React.Component {
  render() {
    return <Router history={this.props.history}>
      <Switch>
        <Route path='/error' exact>
          <div>
            <h1>Ошибка</h1>
            <h2>Не удалось получить данные :(</h2>
            <Link to='/'>Вернуться на главную</Link>
          </div>
        </Route>

        <Route path='/:userId/:albumId' component={Page.setParams} exact/>
        
        <Route path='/:userId' component={Page.setParams} exact/>

        <Route path='/' component={Page.setParams} exact/>

        <Redirect path='*' to='/error' />
      </Switch>
    </Router>
  }
};
