import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
  state = {
    title: '',
    body: '',
  };

  handleInput = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, body } = this.state;

    axios
      .put(`http://localhost:4000/api/v1/todos/${this.props.match.params.id}`, {
        title,
        body,
      })
      .then(() => {
        this.props.getTheTodo(this.props.match.params.id);
        this.setState({ title: this.props.match.params.title , body: this.props.match.params.body });
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInput}
        />

        <label>Description</label>
        <input
          type="text"
          name="body"
          value={this.state.body}
          onChange={this.handleInput}
        />
        <button>Edit Todo</button>
      </form>
    );
  }
}