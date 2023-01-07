import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../NewTaskForm/NewTaskForm';

const Header = (props) => {
  const { onItemAdd } = props;
  return (
    <header>
      <h1>todos</h1>
      <NewTaskForm onItemAdd={onItemAdd} />
    </header>
  );
};
Header.defaultProps = {
  onItemAdd: () => {},
};
Header.propTypes = {
  onItemAdd: PropTypes.func,
};
export default Header;
