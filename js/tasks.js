document.addEventListener("DOMContentLoaded", function () {
  fetchTasks();
});

function fetchTasks() {
  fetch(tasksUrl)
    .then(response => response.json())
    .then(data => {
      renderTasks(data);
    })
    .catch(error => {
      console.error("Error fetching tasks:", error);
    });
}

function renderTasks(tasks) {
  const taskContainer = document.getElementById("task-container");
  taskContainer.innerHTML = "";

  tasks.forEach(task => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    taskCard.innerHTML = 
      <div>
        <p>${task.title}</p>
        <button onclick="completeTask('${task.id}'); window.open('${task.link}', '_blank')">Do Task</button>
      </div>
      <span>+${task.points} pts</span>
    ;

    taskContainer.appendChild(taskCard);
  });
}