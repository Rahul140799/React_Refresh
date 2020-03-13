import React, { Component } from 'react';
import Header from './components/layout/Header';
import './App.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
//import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from './components/pages/About';
import axios from 'axios';

class App extends Component{

  state = {
        todos: []
  }

  componentDidMount(){
    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({ todos : res.data }))
  }

  markComplete = (id) => {
    this.setState({ todos : this.state.todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      }) 
    })
  }

  delTodo = (id) => {
    // this.setState({ todos : [...this.state.todos.filter(todo => 
    //   todo.id !== id
    //   )]
    // })
    axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos : [...this.state.todos.filter
        (todo =>todo.id !== id )]
      })
    )
  }

  addTodo = (title) => {
    // const newTodo = {
    //   id:uuidv4(),
    //   title,
    //   completed:false
    // }
    axios.post('http://jsonplaceholder.typicode.com/todos',{
      // id:uuidv4(),
      title,
      completed:false
    })
    .then(res => this.setState({ todos : [...this.state.todos, res.data] })
    )
  }

  render() {
    return(
      <Router>
        <div className="App">
          <Header />
            <Route exact path = "/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />  
              </React.Fragment>
            )} />
          <Route path="/about" component={About} />
        </div>
      </Router>   
    )
  }
}

export default App;
