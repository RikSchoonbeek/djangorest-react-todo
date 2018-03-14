import React, { Component } from 'react'
import TodoItem from './TodoItem'
var api = require('./utils/api')


class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      itemInputFieldValue: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.returnListElement = this.returnListElement.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  componentDidMount() {
    api.fetchTodoLists()
      .then(function(data) {
        console.log(data)
      })
  }

  deleteItem(key) {
    this.setState(prevState => ({
      items: prevState.items.filter(function(item) {
        return item.key !== key
      })
    }))
  }

  returnListElement(item) {
    return (
      <TodoItem key={item.key} title={item.title} id={item.key} deleteItem={this.deleteItem}/>
    )
  }

  handleChange(event) {
    this.setState({
      itemInputFieldValue: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (document.getElementById('addItemInputField').value !== "") {
      this.setState(prevState => ({
        items: [
          ...prevState.items,
          {
            key: Date.now(),
            title: this.state.itemInputFieldValue
          }
        ],
        itemInputFieldValue: ''
      }))
      event.target.reset()
    }
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add item:
            <input onChange={this.handleChange} type="text" id="addItemInputField" />
          </label>
          <input type="submit" value="Add" />
        </form>
        <ul>
          {this.state.items.map(this.returnListElement)}
        </ul>
      </div>
    )
  }
}


export default TodoList