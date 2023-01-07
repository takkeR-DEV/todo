import React, { Component } from 'react';

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

class App extends Component {
  maxId = 1;
  state = {
    filter: 'All',
    todoData: [
      { id: 100, task: 'TEST', completed: false },
      { id: 101, task: 'TEST', completed: false },
      { id: 102, task: 'TEST', completed: false },
    ],
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

  addItem = (text) => {
    if (text) {
      const newItem = {
        id: this.maxId++,
        task: text,
        completed: false,
      };
      this.setState(({ todoData }) => {
        const newArray = [...todoData, newItem];
        return {
          todoData: newArray,
        };
      });
    } else {
      alert('Поле не может быть пустым,введите вашу задачу в поле ввода! Пример: Закончить React');
    }
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[index];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
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

  render() {
    return (
      <section className="todoapp">
        <Header onItemAdd={this.addItem} />
        <section className="main">
          <TaskList
            todoData={this.getRender()}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
          />
          <Footer setFilter={this.setFilter} removeCompleted={this.removeCompleted} countActive={this.countActive} />
        </section>
      </section>
    );
  }
}

export default App;
