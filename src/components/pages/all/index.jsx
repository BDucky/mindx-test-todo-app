import React from "react";

const AllTasks = ({ index, item, checkTask }) => {
    return (
        <div className="task-list">
            <div className="task-item" key={index} id={item.id}>
                <div className="list-container">
                    <input type="checkbox" className='task-checkbox' id={item.id} onClick={(e) => checkTask(item, e)} checked={item.isChecked} />
                    <div className="task-text">{item.task}</div>
                </div>
            </div>
        </div>
    )
}

export default AllTasks