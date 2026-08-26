
let tasks = [
  {
    title: "Shoftware lab task",
    priority: "Complete"
  },
  {
    title: "Web lab task",
    priority: "In Progress"
  }
];


// Helper: Priority Color

function getPriority(priority) {

  if (priority === "Complete") {
    return "#319c0d";
  }

  if (priority === "In Progress") {
    return "#d97706";
  }

  return "#d11b0b";
}


// Function: Render the list to the DOM

function renderList() {

  const listEl = document.getElementById('taskList');

  listEl.innerHTML = "";


  tasks.forEach((task, index) => {

    const li = document.createElement('li');

    li.className = 'rec-item';


    li.innerHTML = `
      <div>
        <strong>${task.title}</strong>
      </div>

      <div>
        <span
          class="priority-badge"
          style="background:${getPriority(task.priority)}"
        >
          ${task.priority}
        </span>

        <button
          class="del-btn"
          data-index="${index}"
          title="Delete"
        >
          &times;
        </button>
      </div>
    `;


    listEl.appendChild(li);

  });


  // Update total task count

  document.getElementById('taskCount').textContent =
    tasks.length;
}


// Form Submit Handler

const form = document.getElementById('taskForm');


form.addEventListener('submit', (event) => {

  // Prevent default page reload

  event.preventDefault();


  // Read values from input fields

  const title =
    document.getElementById('taskInput').value.trim();

  const priority =
    document.getElementById('prioritySelect').value;


  // Check input

  if (!title) return;


  // Add new task to data array

  tasks.push({
    title,
    priority
  });


  console.log(
    "Added new task:",
    { title, priority }
  );


  // Re-render the HTML list

  renderList();


  // Reset form

  document.getElementById('taskInput').value = "";

  document.getElementById('taskInput').focus();

});


// Event Delegation for Delete buttons

document.getElementById('taskList').addEventListener('click', (e) => {

  if (e.target.classList.contains('del-btn')) {

    const idx =
      Number(e.target.dataset.index);


    const removed =
      tasks.splice(idx, 1);


    console.warn(
      "Deleted task:",
      removed[0]
    );


    renderList();

  }

});


// Initial render on page load

renderList();

console.log(
  "To-Do List ready! Add a task above to test the app."
);