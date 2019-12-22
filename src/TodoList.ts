import { Todo } from './Todo.js'

export class TodoList extends EventTarget {
  items: Todo[]
  constructor() {
    super()
    this.items = []
  }
  addTodo = (todo: Todo) => {
    this.items.push(todo)
  }
  deleteTodo = (id: Todo['id']) => {
    this.items = this.items.filter(todo => todo.id !== id)
  }
  deleteCompletedTodos = () => {
    this.items = this.items.filter(todo => !todo.completedAt)
  }
}
