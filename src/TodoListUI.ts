import { Todo } from './Todo.js'

export class TodoListUI {
  elm: HTMLElement
  deleteTodo: (id: Todo['id']) => void

  constructor(deleteTodo: (id: Todo['id']) => void) {
    const todoListElement = document.getElementById('task-list')
    if (!todoListElement) throw new Error('no todo list element found')
    this.elm = todoListElement
    this.deleteTodo = deleteTodo
  }

  addTodo = (todo: Todo) => {
    const row = document.createElement('tr')
    row.innerHTML = this.createRowElm(todo)

    this.addEventListeners(row, todo)
    this.elm.appendChild(row)
  }

  updateTable = (todos: Todo[]) => {
    this.elm.innerHTML = ''
    todos.map(this.addTodo).join(' ')
  }

  private toggleComplete = (row: HTMLElement, todo: Todo) => {
    todo.toggleComplete()
    row.querySelector('.completedAt')!.innerHTML = todo.completedAt?.value || '-'
  }

  private deleteTodoItemFromList = (row: HTMLElement, id: Todo['id']) => {
    this.deleteTodo(id)
    row.innerHTML = ''
  }

  private selectRow = (row: HTMLElement) => (row.style.backgroundColor = 'whitesmoke')

  private createRowElm = (todo: Todo) => {
    return `
      <td><input type="checkbox" class="checkbox"></td>
      <td>${todo.title}</td>
      <td class="deadline">${todo.deadline || '-'}</td>
      <td class="importance">${todo.parseImportance() || '-'}</td>
      <td class="completedAt">${todo.completedAt?.value || '-'}</td>
      <td><a href="#" class="btn btn-secondary btn-sm delete" data-id=${todo.id}>X</a></td>
    `
  }

  private addEventListeners = (row: HTMLTableRowElement, todo: Todo) => {
    row.querySelector('.checkbox')?.addEventListener('change', () => {
      this.toggleComplete(row, todo)
      this.selectRow(row)
    })

    row.querySelector('.delete')?.addEventListener('click', () => this.deleteTodoItemFromList(row, todo.id))
  }
}
