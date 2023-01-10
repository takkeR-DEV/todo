import React, { Component } from 'react';
import classNames from 'classnames';
import './TasksFilter.css';
export default class TaskFilter extends Component {
  state = {
    active: 'All',
  };
  render() {
    const { setFilter } = this.props;
    const { active } = this.state;
    const filters = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }];
    const liFilters = filters.map((el, index) => (
      <li key={index}>
        <button
          className={classNames(null, { selected: active === el.name })}
          onClick={() => {
            setFilter(el.name);
            this.setState({
              active: el.name,
            });
          }}
        >
          {el.name}
        </button>
      </li>
    ));
    return <ul className="filters">{liFilters}</ul>;
  }
}
