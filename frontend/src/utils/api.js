var axios = require('axios')

module.exports = {
  fetchTodoLists: function() {
    var encodedURI = window.encodeURI('http://127.0.0.1:8000/todolist/list/')

    return axios.get(encodedURI)
      .then(function(response) {
        return response.data
      })
  },

  fetchTodoList: function(id) {
    var encodedURI = window.encodeURI('http://127.0.0.1:8000/todolist/list/' + id + '/')

    return this.getJsonResponse(encodedURI)
  },

  // addTodoListItem: function(newTodoListItem) {
  //   var encodedURI = window.encodeURI('http://127.0.0.1:8000/todolist/list/item/create/')
  //
  //   return axios.get(encodedURI, newTodoListItem)
  //     .then(function(response) {
  //       return response.data
  //     })
  // },

  getJsonResponse: function(encodedURI) {
    return axios.get(encodedURI)
      .then(function(response) {
        return response.data
      })
  }
}