import { events } from './events.js';
export class TodoList extends EventTarget {
    constructor() {
        super();
        this.addTodo = (todo) => {
            this.items.push(todo);
        };
        this.deleteTodo = (id) => {
            this.items = this.items.filter(todo => todo.id !== id);
        };
        this.deleteCompletedTodos = () => {
            this.items = this.items.filter(todo => !todo.completedAt);
        };
        this.items = [];
    }
}
export const todoList = new TodoList();
todoList.addEventListener(events.todoCreated, e => {
    const event = e;
    todoList.addTodo(event.detail.todo);
    console.log(todoList.items);
});
todoList.addEventListener(events.completedTodosDeleted, () => {
    todoList.deleteCompletedTodos();
});
todoList.addEventListener(events.todoDeleted, e => {
    const event = e;
    todoList.deleteTodo(event.detail.id);
});
