class Todo {
  static getTodo() {
    if (!Todo.todo) {
      Todo.todo = new Todo()
    }
    return Todo.todo
  }
  constructor() {}
  getList() {
    return this.$axios.get('/todo/list')
  }
}

export default Todo.getTodo()
