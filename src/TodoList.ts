import { Todo } from './Todo.js'
import { events } from './events.js'

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

export const todoList = new TodoList()

todoList.addEventListener(events.todoCreated, e => {
  const event = (e as any) as { detail: { todo: Todo } }
  todoList.addTodo(event.detail.todo)

  console.log(todoList.items)
})

todoList.addEventListener(events.completedTodosDeleted, () => {
  todoList.deleteCompletedTodos()
})

todoList.addEventListener(events.todoDeleted, e => {
  const event = (e as any) as { detail: { id: Todo['id'] } }
  todoList.deleteTodo(event.detail.id)
})
