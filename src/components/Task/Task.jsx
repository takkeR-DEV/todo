import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';

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
    dataText: null,
    value: this.props.task,
  };
  interval;

  setStateDataText = () => {
    this.setState({
      dataText: formatDistanceToNow(this.props.time, { includeSeconds: true }),
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
  setTaskValue = (event) => {
    this.setState({ value: event.target.value });
  };
  render() {
    const { id, onToggleCompleted, completed, onDeleted, task, editTask, edit, onSubmitEdit } = this.props;
    const { dataText } = this.state;
    return edit ? (
      <li className="editing">
        <form onSubmit={onSubmitEdit}>
          <input className="edit" type="text" value={this.state.value} onChange={this.setTaskValue} autoFocus />
        </form>
      </li>
    ) : (
      <li className={classNames(null, { completed: completed })}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed} />
          <label htmlFor={id}>
            <span className="description">{task}</span>
            <span className="created">created {dataText} ago</span>
          </label>
          <button className="icon icon-edit" onClick={editTask}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
