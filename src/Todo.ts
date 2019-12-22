class DateString {
  value: string
  constructor(date: string) {
    // should add validation for correct date value
    this.value = date
  }
}

type CreateTodoInput = Pick<Todo, 'title' | 'importance'> & { deadline?: string }

export class Todo {
  private static currentId = 1

  private static IMPORTANCE = {
    low: '低',
    middle: '中',
    high: '高',
  } as const

  id: number
  title: string
  deadline?: DateString // Date string
  importance?: keyof typeof Todo.IMPORTANCE
  completedAt?: DateString // Date string

  constructor(input: CreateTodoInput) {
    if (!input.title) throw new Error('title cannot be empty')
    this.id = Todo.currentId
    this.title = input.title
    this.deadline = input.deadline ? new DateString(input.deadline) : undefined
    this.importance = input.importance

    Todo.currentId++
  }

  parseImportance = () => this.importance && Todo.IMPORTANCE[this.importance]

  toggleComplete = () => {
    this.completedAt = this.completedAt ? undefined : new DateString(new Date().toISOString())
  }
}
