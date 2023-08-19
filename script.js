//initialize variable
const taskInput = document.querySelector(".task-input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

let editId,
  isEditTask = false;
todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showtodo(btn.id);
  });
});

function showtodo(filter) {
  let listTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let completed = todo.status == "completed" ? "checked" : "";
      // logical OR operator (||) in in javascript
      if (filter == todo.status || filter == "all") {
        listTag += `<li class="task">
        <label for="${id}">
          <input
            type="checkbox"
            onclick="updateStatus(this)"
            id="${id}"
            ${completed}
          />
          <p class="${completed}">${todo.name}</p>
        </label>
        <div class="settings">
          <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
          <ul class="task-menu">
            <li onclick='editTask(${id}, "${todo.name}")'>
              <i class="uil uil-pen"></i> Edit
            </li>
            <li onclick="deleteTask(${id}, '${filter}')">
              <i class="uil uil-trash"></i> Delete
            </li>
          </ul>
        </div>
      </li>`;
      }
    });
  }

  // set the innerhtml of taskbox to either listtag or a message indicating no tasks
  taskBox.innerHTML = listTag || `<span> You don't have any task here</span>`;

  // check if there any tasks/lists present
  let checkTask = taskBox.querySelectorAll(".task");
  if (!checkTask.length) {
    // if no tasks/lists, remove active class from clearAll buton
    clearAll.classList.remove("active");
  } else {
    // if tasks/lists present, add active class to clearAll button
    clearAll.classList.add("active");
  }
  // check if the height of the taskBox is more than or equal to 265px
  if (taskBox.offsetheight >= 265) {
    // if height is more, add overflow class to taskBox
    taskBox.classList.add("overflow");
  } else {
    // if height is less, remove overflow class from taskBox
  }
}

// to show all the lists
showtodo("all");
