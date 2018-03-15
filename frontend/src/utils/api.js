var axios = require('axios')

module.exports = {
  // fetchTodoLists: function() {
  //   var encodedURI = window.encodeURI('http://127.0.0.1:8000/todolist/list/')
  //
  //   return axios.get(encodedURI)
  //     .then(function(response) {
  //       return response.data
  //     })
  // },

  fetchTodoList: function(id) {
    var encodedURI = window.encodeURI('http://127.0.0.1:8000/todolist/list/' + id + '/')

    return this.getJsonResponse(encodedURI)
  },

  addTodoListItem: function(newTodoListItem, onSuccess) {
    return axios.post('http://127.0.0.1:8000/todolist/list/item/add/', newTodoListItem)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    });
  },

  deleteTodoListItem: function(id) {
    var encodedURI = window.encodeURI('http://127.0.0.1:8000/todolist/list/item/delete/' + id + '/')

    return axios.get(encodedURI)
      .then(function(response) {
        return response.status
      })
  },

  getJsonResponse: function(encodedURI) {
    return axios.get(encodedURI)
      .then(function(response) {
        return response.data
      })
  }
}