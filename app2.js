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

  // UI Class : Handle UI Tasks
  class UI {
    static storedTasks = [
      {
        todo: '定期報告アンケートの提出',
        deadline: '2019-12-12',
        importance: '高',
      },
      {
        todo: 'Study Functional Programming',
        deadline: '2020-01-15',
        importance: '中',
      },
      {
        todo: 'スタットレスタイヤへの履き替え',
        deadline: '2019-12-30',
        importance: '中',
      },
    ]
    static displayTasks() {
      UI.storedTasks.forEach(task => UI.addTaskToList(task))
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
    <td>${task.deadline}</td>
    <td>${task.importance}</td>
    <td></td>
    <td><a href="#" class="btn btn-secondary btn-sm delete" data-id=${id}>X</a></td>
    `;

      list.appendChild(row);

      //TODO: Following functionalities should be extracted into a different method(s).
      //static CheckAcrionでまとめたい
      const newCheckbox = row.querySelector('input');
      newCheckbox.addEventListener('change', ({ target: { checked } }) => {
        row.style.backgroundColor = checked ? 'gray' : 'white';
        //チェック入れた時にdate.nowを取得
        const spaceToWriteDate = row.children[4];
        //dateを日付に変更
        const CompleteDate = new Date();
        //spaceToWriteDateに書き込む
        spaceToWriteDate.textContent = CompleteDate.toLocaleDateString();
      });
      row.querySelector('.delete').addEventListener('click', UI.deleteTask);
    }

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

    static updateTaskList = () => {
      const list = document.querySelector('#task-list')
      list.innerHTML = ''
      UI.displayTasks()
    }
    
    static sortTasks = order => {
      // order: 'ASC' | 'DESC'
      UI.storedTasks.sort((a, b) => {
        const [x, y] = order === 'ASC' ? [a, b] : [b, a]
        return new Date(x.deadline) - new Date(y.deadline)
      })
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
      }
    });
    //Localstorageから削除
  });

//======================Event Remove a Task=================================
  document.querySelector('table').addEventListener('click',(e) => {
    //remove task from UI
    UI.deleteTask(e.target);
    //remove task from Localstorage
  });

  document.getElementById('descending-sort-button').addEventListener('click', () => {
    UI.sortTasks('DESC')
    UI.updateTaskList()
  })

  document.getElementById('ascending-sort-button').addEventListener('click', () => {
    UI.sortTasks('ASC')
    UI.updateTaskList()
  })
}
