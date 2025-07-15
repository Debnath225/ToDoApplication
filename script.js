const toDoInput = document.getElementById("toDoInput");
const addBtn = document.getElementById("add");
const results = document.getElementById("results");

let tasks = [];
let PreviousTask = JSON.parse(localStorage.getItem("task"));
let CopyElement;

if (PreviousTask) {
  PreviousTask.forEach((obj, index) => {
    tasks.push(obj);
    randerTasks();
  });
}

addBtn.addEventListener("click", () => {
  const task = toDoInput.value.trim();
  if (task) {
    let TaskData = { text: task, completed: false };
    tasks.push(TaskData);
    localStorage.setItem("task", JSON.stringify(tasks));
    toDoInput.value = "";
    randerTasks();
  } else {
    return;
  }
});

function randerTasks() {
  const ToDoElement = document.createElement("p");
  tasks.forEach((task, index) => {
    ToDoElement.textContent = `${index + 1}. ${task.text}`;
    ToDoElement.classList.add("toDoStyle");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;
    checkBox.addEventListener("change", () => {
      task.completed = !task.completed;
      if (task.completed) {
        ToDoElement.classList.add("TaskCompleted");
        ToDoElement.style.backgroundColor = "#30c61a";
        tasks[index].completed=true;
        localStorage.setItem("task",JSON.stringify(tasks));
      } else {
        ToDoElement.style.backgroundColor = "rgba(240, 248, 255, 0.868)";
        tasks[index].completed=false;
        localStorage.setItem("task",JSON.stringify(tasks));
      }
    });

    results.appendChild(ToDoElement);

    ToDoElement.appendChild(checkBox);

    const DeleteElement = document.createElement("button");
    DeleteElement.innerHTML = "Delete";
    DeleteElement.classList.add("deleteStyle");
    DeleteElement.addEventListener("click", () => {
      tasks.splice(index, 1);
      //   localStorage.removeItem();
      ToDoElement.remove();
      console.log("Deleted Sussfully");
    });
    ToDoElement.appendChild(DeleteElement);
  });
}

// ToDoElement.forEach((element) => {
//   DeleteElement = document.createElement("button");
//   element.appendChild(DeleteElement);
// });
//   ToDoElement.classList.add("toDoStyle");
//   toDoInput.value = "";
//   results.appendChild(ToDoElement);

//   CopyElement = document.createElement("button");
//   CopyElement.innerHTML = "Copy";
//   CopyElement.classList.add("copyStyle");

//   ToDoElement.appendChild(CopyElement);

//   ToDoElement.appendChild(DeleteElement);
