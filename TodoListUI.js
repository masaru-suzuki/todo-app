import { events } from './events.js';
import { todoList } from './TodoList.js';
export class TodoListUI extends EventTarget {
    constructor(todoList) {
        super();
        this.addTodo = (todo) => {
            const row = document.createElement('tr');
            row.innerHTML = this.createRowElm(todo);
            this.addEventListeners(row, todo);
            this.elm.appendChild(row);
        };
        this.deleteCompleted = (remainingTodos) => { };
        this.addEventListeners = (row, todo) => {
            var _a, _b;
            (_a = row.querySelector('.checkbox')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', () => {
                var _a;
                todo.toggleComplete();
                row.querySelector('.completedAt').innerHTML = ((_a = todo.completedAt) === null || _a === void 0 ? void 0 : _a.value) || '-';
            });
            (_b = row.querySelector('.delete')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                this.todoList.dispatchEvent(new CustomEvent(events.todoDeleted, { detail: { id: todo.id } }));
                row.innerHTML = '';
            });
        };
        this.createRowElm = (todo) => {
            var _a;
            return `
      <td><input type="checkbox" class="checkbox"></td>
      <td>${todo.title}</td>
      <td class="deadline">${todo.deadline || '-'}</td>
      <td class="importance">${todo.parseImportance() || '-'}</td>
      <td class="completedAt">${((_a = todo.completedAt) === null || _a === void 0 ? void 0 : _a.value) || '-'}</td>
      <td><a href="#" class="btn btn-secondary btn-sm delete" data-id=${todo.id}>X</a></td>
    `;
        };
        const todoListElement = document.getElementById('task-list');
        if (!todoListElement)
            throw new Error('no todo list element found');
        this.elm = todoListElement;
        this.todoList = todoList;
    }
}
export const todoListUI = new TodoListUI(todoList);
todoListUI.addEventListener(events.todoAdded, e => {
    const event = e;
    todoListUI.addTodo(event.detail.todo);
});
// todoListUI.addEventListener()
