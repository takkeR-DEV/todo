import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.css';
const TaskList = (props) => {
  const { todoData, onDeleted, onToggleCompleted, editTask, onSubmitEdit, changeTimerValue } = props;
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
            changeTimerValue={(id, timer) => changeTimerValue(id, timer)}
            timer={data.timer}
          />
        );
      })}
    </ul>
  );
};

TaskList.defaultProps = {
  todoData: [],
  onToggleCompleted: () => {},
  onSubmitEdit: () => {},
  onDeleted: () => {},
  editTask: () => {},
  onStop: () => {},
  onStart: () => {},
};

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  onToggleCompleted: PropTypes.func,
  onSubmitEdit: PropTypes.func,
  onDeleted: PropTypes.func,
  editTask: PropTypes.func,
  changeTimerValue: PropTypes.func,
};

export default TaskList;
