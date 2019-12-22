import { Todo } from './Todo.js'
import { TodoListUI } from './TodoListUI.js'
import { TodoList } from './TodoList.js'

const todoList = new TodoList()
const deleteTodo = (id: Todo['id']) => todoList.deleteTodo(id)

const todoListUI = new TodoListUI(deleteTodo)

document.getElementById('js-form')?.addEventListener('submit', e => {
  e.preventDefault()

  const target: any = e.target

  const newTodo = new Todo({
    title: target.todo.value,
    deadline: target.deadline.value,
    importance: target.importance.value,
  })

  todoList.addTodo(newTodo)
  todoListUI.addTodo(newTodo)
})

document.getElementById('clear-btn')?.addEventListener('click', () => {
  todoList.deleteCompletedTodos()
  todoListUI.updateTable(todoList.items)
})
