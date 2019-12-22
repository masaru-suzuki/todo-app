import { events } from './events.js'
import { Todo } from './Todo.js'
import { todoList, TodoList } from './TodoList.js'

export class TodoListUI extends EventTarget {
  elm: HTMLElement
  todoList: TodoList

  constructor(todoList: TodoList) {
    super()
    const todoListElement = document.getElementById('task-list')
    if (!todoListElement) throw new Error('no todo list element found')
    this.elm = todoListElement
    this.todoList = todoList
  }

  addTodo = (todo: Todo) => {
    const row = document.createElement('tr')
    row.innerHTML = this.createRowElm(todo)

    this.addEventListeners(row, todo)
    this.elm.appendChild(row)
  }

  deleteCompleted = (remainingTodos: Todo) => {}

  private addEventListeners = (row: HTMLTableRowElement, todo: Todo) => {
    row.querySelector('.checkbox')?.addEventListener('change', () => {
      todo.toggleComplete()
      row.querySelector('.completedAt')!.innerHTML = todo.completedAt?.value || '-'
    })

    row.querySelector('.delete')?.addEventListener('click', () => {
      this.todoList.dispatchEvent(new CustomEvent(events.todoDeleted, { detail: { id: todo.id } }))
      row.innerHTML = ''
    })
  }

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
}

export const todoListUI = new TodoListUI(todoList)

todoListUI.addEventListener(events.todoAdded, e => {
  const event = (e as any) as { detail: { todo: Todo } }
  todoListUI.addTodo(event.detail.todo)
})

// todoListUI.addEventListener()
