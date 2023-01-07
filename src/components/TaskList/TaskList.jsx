import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';
const TaskList = (props) => {
  const { todoData, onDeleted, onToggleCompleted } = props;
  const renderData = todoData.map((x) => {
    return (
      <Task
        id={x.id}
        key={x.id}
        task={x.task}
        completed={x.completed}
        onDeleted={() => onDeleted(x.id)}
        onToggleCompleted={() => onToggleCompleted(x.id)}
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
  todoData: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
};

export default TaskList;
