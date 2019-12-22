import { Todo } from './Todo.js'
import { TodoListUI } from './TodoListUI.js'
import { TodoList } from './TodoList.js'

const todoList = new TodoList()

const todoListUI = new TodoListUI({
  deleteTodo: (id: Todo['id']) => todoList.deleteTodo(id),
})

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
  todoListUI.updateTable(todoList.getTodos())
})

document.getElementById('sort-by-deadline-asc')?.addEventListener('click', () => {
  todoList.sortBy('deadline', 'ASC')
  todoListUI.updateTable(todoList.getTodos())
})

document.getElementById('sort-by-deadline-desc')?.addEventListener('click', () => {
  todoList.sortBy('deadline', 'DESC')
  todoListUI.updateTable(todoList.getTodos())
})

const init = () => {
  const todos = [
    new Todo({ title: 'buy something', deadline: '2019-12-12' }),
    new Todo({ title: 'sell something', deadline: '2019-10-10' }),
    new Todo({ title: 'eat something', deadline: '2019-11-11' }),
  ]
  todos.forEach(todo => {
    todoList.addTodo(todo)
    todoListUI.addTodo(todo)
  })
}

init()
