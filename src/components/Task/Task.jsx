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
    changeTimerValue: () => {},
    timer: 0,
    time: new Date(),
  };
  static propTypes = {
    onToggleCompleted: PropTypes.func,
    onSubmitEdit: PropTypes.func,
    onDeleted: PropTypes.func,
    editTask: PropTypes.func,
    changeTimerValue: PropTypes.func,
    timer: PropTypes.number,
    time: PropTypes.object,
  };
  state = {
    dataText: null,
    value: this.props.task,
    timer: this.props.timer,
    pause: true,
    unmount: false,
  };

  setStateDataText = () => {
    this.setState({
      dataText: formatDistanceToNow(this.props.time, { includeSeconds: true }),
    });
  };
  timer = () => {
    this.interval = setInterval(() => {
      this.setStateDataText();
      this.timerRun();
    }, 1000);
  };

  timerRun = () => {
    const { pause, timer } = this.state;

    if (!pause) this.setState({ timer: timer - 1 });
  };

  componentDidMount() {
    this.setStateDataText();
    this.timer();
  }
  componentWillUnmount() {
    const { id, changeTimerValue } = this.props;
    const { timer, unmount } = this.state;
    if (unmount) {
      clearInterval(this.interval);
      changeTimerValue(id, timer);
    }
    this.setState({ unmount: true });
  }
  setTaskValue = (event) => {
    this.setState({ value: event.target.value });
  };

  timerSet = () => {
    const { timer } = this.state;

    if (timer < 0) return '00:00';
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(timer % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  onPlay = () => {
    this.setState({ pause: false });
  };

  onPause = () => {
    this.setState({ pause: true });
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
              <button className="icon icon-play" onClick={this.onPlay}></button>
              <button className="icon icon-pause" onClick={this.onPause}></button>
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
