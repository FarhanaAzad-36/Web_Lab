// State variable
let count = 1;

// DOM Elements
const display = document.getElementById('counterValue');
const incBtn = document.getElementById('incBtn');
const decBtn = document.getElementById('decBtn');
const resetBtn = document.getElementById('resetBtn');
const actionMsg = document.getElementById('actionMsg');

function updateUI(actionName) {
  display.textContent = count;

  // Dynamic color coding based on count value
  if (count > 1) {
    display.style.color = "#9333ea"; // Purple
  }
  else if (count < 1) {
    display.style.color =  "#2563eb"; // Blue
  }
  else {
    display.style.color = "#1D1A16"; // Neutral
  }

  actionMsg.textContent =
    `Last action: ${actionName} (Current Count: ${count})`;

  console.log(
    `[User Click Event] ${actionName} -> Count is now ${count}`
  );
}


// *6 button
incBtn.addEventListener('click', () => {
  count = count * 6;
  updateUI("*6 Multiply");
});


// /6 button
decBtn.addEventListener('click', () => {
  count = count / 6;
  updateUI("/6 Divide");
});


// Reset button
resetBtn.addEventListener('click', () => {
  count = 1;
  updateUI("Reset to One");
});


console.log("Event listeners wired! Try clicking *6, /6, or Reset.");