
import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { Button, Drawer } from 'antd';
import './App.css';
import {CurrentDay} from './components/currentDay'
import {EditPage} from './components/edit'
import {TodoDashboard} from './components/todoDashboard'

import { START, TODO, TODO_DASHBOARD, EDIT } from './constants/routes'
import { Authorithation } from './components/Authorithation';

export const MyContext = createContext({})

function App() {
  const [user, setUser] = useState({})
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const showDrawer = () => {
    setIsOpenMenu(true);
  };
  const onCloseDrawer = () => {
    setIsOpenMenu(false);
  };
  

  return (

    <MyContext.Provider value={user}>
      <Router>
        <div className='app'>
         <div>
           {/* //@todo add gamburger menu icon instead of Menu word */}
           <Button onClick={showDrawer} >
             Menu
           </Button>
            {/* //@todo move to separate component*/}
           <Drawer
           closable={false}
        placement="right"
        onClose={onCloseDrawer}
        visible={isOpenMenu}
      >
        <Link to={TODO} onClick={onCloseDrawer}>Current day page</Link>
 <Link to={EDIT} onClick={onCloseDrawer}>Edit page</Link>
      </Drawer>
         </div>
          <Switch>
            <Route path={START} render={({ history }) => <Authorithation history={history} setUser={setUser} />} />
            <Route path={TODO} render={() => <CurrentDay />} />
            <Route path={TODO_DASHBOARD} component={TodoDashboard} />
            <Route path={EDIT} component={EditPage} />
            <Redirect to={START} />
          </Switch>
        </div>
      </Router>
    </MyContext.Provider>
  );
}
export default App;
