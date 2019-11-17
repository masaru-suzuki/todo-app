'use strict'
{

//DatePicker
$(function () {
    $('#datetimepicker4').datetimepicker({
        format: 'L'
    })
});


//dataの受け取り
const addlist = document.querySelector('#btn')
const todo = document.querySelector('#todo')


btn.addEventListener("submit",(e) => {
    event.preventDefault();
    console.log(`入力欄の値: ${todo.value}`)
});



}