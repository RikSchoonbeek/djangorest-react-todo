import React, { Component } from 'react'


class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.delete = this.delete.bind(this)
  }

  delete() {
    this.props.deleteItem(this.props.id)
  }

  render() {
    return (
      <li>{this.props.title}
        <button onClick={this.delete}>del</button>
      </li>
    )
  }
}

export default TodoItem