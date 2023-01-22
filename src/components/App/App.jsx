import React, { Component } from 'react';

import Header from '../Header/Header'; // Header
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
        pause: true,
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
    this.changeItemInData(id, 'completed');
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

  changeItemInData = (id, value, boolean) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[index];
      if (typeof boolean === 'undefined') boolean = !oldItem[value];
      const newItem = { ...oldItem, [value]: boolean };
      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  // Установка таймера

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ todoData }) => {
        let newArr = todoData.map((el) => {
          if (el.timer === 0) {
            return el;
          }
          if (!el.pause) {
            el.timer = el.timer - 0.5;
          }
          return el;
        });
        return {
          todoData: newArr,
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onStop = (id) => {
    this.changeItemInData(id, 'pause', true);
  };

  onStart = (id) => {
    this.changeItemInData(id, 'pause', false);
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
            onStop={this.onStop}
            onStart={this.onStart}
          />
          <Footer setFilter={this.setFilter} removeCompleted={this.removeCompleted} countActive={this.countActive} />
        </section>
      </section>
    );
  }
}

export default App;
