import React from 'react';
import TaskList from './pages/taskslist';
import './index.css';

const ToDoApp = () => {

    return (
        <div className='app-container'>
            <h1>#todo</h1>
            <TaskList />
        </div>
    )
}

export default ToDoApp;