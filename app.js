/*
機能
・タスクの追加 => OK
・タスクの一覧表示 => OK
・完了したタスクの一括削除
・チェックボックスにチェック入れると取り消し線がかかる+色がグレーになる
・タスク完了時に完了日を横に表示
・タスクの編集機能
・タスクの並び替え（作成時間とタイトルで、昇降順） */

'use strict';
{
//datepicker
  $(function() {
    $('#datetimepicker4').datetimepicker({
      format: 'L'
    });
  });


//Todo Class : Represents a Task
class Task {
  constructor(todo, deadline, importance){
    this.todo = todo;
    this.deadline = deadline;
    this.importance = importance;
  }
}

// UI Class : Handle UI Tasks
class UI {
  static displayTasks(){
    const StoredTasks = [
      {
        todo: 'clean floor',
        deadline: 'tommorow',
        importance: '高'
      },
      {
        todo: 'wash car',
        deadline: 'tommorow',
        importance: '中'
      }
    ];

    const tasks = StoredTasks;

    tasks.forEach((task) => UI.addTaskToList(task));

  }
  //Add task to list
  static addTaskToList(task){
    const list = document.querySelector('#task-list');

    const row = document.createElement('tr');

    row.innerHTML =`
      <td>${task.todo}</td>
      <td>${task.deadline}</td>
      <td>${task.importance}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }
  //delete a task
  static deleteTask(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
  //clear Fields
  static clearFields() {
    document.querySelector('#todo').value = '';
    document.querySelector('#deadline').value = '';
  const radioButton = document.getElementsByName('importance');
    for(let i = 0; i < radioButton.length; i++){
      radioButton[i].checked = false;
    }
  }
  //show alert
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const btn = document.querySelector('.btn');
    const form =document.querySelector('#js-form');
    form.insertBefore(div, btn);
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
  const todo = document.querySelector('#todo').value;
  const deadline = document.querySelector('#deadline').value;
  let importance;
  const radioButton = document.getElementsByName('importance');
  for(let i = 0; i < radioButton.length; i++){
    if(radioButton[i].checked) {
importance = radioButton[i].value;
    }
  }
console.log(importance);
//Validate
//Instatiate task
  const task = new Task(todo, deadline, importance);
  console.log(task);
//Add Task to UI
UI.addTaskToList(task);

//Add Task to Localstorage

//Show success message
UI.showAlert('Task Added','success');
//Clear Fields
UI.clearFields();
});

//Event Remove a Task
document.querySelector('table').addEventListener('click',(e) => {
  //remove task from UI
  UI.deleteTask(e.target);
  //remove task from Localstorage
  //Show success message
});
}
