var _a, _b;
import { todoList } from './TodoList.js'; // .js is needed for browser
import { Todo } from './Todo.js';
import { events } from './events.js';
import { todoListUI } from './TodoListUI.js';
(_a = document.getElementById('js-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', e => {
    e.preventDefault();
    const target = e.target;
    const newTodo = new Todo({
        title: target.todo.value,
        deadline: target.deadline.value,
        importance: target.importance.value,
    });
    todoList.dispatchEvent(new CustomEvent(events.todoCreated, { detail: { todo: newTodo } }));
    todoListUI.dispatchEvent(new CustomEvent(events.todoAdded, { detail: { todo: newTodo } }));
});
(_b = document.getElementById('clear-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    todoList.dispatchEvent(new Event(events.completedTodosDeleted));
    todoListUI.dispatchEvent(new CustomEvent(events.completedTodosDeleted, { detail: { todos: todoList.items } }));
});
