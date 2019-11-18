"use strict";
{
  $(function() {
<<<<<<< HEAD
    $("#datetimepicker4").datetimepicker({
      format: "L"
    });
  });

  const form = document.getElementById("js-form");

  form.addEventListener("submit", e => {
    event.preventDefault();
    console.log(e.target.todo.value);
    console.log(e.target.deadline.value);
    console.log(e.target.importance.value);
  });
}

//Todo Class : Represents a Todolist
class Todolist {
  constructor(todo, deadline, importance){
    this.todo = todo;
    this.deadline = deadline;
    this.importance = importance
  }
}

// UI Class : Handle UI Tasks
class UI {
  static displayTasks(){
    const Storedtasks = [
      {
        todo: 'clean floor',
        deadline: 'tommorow',
        importance: 'high'
      },
      {
        todo: 'clean floor',
        deadline: 'tommorow',
        importance: 'high'
      }
    ]

    const tasks = Storedtasks;

    tasks.forEach((task) => UI.addTaskToList(task));

  }

  static addTaskToList(task){
    const list = document.querySelector('#task-list');

    const row = document.createElement('tr');

    row.innerHTML =`
      <td>${task.title}</td>
      <td>${task.deadline}</td>
      <td>${task.importance}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete"></a></td>
    `
    list.appendChild(row)
  }

}

// Store Class : Handles Storage

// Event :Display Tasks

document.addEventListener('DOMContentLoaded',UI.displayTasks);

// Event : Add a Task

document.querySelector('#js-form').addEventListener('submit',(e) =>{
  //prevent actual submit
  e.preventDefault();
  //Get form value
  const task = document.querySelector('#task').value;
  const deadline = document.querySelector('#deadline').value;
  // radio buttonの情報についてどう定義すればいいのか調べる
  const importance = document.querySelector('#importance').value;

  const todolist = new Todolist(task,deadline,importance);
  
  UI.addTaskToList(task);
})

// ファイルを分けよう
// form submission
// todo class
// ui class
// ちなみにClassの使い方わかってるの?
// なんとなく・・・
// 最初はFunctionだけでやったほうがいいよ
//見様見真似でやってる感はある

// それな
// てかファイル長くて読みにくいからファイルわけないと無理や
// fileって？
//JS files
// TODOについてのファイルとUI変更のファイル
// いや、ファイルわけなくていいわ
// 了解
=======
    $('#datetimepicker4').datetimepicker({ format: 'L' })
  })

  const form = document.getElementById('js-form')

  form.addEventListener('submit', e => {
    event.preventDefault()
    console.log(e.target.todo.value)
    console.log(e.target.deadline.value)
    console.log(e.target.importance.value)
  })
}
>>>>>>> origin/master
