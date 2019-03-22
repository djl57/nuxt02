import axios from 'axios'

class Todo {
  static getInstance() {
    if (!Todo.instance) {
      Todo.instance = new Todo()
    }
    return Todo.instance
  }
  constructor() {}
  getList() {
    return axios.get('/todo/list')
  }
  add(data) {
    return axios.post('/todo/add', data)
  }
  del(data) {
    return axios.post('/todo/del', data)
  }
  done(data) {
    return axios.post('/todo/done', data)
  }
  beDone(data) {
    return axios.post('/todo/beDone', data)
  }
  remove(data) {
    return axios.post('/todo/remove', data)
  }
}

export default Todo.getInstance()
