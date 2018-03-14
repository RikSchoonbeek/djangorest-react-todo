import React, { Component } from 'react'
import TodoItem from './TodoItem'
var api = require('./utils/api')


class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      itemInputFieldValue: '',
      id: null,
      title: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.returnListElement = this.returnListElement.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.fetchItems = this.fetchItems.bind(this)
  }

  componentDidMount() {
    this.fetchItems()
  }

  fetchItems() {
    api.fetchTodoList(2)  // ID of list to get items from is now hardcoded -> 2
      .then(function(data) {
        this.setState({
          items: data.todolist_items,
          id: data.todolist.id,
          title: data.todolist.title,
        })
      }.bind(this))
  }

  deleteItem(key) {
    this.setState(prevState => ({
      items: prevState.items.filter(function(item) {
        return item.id !== key
      })
    }))
  }

  returnListElement(item) {
    return (
      <TodoItem key={item.id} title={item.title} id={item.id} deleteItem={this.deleteItem}/>
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
        <h1>{this.state.title}</h1>
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