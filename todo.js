const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const tasksList = document.getElementById("tasks");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(addTaskToDOM);

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    const task = { text, done: false };
    tasks.push(task);
    addTaskToDOM(task);
    saveTasks();
    input.value = "";
  }
});

input.addEventListener("keypress", e => {
  if (e.key === "Enter") addBtn.click();
});

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.text;
  if (task.done) li.classList.add("completed");

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn";

  li.appendChild(delBtn);
  tasksList.appendChild(li);

  li.addEventListener("click", e => {
    if (e.target === delBtn) return;
    li.classList.toggle("completed");
    updateTaskStatus(task.text, li.classList.contains("completed"));
    saveTasks();
  });

  delBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => t.text !== task.text);
    li.remove();
    saveTasks();
  });
}

function updateTaskStatus(text, done) {
  tasks = tasks.map(t => t.text === text ? { ...t, done } : t);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}