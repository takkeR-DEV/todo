import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TasksFilter/TasksFilter';
import './Footer.css';

const Footer = ({ setFilter, removeCompleted, countActive }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{countActive()} items left</span>
      <TaskFilter setFilter={setFilter} />
      <button className="clear-completed" onClick={removeCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  setFilter: () => {},
  removeCompleted: () => {},
  countActive: () => {},
};

Footer.propTypes = {
  setFilter: PropTypes.func,
  removeCompleted: PropTypes.func,
  countActive: PropTypes.func,
};

export default Footer;
