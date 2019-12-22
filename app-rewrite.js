var _a, _b;
import { Todo } from './Todo.js';
import { TodoListUI } from './TodoListUI.js';
import { TodoList } from './TodoList.js';
const todoList = new TodoList();
const deleteTodo = (id) => todoList.deleteTodo(id);
const todoListUI = new TodoListUI(deleteTodo);
(_a = document.getElementById('js-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', e => {
    e.preventDefault();
    const target = e.target;
    const newTodo = new Todo({
        title: target.todo.value,
        deadline: target.deadline.value,
        importance: target.importance.value,
    });
    todoList.addTodo(newTodo);
    todoListUI.addTodo(newTodo);
});
(_b = document.getElementById('clear-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    todoList.deleteCompletedTodos();
    todoListUI.updateTable(todoList.items);
});
