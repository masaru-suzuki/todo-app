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
