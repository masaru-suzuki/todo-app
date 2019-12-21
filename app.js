/* eslint-disable no-undef */
'use strict';
{
  /*
機能
・タスクの追加 => OK
・タスクの一覧表示 => OK
・完了したタスクの一括削除 => OK
・チェックボックスにチェック入れると取り消し線がかかる+色がグレーになる => OK
・タスク完了時に完了日を横に表示  => OK
・タスクの編集機能
・タスクの並び替え（作成時間とタイトルで、昇降順） */

  //datepicker
  //日付を年/月/日にしたい
  $(function() {
    $('#datetimepicker4').datetimepicker({
      format: 'L',
    });
  });

  //Todo Class : Represents a Task
  class Task {
    constructor(todo, deadline, importance) {
      this.todo = todo;
      this.deadline = deadline;
      this.importance = importance;
      this.isAlert;
    }
  }
  class Store{
    static getTodoList() {
      let todoList;
      if(localStorage.getItem('todoList') === null) {
        todoList = [];
      } else {
        todoList = JSON.parse(localStorage.getItem('todoList'));
      }
      return todoList;
    }
    static addTask(task) {
      const todoList = Store.getTodoList();
      todoList.push(task);
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
    static removeTask(todo) {
      const todoList = Store.getTodoList();
      todoList.forEach((task, index) => {
        if(task.todo === todo) {
          console.log(task.todo+'===delete task');
          todoList.splice(index, 1);
        }
      });
      localStorage.setItem('todoList',JSON.stringify(todoList));
    }
  }
  // UI Class : Handle UI Tasks
  class UI {
    //display tasks
    static displayTasks() {
      const StoredTasks = Store.getTodoList();
      const tasks = StoredTasks;
      console.log(StoredTasks);
      tasks.forEach(task => UI.addTaskToList(task));
    }
    //Add task to list
    static addTaskToList(task) {
      const list = document.querySelector('#task-list');
      const row = document.createElement('tr');

      // Adding id as custom data attribute makes it much easier to traverse the parent element when toggling the checkbox.
      const id = list.childElementCount;
      row.id = `todo-${id}`;
      row.innerHTML = `
    <td><input type = "checkbox" class = "checkbox" name = 'checkbox'></td>
    <td>${task.todo}</td>
    <td class="deadline">${task.deadline}</td>
    <td class="importance">${task.importance}</td>
    <td></td>
    <td><a href="#" class="btn btn-secondary btn-sm delete" data-id=${id}>X</a></td>
    `;

      list.appendChild(row);

      //TODO: Following functionalities should be extracted into a different method(s).
      //static CheckActionでまとめたい
      const newCheckbox = row.querySelector('input');
      newCheckbox.addEventListener('change', ({ target: { checked } }) => {
        row.style.backgroundColor = checked ? 'gray' : 'white';
      // Display complete Date
        const spaceToWriteDate = row.children[4];
        //チェック入れた時にdate.nowを取得
        const CompleteDate = new Date();
        //dateをyear/month/dayに変更＋spaceToWriteDateに書き込む
        spaceToWriteDate.textContent = CompleteDate.toLocaleDateString();
      });
      row.querySelector('.delete').addEventListener('click', (el) => {
        UI.deleteTask(el);
        Store.removeTask(row.querySelector('.delete').parentElement.parentElement.children[1].textContent);
      });
    }

    //sort Tasks
    static sortTask() {
    //sortする要素を配列で取得する    arr.sort([compareFunction])
    // const sortTaskList = Array.prototype.slice.call(document.querySelectorAll('.deadline'), 0);
    // console.log(sortTaskList);
    //オブジェクトの中のdeadlineを抽出できるのか？配列じゃなくてオブジェクトで取得したい。表示されている表からオブジェクトを取得する
    //オブジェクトからdeadlineを抽出するfunctionを定義
    function extractDeadlineFromObject(object) {
      return object.key;
    }
    //stored taskはオブジェクトで、UI.addTaskToList(task)をするにはオブジェクトで取得しなければならない
    const StoredTodoList = Store.getTodoList();
    const todoList = StoredTodoList;
    console.log(todoList);
    console.log(todoList[0].deadline);
    // function compare()で配列内のdeadlineを比較して並べ替えるためにcompareを定義
      function compare(a,b) {
        const deadlineA = a.deadline;
        console.log(deadlineA);
        const deadlineB = b.deadline;
        console.log(deadlineB);
        if(deadlineA > deadlineB) {
          return 1;
        } else if(deadlineA < deadlineB) {
          return -1;
        } else {
          return 0;
        }
      };
      //objectをソート
      todoList.sort(compare);
      console.log(todoList);
      todoList.forEach(object => UI.addTaskToList(object));

    //compareFunctionを定義 重要度については高 = 1 のように数値化してみる
    }

    //delete task
    static deleteTask(el) {
      // traverse target element (tr) by custom data attribute on the delete button
      //この書き方もう少し勉強する
      const target = document.getElementById(`todo-${el.target.dataset.id}`);
      target.querySelector('input').removeEventListener('change', UI.deleteTask);
      target.remove();
      UI.showAlert('Task is removed', 'success');
    }

    //clear Fields
    static clearFields() {
      document.querySelector('#todo').value = '';
      document.querySelector('#deadline').value = '';
      const radioButton = document.getElementsByName('importance');
      for (let i = 0; i < radioButton.length; i++) {
        radioButton[i].checked = false;
      }
    }

    //show alert
    static showAlert(message, className) {
      if (this.isAlert === true) return;
      this.isAlert = true;
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const btn = document.querySelector('.btn');
      const form = document.querySelector('#js-form');
      form.insertBefore(div, btn);
      setTimeout(() => {
        div.remove();
        this.isAlert = false;
      }, 2000);
    }
  }

  // Store Class : Handles Storage

  // =======================Event :Display Tasks==============================
  document.addEventListener('DOMContentLoaded', UI.displayTasks);

  // =======================Event : Add a Task============================
  document.querySelector('#js-form').addEventListener('submit', e => {
    //prevent actual submit
    e.preventDefault();
    //Get form value
    const todo = document.querySelector('#todo').value;
    const deadline = document.querySelector('#deadline').value;
    let importance;
    const radioButton = document.getElementsByName('importance');
    for (let i = 0; i < radioButton.length; i++) {
      if (radioButton[i].checked) {
        importance = radioButton[i].value;
      }
    }
    //Validate
    if (todo === '' || deadline === '' || radioButton === '') {
      UI.showAlert('fill in all blank', 'danger');
    } else {
      //Instantiate task
      const task = new Task(todo, deadline, importance);
      console.log(task);
      //Add Task to UI
      UI.addTaskToList(task);
      //Add Task to Localstorage
      Store.addTask(task);
      //Show success message
      UI.showAlert('Task Added', 'success');
      //Clear Fields
      UI.clearFields();
    }
  });
  //=================  Event Remove Complete Tasks ==========================
  // const isClearBtnEnable = false;
  //チェックボックスに１つ以上チェックを入れた場合、all clearボタンをenableにする
  const clearBtn = document.getElementById('clear-btn');
  clearBtn.addEventListener('click', () => {
    //チェックを入れたチェックボックス全体のデータを取得
    //チェックのついたcheckboxの行を削除
    const checkboxes = Array.prototype.slice.call(document.getElementsByName('checkbox'), 0);
    //画面中央にalertを配置したい（アラートが上から降りてくる感じに）
    alert('Clear your task! Really?');
    checkboxes.forEach(checkbox => {
      if(checkbox.checked) {
        checkbox.parentElement.parentElement.remove();
        Store.removeTask(checkbox.parentElement.parentElement.children[1].textContent);
      }
    });
  });

//======================Event Sort Task=================================
  document.getElementById('sort-deadline').addEventListener('click', () => {
    UI.sortTask();
  });
}
