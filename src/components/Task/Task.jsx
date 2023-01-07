import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';
export default class Task extends Component {
  static defaultProps = {
    setStateDataText: () => {},
    timer: () => {},
  };
  static propTypes = {
    setStateDataText: PropTypes.func,
    timer: PropTypes.func,
  };

  state = {
    data: new Date(),
    dataText: null,
  };
  interval;

  setStateDataText = () => {
    this.setState({
      dataText: formatDistanceToNow(this.state.data, { includeSeconds: true }),
    });
  };
  timer = () => {
    this.interval = setInterval(() => {
      this.setStateDataText();
    }, 1000);
  };

  componentDidMount() {
    this.setStateDataText();
    this.timer();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { id, onToggleCompleted, completed, onDeleted, task } = this.props;
    const { dataText } = this.state;
    return (
      <li className={completed ? 'completed' : null}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onClick={onToggleCompleted} />
          <label htmlFor={id}>
            <span className="description">{task}</span>
            <span className="created">created {dataText} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
