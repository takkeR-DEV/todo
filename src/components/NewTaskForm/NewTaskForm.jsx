import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdd: () => {},
  };
  static propTypes = {
    onItemAdd: PropTypes.func,
  };

  state = {
    task: '',
    min: '',
    sec: '',
  };
  onSubmitForm = (e) => {
    const { task, min, sec } = this.state;
    e.preventDefault();
    const timerSec = parseInt(min || 0) * 60 + parseInt(sec || 0) * 1;
    this.props.onItemAdd(task, timerSec);
    this.setState({
      task: '',
      min: '',
      sec: '',
    });
  };
  onChangeInput = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  onChangeInputMin = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onChangeInputSec = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };
  render() {
    const { task, min, sec } = this.state;
    return (
      <form onSubmit={this.onSubmitForm} className="new-todo-form">
        <input className="new-todo" placeholder="Task" onChange={this.onChangeInput} value={task} autoFocus required />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Min"
          onChange={this.onChangeInputMin}
          value={min}
          pattern="[0-9]{\,\2}"
        ></input>
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          onChange={this.onChangeInputSec}
          value={sec}
          pattern="[0-9]{2}"
        ></input>
        <input type="submit" style={{ display: 'none' }} />
      </form>
    );
  }
}
