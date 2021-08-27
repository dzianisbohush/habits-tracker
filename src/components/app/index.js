import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spin } from 'antd';
import styles from './style.module.css';
import { UserContext } from '../../utils/context';
import { CurrentDay } from '../currentDay';
import { Dashboard } from '../dashboard';
import {
  START,
  DASHBOARD,
  EDIT,
  CURRENT_DAY,
} from '../../constants/routes';
import { Authorithation } from '../authorization';
import { fireAuth } from '../../firebase';
import { EditPage } from '../edit';
import { BottomMenu } from '../menu';

export const App = () => {
  const [user, isLoading] = useAuthState(fireAuth);

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <UserContext.Provider value={user}>
      {user ? (
        <Router>
          <div className={styles.app}>
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
          <div className={styles.app}>
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
};
export default App;
