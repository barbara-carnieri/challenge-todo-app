import React, { Component } from 'react';
import axios from 'axios';
import EditTodo from './EditTodo';


class DeleteTodo extends Component {
  state= {
    title: '',
    body: '',
  };

  getSingleTodo = () => {
    const { id } = this.props.match.params;
    axios
    .get(`http://localhost:4000/api/v1/todos/${id}`)
    .then( (apiResponse) => {
      const theTodo = apiResponse.data;
      this.setState(theTodo);
    })
    .catch( (err) => console.log(err))
  }
  
  componentDidMount(){
    this.getSingleTodo();
  }


  deleteTodo = () => {
    const { id } = this.props.match.params;

    axios
    .delete(`http://localhost:4000/api/v1/todos/${id}`)
    .then( () => this.props.history.push('/todos')) // causes Router URL change
    .catch( (err) => console.log(err));
  }
  
  
  render() {
    return (
      <div>
        <h3>TODO DETAILS</h3>
        <h2>{this.state.title}</h2>
        <p>{this.state.body}</p>

        <EditTodo getTheTodo={this.getSingleTodo} {...this.props}/>

        <button onClick={() => this.deleteTodo()}>
    	Delete
      	</button>

        
      </div>
    )
  }
}

export default DeleteTodo;