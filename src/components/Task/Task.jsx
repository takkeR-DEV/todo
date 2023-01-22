/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Task.css';
export default class Task extends Component {
  static defaultProps = {
    onToggleCompleted: () => {},
    onSubmitEdit: () => {},
    onDeleted: () => {},
    editTask: () => {},
    timer: 0,
    time: new Date(),
  };
  static propTypes = {
    onToggleCompleted: PropTypes.func,
    onSubmitEdit: PropTypes.func,
    onDeleted: PropTypes.func,
    editTask: PropTypes.func,
    timer: PropTypes.number,
    time: PropTypes.object,
  };
  state = {
    dataText: null,
    value: this.props.task,
  };

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
    clearInterval(this.intervalTimer);
  }
  setTaskValue = (event) => {
    this.setState({ value: event.target.value });
  };

  timerSet = () => {
    const { timer } = this.props;

    if (timer < 0) return '0:0';
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(this.props.timer % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  render() {
    const { id, onToggleCompleted, completed, onDeleted, task, editTask, edit, onSubmitEdit } = this.props;
    const { dataText, value, setTaskValue } = this.state;
    return edit ? (
      <li className="editing">
        <form onSubmit={onSubmitEdit}>
          <input className="edit" type="text" defaultValue={value} onChange={setTaskValue} autoFocus />
        </form>
      </li>
    ) : (
      <li className={classNames(null, { completed: completed })}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed} />
          <label htmlFor={id}>
            <span className="title">{task}</span>
            <div className="description">
              <button className="icon icon-play" onClick={this.props.onStart}></button>
              <button className="icon icon-pause" onClick={this.props.onStop}></button>
              <span className="timer">{this.timerSet()}</span>
            </div>
            <span className="created">created {dataText} ago</span>
          </label>
          <button className="icon icon-edit" onClick={editTask}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
