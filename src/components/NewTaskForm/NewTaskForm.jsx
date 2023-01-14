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
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    this.props.onItemAdd(this.state.task);
    this.setState({
      task: '',
    });
  };
  onChangeInput = (e) => {
    this.setState({
      task: e.target.value,
    });
  };
  render() {
    const { task } = this.state;
    return (
      <form onSubmit={this.onSubmitForm}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onChangeInput}
          value={task}
          autoFocus
          required
        />
      </form>
    );
  }
}
