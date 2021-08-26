
import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import { Button } from 'antd';
import {CurrentDay} from './components/currentDay'

import { START, TODO } from './constants/routes'
import { Authorithation } from './components/Authorithation';
import { TodoApp } from './components/TodoApp'

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
            <Redirect to={START} />
          </Switch>
        </div>
      </Router>
    </MyContext.Provider>
  );
}
export default App;
