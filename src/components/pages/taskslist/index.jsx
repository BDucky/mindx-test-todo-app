import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import AllTasks from '../all';
import CompletedTasks from '../completed';

const TaskList = () => {
    const storageTasks = JSON.parse(localStorage.getItem('tasks'));

    const [task, setTask] = useState(storageTasks || []);
    const [isChecked, setIsChecked] = useState(false);
    const [completeTasks, setCompleteTasks] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [renderStatus, setRenderStatus] = useState('All');
    const inputRef = useRef(null);

    console.log(storageTasks);
    const TaskStatus = ["All", "Active", "Completed"]

    const addTask = (e) => {
        if (inputRef.current.value === '') return;
        const newTask = {
            id: task.length + 1,
            task: inputRef.current.value,
            isChecked: false
        };

        setTask(prev => {

            const saveTasks = [...prev, newTask]

            const jsonTasks = JSON.stringify(saveTasks)
            localStorage.setItem('tasks', jsonTasks)

            console.log(jsonTasks)

            return saveTasks
        });
        inputRef.current.value = '';
    }

    const addTaskOnEnter = (e) => {
        if (e.key === 'Enter') {
            if (inputRef.current.value === '') return;
            const newTask = {
                id: task?.length + 1,
                task: inputRef.current.value,
                isChecked: false
            };
            setTask(prev => {

                const saveTasks = [...prev, newTask]

                const jsonTasks = JSON.stringify(saveTasks)
                localStorage.setItem('tasks', jsonTasks)

                console.log(jsonTasks)

                return saveTasks
            });
            inputRef.current.value = '';
        }
    }

    const checkTask = (item, e) => {
        task.map((item) => {
            if (item.id == e.target.id) {
                item.isChecked = !item.isChecked;
                setCompleteTasks(prev => [...prev, item]);
            }
        })
        filterActiveTasks(item);
        filterCompleteTasks(item);
        localStorage.setItem('tasks', JSON.stringify(task));
    }

    const filterCompleteTasks = () => {
        const completed = task.filter((item) => item.isChecked === true);
        setCompleteTasks(completed);
    }

    const filterActiveTasks = () => {
        const active = task.filter((item) => item.isChecked === false);
        setActiveTasks(active);
    }

    const statusRender = (status) => {
        setRenderStatus(status);
    }

    const deleteTask = (id) => {
        const newTasksArray = task.filter((item) => item.id !== id);
        const newCompleteTasksArray = completeTasks.filter((item) => item.id !== id);
        setTask(newTasksArray);
        setCompleteTasks(newCompleteTasksArray);
        localStorage.setItem('tasks', JSON.stringify(newTasksArray));
    }

    const deleteAllCompleted = () => {
        const newTasksArray = task.filter((item) => item.isChecked !== true);
        setTask(newTasksArray);
        setCompleteTasks([]);
        localStorage.setItem('tasks', JSON.stringify(newTasksArray));
    }
    return (
        <>
            <div className="task-status-container">
                <div className="task-status-display">
                    {TaskStatus.map((item, index) => {
                        return <div className="task-status-item" onClick={() => statusRender(item)} key={index}>{item}</div>
                    })}
                </div>
            </div>
            <div className='active-container'>
                <div className="active-tasks">
                    <div className="task-action">
                        <div className="task-input">
                            <input type="text" placeholder='add details' ref={inputRef} onKeyDown={addTaskOnEnter} />
                        </div>
                        <button className='add-btn' onClick={addTask}>Add</button>
                    </div>
                    {renderStatus === 'All' && task?.map((item, index) => { return <AllTasks key={index} item={item} checkTask={checkTask} /> })}
                    {renderStatus === 'Active' && activeTasks?.map((item, index) => { return <AllTasks key={index} item={item} checkTask={checkTask} /> })}
                    {renderStatus === 'Completed' && completeTasks?.map((item, index) => { return (<CompletedTasks key={index} item={item} checkTask={checkTask} deleteTask={deleteTask} />) })}
                    {renderStatus === 'Completed' && <button className='delete-btn' onClick={deleteAllCompleted}>Delete All Completed</button>}
                </div>
            </div>
        </>
    )
}

export default TaskList;