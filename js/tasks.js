document.addEventListener("DOMContentLoaded", function () {
  const taskContainer = document.getElementById("task-container");

  fetch("https://raw.githubusercontent.com/Omariniesta/Omar/main/tasks.json")
    .then((response) => response.json())
    .then((tasks) => {
      tasks.forEach((task) => {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card";

        const title = document.createElement("h4");
        title.textContent = task.title;
        taskCard.appendChild(title);

        const description = document.createElement("p");
        description.textContent = task.description;
        taskCard.appendChild(description);

        const points = document.createElement("p");
        points.textContent = `Points: ${task.points}`;
        taskCard.appendChild(points);

        const actionButton = document.createElement("button");
        actionButton.className = "link-btn";

        if (task.action === "checkin") {
          actionButton.textContent = "Check In";
          actionButton.addEventListener("click", () => {
            // Implement check-in functionality here
            alert("Checked in successfully!");
          });
        } else {
          actionButton.textContent = "Go";
          actionButton.addEventListener("click", () => {
            window.open(task.action, "_blank");
          });
        }

        taskCard.appendChild(actionButton);
        taskContainer.appendChild(taskCard);
      });
    })
    .catch((error) => {
      console.error("Error loading tasks:", error);
      taskContainer.innerHTML = "<p>Failed to load tasks. Please try again later.</p>";
    });
});
