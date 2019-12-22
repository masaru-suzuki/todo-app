export class TodoListUI {
    constructor(deleteTodo) {
        this.addTodo = (todo) => {
            const row = document.createElement('tr');
            row.innerHTML = this.createRowElm(todo);
            this.addEventListeners(row, todo);
            this.elm.appendChild(row);
        };
        this.updateTable = (todos) => {
            this.elm.innerHTML = '';
            todos.map(this.addTodo).join(' ');
        };
        this.toggleComplete = (row, todo) => {
            var _a;
            todo.toggleComplete();
            row.querySelector('.completedAt').innerHTML = ((_a = todo.completedAt) === null || _a === void 0 ? void 0 : _a.value) || '-';
        };
        this.deleteTodoItemFromList = (row, id) => {
            this.deleteTodo(id);
            row.innerHTML = '';
        };
        this.selectRow = (row) => (row.style.backgroundColor = 'whitesmoke');
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
        this.addEventListeners = (row, todo) => {
            var _a, _b;
            (_a = row.querySelector('.checkbox')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', () => {
                this.toggleComplete(row, todo);
                this.selectRow(row);
            });
            (_b = row.querySelector('.delete')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.deleteTodoItemFromList(row, todo.id));
        };
        const todoListElement = document.getElementById('task-list');
        if (!todoListElement)
            throw new Error('no todo list element found');
        this.elm = todoListElement;
        this.deleteTodo = deleteTodo;
    }
}
