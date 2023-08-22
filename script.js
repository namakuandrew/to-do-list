//initialize variable
const taskInput = document.querySelector(".task-input input"),
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
    // if no tasks/lists, remove active class from clearAll button
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

/* this event listener is triggered when the clearAll element is clicked & 
it clears all the task in the todos array and updates the local storage */
clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showtodo();
});

// this event listener is triggered when a key is released in the taskinput element
taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo);
    }
  } else {
    isEditTask = false;
    todos[editId].name = userTask;
  }
  taskInput.value = "";
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo(document.querySelector("span.active").id);
});

function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}
