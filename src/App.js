import React, { useState, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserContext } from './utils/context';
import { CurrentDay } from './components/currentDay';
import { Dashboard } from './components/dashboard';
import {
  START,
  DASHBOARD,
  EDIT,
  CURRENT_DAY
} from './constants/routes';
import { Authorithation } from './components/Authorithation';
import { fireAuth } from './firebase';
import { EditPage } from './components/edit';
import { BottomMenu } from './components/Menu';

export const MyContext = createContext({});

function App() {
  const [user, isLoading] = useAuthState(fireAuth);

  if (isLoading) {
    return <div>loader</div>;
  }

  return (
    <UserContext.Provider value={user}>
      {user ? (
        <Router>
          <div className="app">
            <Switch>
              <Route path={CURRENT_DAY} component={CurrentDay} />
              <Route path={DASHBOARD} component={Dashboard} />
              <Route path={EDIT} component={EditPage} />
              <Redirect to={CURRENT_DAY} />
            </Switch>
            <BottomMenu />
          </div>
        </Router>
      ) : (
        <Router>
          <div className="app">
            <Switch>
              <Route
                path={START}
                render={({ history }) => (
                  <Authorithation history={history} />
                )}
              />
              <Redirect to={START} />
            </Switch>
          </div>
        </Router>
      )}
    </UserContext.Provider>
  );
}
export default App;
