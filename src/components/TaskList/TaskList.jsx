import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';
const TaskList = (props) => {
  const { todoData, onDeleted, onToggleCompleted, editTask, onSubmitEdit } = props;
  return (
    <ul className="todo-list">
      {todoData.map((data) => {
        return (
          <Task
            id={data.id}
            key={data.id}
            task={data.task}
            completed={data.completed}
            edit={data.edit}
            time={data.time}
            onDeleted={() => onDeleted(data.id)}
            onToggleCompleted={() => onToggleCompleted(data.id)}
            editTask={() => editTask(data.id)}
            onSubmitEdit={(event) => onSubmitEdit(event, data.id)}
          />
        );
      })}
    </ul>
  );
};

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
};

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};

export default TaskList;
