/* eslint-disable no-undef */
'use strict'
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
      format: 'L',
    })
  })

  //Todo Class : Represents a Task
  class Task {
    constructor(todo, deadline, importance) {
      this.todo = todo
      this.deadline = deadline
      this.importance = importance
      this.isAlert
    }
  }

  // UI Class : Handle UI Tasks
  class UI {
    static displayTasks() {
      const StoredTasks = [
        {
          todo: '定期報告アンケートの提出',
          deadline: '12/10/2019',
          importance: '高',
        },
        {
          todo: 'スタットレスタイヤへの履き替え',
          deadline: '12/28/2019',
          importance: '中',
        },
      ]

      const tasks = StoredTasks

      tasks.forEach(task => UI.addTaskToList(task))
    }
    //Add task to list
    static addTaskToList(task) {
      const list = document.querySelector('#task-list')
      const row = document.createElement('tr')

      // Adding id as custom data attribute makes it much easier to traverse the parent element when toggling the checkbox.
      const id = list.childElementCount
      row.id = `todo-${id}`

      row.innerHTML = `
    <td><input type = "checkbox" class = "checkbox" name = 'checkbox'></td>
    <td>${task.todo}</td>
    <td>${task.deadline}</td>
    <td>${task.importance}</td>
    <td></td>
    <td><a href="#" class="btn btn-secondary btn-sm delete" data-id=${id}>X</a></td>
    `

      list.appendChild(row)

      //TODO: Following functionalities should be extracted into a different method(s).

      const newCheckbox = row.querySelector('input')

      newCheckbox.addEventListener('change', ({ target: { checked } }) => {
        row.style.backgroundColor = checked ? 'gray' : 'white'
        //チェック入れた時にdate.nowを取得
        //dateを日付に変更
        //completedDateに書き込む
      })

      row.querySelector('.delete').addEventListener('click', UI.deleteTask)
    }

    static deleteTask(el) {
      // traverse target element (tr) by custom data attribute on the delete button
      const target = document.getElementById(`todo-${el.target.dataset.id}`)
      target.querySelector('input').removeEventListener('change', UI.deleteTask)
      target.remove()
      UI.showAlert('Task is removed', 'success')
    }
    //clear Fields
    static clearFields() {
      document.querySelector('#todo').value = ''
      document.querySelector('#deadline').value = ''
      const radioButton = document.getElementsByName('importance')
      for (let i = 0; i < radioButton.length; i++) {
        radioButton[i].checked = false
      }
    }
    //show alert
    static showAlert(message, className) {
      if (this.isAlert === true) return
      this.isAlert = true
      const div = document.createElement('div')
      div.className = `alert alert-${className}`
      div.appendChild(document.createTextNode(message))
      const btn = document.querySelector('.btn')
      const form = document.querySelector('#js-form')
      form.insertBefore(div, btn)
      setTimeout(() => {
        div.remove()
        this.isAlert = false
      }, 2000)
    }
  }

  // Store Class : Handles Storage

  // =======================Event :Display Tasks==============================
  document.addEventListener('DOMContentLoaded', UI.displayTasks)

  // =======================Event : Add a Task============================
  document.querySelector('#js-form').addEventListener('submit', e => {
    //prevent actual submit
    e.preventDefault()
    //Get form value
    const todo = document.querySelector('#todo').value
    const deadline = document.querySelector('#deadline').value
    let importance
    const radioButton = document.getElementsByName('importance')
    for (let i = 0; i < radioButton.length; i++) {
      if (radioButton[i].checked) {
        importance = radioButton[i].value
      }
    }
    //Validate
    if (todo === '' || deadline === '' || radioButton === '') {
      UI.showAlert('fill in all blank', 'danger')
    } else {
      //Instantiate task
      const task = new Task(todo, deadline, importance)
      console.log(task)
      //Add Task to UI
      UI.addTaskToList(task)
      //Add Task to Localstorage
      //Show success message
      UI.showAlert('Task Added', 'success')
      //Clear Fields
      UI.clearFields()
      console.log(checkboxes)
    }
  })

  //=================Event Complete Task==========================
  //チェックボックスに１つ以上チェックを入れた場合、all clearボタンをenableにする
  //チェックを入れたチェックボックス全体のデータを取得
  //チェックを入れたチェックボックス全体のデータについて、Remove a Taskと同じ動作を命令する

  //===============Event Remove Completed Task===========================

  //Event Remove a Task
  // document.querySelector('table').addEventListener('click',(e) => {
  //   //remove task from UI
  //   UI.deleteTask(e.target);
  //   //remove task from Localstorage
  // });
}
