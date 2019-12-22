import { Todo } from './Todo.js'

export class TodoList {
  items: Todo[] = []

  addTodo = (todo: Todo) => {
    this.items.push(todo)
  }
  deleteTodo = (id: Todo['id']) => {
    this.items = this.items.filter(todo => todo.id !== id)
  }

  deleteCompletedTodos = () => {
    this.items = this.items.filter(todo => !todo.completedAt)
  }

  sortBy = (type: 'deadline' | 'importance', direction: 'ASC' | 'DESC') => {
    this.items.sort((a, b) => {
      const [x, y] = direction === 'ASC' ? [a, b] : [b, a]

      if (type === 'deadline') {
        return new Date(x.deadline?.value || 0).getTime() - new Date(y.deadline?.value || 0).getTime()
      }

      if (type === 'importance') {
        throw new Error('not implemented')
      }

      throw new Error('in correct sort type')
    })
  }

  getTodos = () => this.items
}
