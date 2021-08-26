
import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import {CurrentDay} from './components/currentDay'
import {TodoDashboard} from './components/todoDashboard'

import { START, TODO, TODO_DASHBOARD } from './constants/routes'
import { Authorithation } from './components/Authorithation';

export const MyContext = createContext({})

function App() {
  const [user, setUser] = useState({})

  return (

    <MyContext.Provider value={user}>
      <Router>
        <div className='app'>
          <Switch>
            <Route path={START} render={({ history }) => <Authorithation history={history} setUser={setUser} />} />
            <Route path={TODO} render={() => <CurrentDay />} />
            <Route path={TODO_DASHBOARD} component={TodoDashboard} />
            <Redirect to={START} />
          </Switch>
        </div>
      </Router>
    </MyContext.Provider>
  );
}
export default App;
