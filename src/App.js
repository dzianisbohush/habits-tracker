
import React from 'react';
import './App.css';
import { Button } from 'antd';
import TodoApp from './components/TodoApp'
import {CurrentDay} from './components/currentDay'


function App() {
  return (
    <>
      <div className='app'>
        <CurrentDay />
        {/* <TodoApp /> */}
      </div>
    </>
  );
}
export default App;
