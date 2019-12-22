const IMPORTANCE = {
    low: '低',
    middle: '中',
    high: '高',
};
class DateString {
    constructor(date) {
        // should add validation for correct date value
        this.value = date;
    }
}
export class Todo {
    constructor(input) {
        this.parseImportance = () => this.importance && IMPORTANCE[this.importance];
        this.toggleComplete = () => {
            this.completedAt = this.completedAt ? undefined : new DateString(new Date().toISOString());
        };
        if (!input.title)
            throw new Error('title cannot be empty');
        this.id = Todo.currentId;
        this.title = input.title;
        this.deadline = input.deadline;
        this.importance = input.importance;
        Todo.currentId++;
    }
}
Todo.currentId = 1;
