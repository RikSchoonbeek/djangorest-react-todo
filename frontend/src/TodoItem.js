import React, { Component } from 'react'


class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editedTitle: null
    }
    this.delete = this.delete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.editCancel = this.editCancel.bind(this)
    this.editClick = this.editClick.bind(this)
    this.editSubmit = this.editSubmit.bind(this)
  }

  delete() {
    this.props.deleteItem(this.props.id)
  }

  handleChange() {
    this.setState({
      editedTitle: document.getElementById('editItemInputField').value
    })
  }

  editClick() {
    this.props.handleEditClick(this.props.id)
    this.setState({
      editedTitle: this.props.title
    })
  }

  editSubmit(event) {
    event.preventDefault()
    this.props.handleEditSubmit(this.props.id, this.state.editedTitle)
  }

  editCancel(event) {
    this.props.handleEditCancel()
  }

  renderInputField() {
    return (
      <form onSubmit={this.editSubmit}>
        <input onChange={this.handleChange}
               type="text"
               defaultValue={this.props.title}
               id="editItemInputField" />
        <input type="submit" value="update" />
        <button type="button" onClick={this.editCancel}>cancel</button>
      </form>
    )
  }

  render() {
    var listElementContent
      if (this.props.id === this.props.editId) {
      console.log('1')
        listElementContent = this.renderInputField()
      } else {
      console.log('2')
        listElementContent = this.props.title
      }
    return (
      <tr>
        <td><button onClick={this.delete}>del</button></td>
        <td><button onClick={this.editClick}>edit</button></td>
        <td>{ listElementContent }</td>
      </tr>
    )
  }
}

export default TodoItem