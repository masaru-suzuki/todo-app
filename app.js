/* eslint-disable no-undef */
'use strict';
{
/*
機能
・タスクの追加 => OK
・タスクの一覧表示 => OK
・完了したタスクの一括削除 => 今日ここ
・チェックボックスにチェック入れると取り消し線がかかる+色がグレーになる => OK
・タスク完了時に完了日を横に表示  => 今日ここ
・タスクの編集機能
・タスクの並び替え（作成時間とタイトルで、昇降順） */
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
    this.isAlert;
  }
}

// UI Class : Handle UI Tasks
class UI {
  static displayTasks(){
    const StoredTasks = [
      {
        todo: '定期報告アンケートの提出',
        deadline: '12/10/2019',
        importance: '高'
      },
      {
        todo: 'スタットレスタイヤへの履き替え',
        deadline: '12/28/2019',
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
      <td><input type = "checkbox" class = "checkbox" name = 'checkbox'/*onchange = "checkAction()"*/></td>
      <td>${task.todo}</td>
      <td>${task.deadline}</td>
      <td>${task.importance}</td>
      <td></td>
      <td><a href="#" class="btn btn-secondary btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }
  static checkAction() {
    const checkboxes = document.getElementsByName('checkbox');
    checkboxes.forEach((checkbox) => {
      if( checkbox.checked) {
        checkbox.parentElement.parentElement.style.backgroundColor = 'gray';
      } else {
        checkbox.parentElement.parentElement.style.backgroundColor = '#fff';
      }
    });
  }
  //delete a task
  static deleteTask(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
      //Show success message
      UI.showAlert('Task is removed','success');
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
    if(this.isAlert === true) return;
    this.isAlert = true;
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const btn = document.querySelector('.btn');
    const form =document.querySelector('#js-form');
    form.insertBefore(div, btn);
    setTimeout(() => {
      div.remove();
      this.isAlert = false;
    }, 2000);
  }
}

// Store Class : Handles Storage

// =======================Event :Display Tasks==============================
document.addEventListener('DOMContentLoaded',UI.displayTasks);

// =======================Event : Add a Task============================
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
  //Validate
  if(todo === ''|| deadline === ''|| radioButton === '') {
    UI.showAlert('fill in all blank', 'danger');
  } else {
    //Instantiate task
      const task = new Task(todo, deadline, importance);
      console.log(task);
    //Add Task to UI
    UI.addTaskToList(task);
    //Add Task to Localstorage
    //Show success message
    UI.showAlert('Task Added','success');
    //Clear Fields
    UI.clearFields();
  }
});

//=================Event Complete Task==========================
  //チェックされたチェックボックスを取得

  const checkboxes = document.getElementsByName('checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      if( checkbox.checked) {
        checkbox.parentElement.parentElement.style.backgroundColor = 'gray';
      } else {
        checkbox.parentElement.parentElement.style.backgroundColor = '#fff';
      }
    });
  });
  console.log(checkboxes);
// const checkbox = document.getElementsByClassName('checkbox');
// document.querySelector('checkbox').onchange = UI.checkAction();
// console.log(checkbox);


//===============Event Remove Completed Task===========================
  //チェックボックスに１つ以上チェックを入れた場合、all clearボタンをenableにする
  //チェックを入れたチェックボックス全体のデータを取得
  //チェックを入れたチェックボックス全体のデータについて、Remove a Taskと同じ動作を命令する

//Event Remove a Task
document.querySelector('table').addEventListener('click',(e) => {
  //remove task from UI
  UI.deleteTask(e.target);
  //remove task from Localstorage
});
}
