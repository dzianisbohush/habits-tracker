import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { MyContext } from '../App';
import Form from './Form'
import TodoList from './TodoList';

export const TodoApp = () => {
    const { user } = useContext(MyContext)
    console.log(user);

    return (
        <>
            <motion.div className='todoapp'>
                <h1>Todo App</h1>
                <Form />
                <TodoList />
            </motion.div>
        </>
    );
}