import React, { Component } from 'react';

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

class App extends Component {
  maxId = 1;
  state = {
    filter: 'All',
    todoData: [],
  };

  editTask = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((data) => data.id === id);
      const oldData = todoData[index];
      const newData = { ...oldData, edit: !oldData.edit };
      const newArray = [...todoData.slice(0, index), newData, ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onSubmitEdit = (event, id) => {
    event.preventDefault();
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((data) => data.id === id);
      const oldData = todoData[index];
      const newData = { ...oldData, edit: !oldData.edit, task: event.target[0].value };
      const newArray = [...todoData.slice(0, index), newData, ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text, time) => {
    if (text) {
      const newItem = {
        id: this.maxId++,
        task: text,
        completed: false,
        edit: false,
        time: new Date(),
        timer: time,
      };
      this.setState(({ todoData }) => {
        const newArray = [...todoData, newItem];
        return {
          todoData: newArray,
        };
      });
    }
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((data) => data.id === id);
      const oldData = todoData[index];
      const newData = { ...oldData, completed: !oldData.completed };
      const newArray = [...todoData.slice(0, index), newData, ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  getRender = () => {
    switch (this.state.filter) {
      case 'All':
        return this.state.todoData;
      case 'Active':
        return this.state.todoData.filter((el) => !el.completed);
      case 'Completed':
        return this.state.todoData.filter((el) => el.completed);
      default:
        break;
    }
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  countActive = () => {
    const newArray = [];
    this.state.todoData.forEach((el) => {
      if (!el.completed) {
        newArray.push(el);
      }
    });
    return newArray.length;
  };

  removeCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = [];
      todoData.forEach((el) => {
        if (!el.completed) {
          newArray.push(el);
        }
      });
      return {
        todoData: newArray,
      };
    });
  };

  //Замена значения

  // changeItemInData = (id, value) => {
  //   this.setState(({ todoData }) => {
  //     const index = todoData.findIndex((el) => el.id === id);

  //     const oldItem = todoData[index];
  //     const newItem = { ...oldItem, [value]: !oldItem[value] };
  //     const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
  //     return {
  //       todoData: newArray,
  //     };
  //   });
  // };

  // Установка таймера

  changeTimerValue = (id, value) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => {
        return el.id === id;
      });

      const oldItem = todoData[index];
      if (typeof oldItem === 'undefined') return;
      const newItem = { ...oldItem, timer: value };
      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <Header onItemAdd={this.addItem} />
        <section className="main">
          <TaskList
            todoData={this.getRender()}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            editTask={this.editTask}
            onSubmitEdit={this.onSubmitEdit}
            changeTimerValue={this.changeTimerValue}
          />
          <Footer setFilter={this.setFilter} removeCompleted={this.removeCompleted} countActive={this.countActive} />
        </section>
      </section>
    );
  }
}

export default App;
