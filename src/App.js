import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import './App.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { UserContext } from './utils/context'
import { CurrentDay } from './components/currentDay'
import { TodoDashboard } from './components/todoDashboard'
import { Header } from './components/Header'
import { START, TODO, TODO_TEST, TODO_DASHBOARD } from './constants/routes'
import { Authorithation } from './components/Authorithation'
import { TodoApp } from './components/TodoApp'
import { fireAuth } from './firebase'

function App() {
  const [user, isLoading] = useAuthState(fireAuth)

  return (
    <UserContext.Provider value={user}>
      {isLoading ? (
        <div>loader</div>
      ) : user ? (
        <Router>
          <div className="app">
          <Header />
            <Switch>
              <Route path={TODO_TEST} render={() => <TodoApp />} />
              <Route path={TODO} render={() => <CurrentDay />} />
              <Route path={TODO_DASHBOARD} component={TodoDashboard} />
              <Redirect to={TODO_TEST} />
            </Switch>
          </div>
        </Router>
      ) : (
        <Router>
          <div className="app">
            <Switch>
              <Route
                path={START}
                render={({ history }) => <Authorithation history={history} />}
              />
              <Redirect to={START} />
            </Switch>
          </div>
        </Router>
      )}
    </UserContext.Provider>
  )
}
export default App
