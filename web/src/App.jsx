import React from 'react';
import './App.scss';
import { Home, AdminHome, RatingHome } from "./pages";
import { Route, Switch } from 'react-router-dom'
import { NotificationProvider } from './contexts'

function App() {
  return (
    <div className="app">
      <NotificationProvider>
        <Switch>
          <Route component={Home} path='/' exact />
          <Route component={AdminHome} path='/admin' />
          <Route component={RatingHome} path='/rating' />
        </Switch>
      </NotificationProvider>
    </div>
  );
}

export default App;
