import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';
const TaskList = (props) => {
  const { todoData, onDeleted, onToggleCompleted, editTask, onSubmitEdit } = props;
  const renderData = todoData.map((x) => {
    return (
      <Task
        id={x.id}
        key={x.id}
        task={x.task}
        completed={x.completed}
        edit={x.edit}
        onDeleted={() => onDeleted(x.id)}
        onToggleCompleted={() => onToggleCompleted(x.id)}
        editTask={() => editTask(x.id)}
        onSubmitEdit={(e) => onSubmitEdit(e, x.id)}
      />
    );
  });
  return <ul className="todo-list">{renderData}</ul>;
};

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
};

TaskList.propTypes = {
  // todoData: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};

export default TaskList;
