import React from 'react';
import './App.scss';
import {
  Home,
  homePathName,
  AdminHome,
  adminHomePathName,
  RatingHome,
  ratingHomePathName,
  ResultPage,
  resultPagePathName,
} from "./pages";
import { Route, Switch } from 'react-router-dom'
import { NotificationProvider, ModalProvider, LoaderProvider, ProfileProvider } from './contexts'

function App() {
  return (
    <div className="app">
      <LoaderProvider>
        <NotificationProvider>
          <ModalProvider>
            <ProfileProvider>
              <Switch>
                <Route component={Home} path={homePathName} exact />
                <Route component={AdminHome} path={adminHomePathName} exact />
                <Route component={RatingHome} path={ratingHomePathName} exact />
                <Route component={ResultPage} path={resultPagePathName} exact />
              </Switch>
            </ProfileProvider>
          </ModalProvider>
        </NotificationProvider>
      </LoaderProvider>
    </div>
  );
}

export default App;
