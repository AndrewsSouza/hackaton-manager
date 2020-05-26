import React from 'react';
import './App.scss';
import { Home, AdminHome, RatingHome } from "./pages";
import { Route, Switch } from 'react-router-dom'
import { NotificationProvider, ModalProvider, LoaderProvider } from './contexts'


function App() {
  return (
    <div className="app">
      <LoaderProvider>
        <NotificationProvider>
          <ModalProvider>
            <Switch>
              <Route component={Home} path='/' exact />
              <Route component={AdminHome} path='/admin' />
              <Route component={RatingHome} path='/rating' />
            </Switch>
          </ModalProvider>
        </NotificationProvider>
      </LoaderProvider>
    </div>
  );
}

export default App;
