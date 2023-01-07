import React, { Component } from 'react';
import './TasksFilter.css';
export default class TaskFilter extends Component {
  state = {
    active: 'All',
  };
  render() {
    const { setFilter } = this.props;
    const { active } = this.state;
    const filters = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }];
    const liFilters = filters.map((el, i) => (
      <li key={i + 1000}>
        <button
          className={active === el.name ? 'selected' : null}
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
