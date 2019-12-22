const IMPORTANCE = {
  low: '低',
  middle: '中',
  high: '高',
} as const

class DateString {
  value: string
  constructor(date: string) {
    // should add validation for correct date value
    this.value = date
  }
}

export class Todo {
  static currentId = 1

  id: number
  title: string
  deadline?: DateString // Date string
  importance?: keyof typeof IMPORTANCE
  completedAt?: DateString // Date string

  constructor(input: Partial<Todo>) {
    if (!input.title) throw new Error('title cannot be empty')
    this.id = Todo.currentId
    this.title = input.title
    this.deadline = input.deadline
    this.importance = input.importance

    Todo.currentId++
  }

  parseImportance = () => this.importance && IMPORTANCE[this.importance]

  toggleComplete = () => {
    this.completedAt = this.completedAt ? undefined : new DateString(new Date().toISOString())
  }
}
