"use strict";
{
  $(function() {
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