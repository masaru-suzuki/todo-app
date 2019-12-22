import { todoList } from './TodoList.js' // .js is needed for browser
import { Todo } from './Todo.js'
import { events } from './events.js'
import { todoListUI } from './TodoListUI.js'

document.getElementById('js-form')?.addEventListener('submit', e => {
  e.preventDefault()

  const target: any = e.target

  const newTodo = new Todo({
    title: target.todo.value,
    deadline: target.deadline.value,
    importance: target.importance.value,
  })

  todoList.dispatchEvent(new CustomEvent(events.todoCreated, { detail: { todo: newTodo } }))

  todoListUI.dispatchEvent(new CustomEvent(events.todoAdded, { detail: { todo: newTodo } }))
})

document.getElementById('clear-btn')?.addEventListener('click', () => {
  todoList.dispatchEvent(new Event(events.completedTodosDeleted))

  todoListUI.dispatchEvent(new CustomEvent(events.completedTodosDeleted, { detail: { todos: todoList.items } }))
})
