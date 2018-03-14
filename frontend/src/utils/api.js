var axios = require('axios')

module.exports = {
  fetchTodoLists: function() {
    var encodedURI = window.encodeURI('http://127.0.0.1:8000/todolist/list/')

    return axios.get(encodedURI)
      .then(function(response) {
        return response.data
      })
  }
}