import React, { Component } from 'react'
import TodoItem from './TodoItem'
var api = require('./utils/api')


class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      itemInputFieldValue: '',
      editId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAddSubmit = this.handleAddSubmit.bind(this)
    this.returnListElement = this.returnListElement.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.fetchItems = this.fetchItems.bind(this)
    this.handleItemEditClick = this.handleItemEditClick.bind(this)
    this.handleItemEditSubmit = this.handleItemEditSubmit.bind(this)
    this.handleItemEditCancel = this.handleItemEditCancel.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
handleSearch
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
          term: "",
        })
      }.bind(this))
  }

  deleteItem(id) {
    api.deleteTodoListItem(id)
      .then(function(status) {
        if (status === 204) {
            this.setState(prevState => ({
              items: prevState.items.filter(item => item.id !== id) }))
            console.log("Item successfully deleted.")
        } else if (status === 404) {
            console.log("The item that you wanted to delete could not be found.")
        } else {
            console.log("An error occurred while trying to delete the item.")
        }
        }.bind(this))
  }

  returnListElement(item) {
    return (
      <TodoItem key={item.id}
                title={item.title}
                id={item.id}
                deleteItem={this.deleteItem}
                editId={this.state.editId}
                handleEditCancel={this.handleItemEditCancel}
                handleEditClick={this.handleItemEditClick}
                handleEditSubmit={this.handleItemEditSubmit}/>
    )
  }

  handleChange(event) {
    this.setState({
      itemInputFieldValue: event.target.value
    })
  }

  handleAddSubmit(event) {
    event.preventDefault()
    let newItemTitle = document.getElementById('addItemInputField').value
    if (newItemTitle !== "") {
      let newTodoListItem = {title: newItemTitle, todolist: 2}
      api.addTodoListItem(newTodoListItem)
      .then(function(data) {
        this.setState(prevState => ({
          items: [...prevState.items, data] }))
      }.bind(this))
      this.setState({ itemInputFieldValue: '' })
      event.target.reset()
    }
  }

  handleItemEditClick(id) {
    this.setState({
      editId: id
    })
    console.log("handleItemEdit called")
    console.log("editId now: " + this.state.editId)
  }

  handleItemEditSubmit(id, editedItemTitle) {
    if (editedItemTitle !== "") {
      let editedItem = {
        id: id,
        title: editedItemTitle,
        todolist: 2
      }
      api.addTodoListItem(editedItem)
      this.setState(prevState => ({
        items: prevState.items.map(function(item) {
          if (item.id === id) {
            return {id: id, title: editedItemTitle, todolist: 2}
          } else {
            return item
          }
        }),
        editId: null
      }))
    }
  }

  handleItemEditCancel() {
    this.setState({
      editId: null
    })
  }

  handleSearch(event) {
    this.setState({
      term: event.target.value
    })
  }

  searchingFor(term) {
    return function(itemObject) {
      if (term === "") {
        return true
      } else {
        if (itemObject.title.toLowerCase().includes(term.toLowerCase())) {
        return true
        } else {
          return false
        }
      }
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <form>
          <input type="text"
                 placeholder="Search for items..."
                  onChange={this.handleSearch}/>
          <button>Search</button>
        </form>
        <form onSubmit={this.handleAddSubmit}>
          <label>
            Add item:
            <input onChange={this.handleChange} type="text" id="addItemInputField" />
          </label>
          <input type="submit" value="Add" />
        </form>
        <table>
          {this.state.items.filter(this.searchingFor(this.state.term)).map(this.returnListElement)}
        </table>
      </div>
    )
  }
}


export default TodoList