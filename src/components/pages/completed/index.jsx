import React from "react";
import './index.css';

const CompletedTasks = ({ index, item, checkTask, deleteTask }) => {
    return (
        <div className="task-list">
            <div className="task-item" key={index} id={item.id}>
                <div className="list-container-delete">
                    <input type="checkbox" className='task-checkbox' id={item.id} onClick={(e) => checkTask(item, e)} checked={item.isChecked} readOnly/>
                    <div className="task-text">{item.task}</div>
                    <button onClick={() => deleteTask(item.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default CompletedTasks