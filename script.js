
const DUE_DATE = new Date("2026-04-18T18:00:00Z");

const checkbox        = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const titleEl         = document.querySelector('[data-testid="test-todo-title"]');
const descEl          = document.querySelector('[data-testid="test-todo-description"]');
const statusBadge     = document.querySelector('[data-testid="test-todo-status"]');
const timeRemainingEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
const editBtn         = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn       = document.querySelector('[data-testid="test-todo-delete-button"]');


function getTimeRemaining(dueDate) {
  const now  = new Date();
  const diff = dueDate - now;
  const abs  = Math.abs(diff);

  const mins = Math.floor(abs / 60_000);
  const hrs  = Math.floor(abs / 3_600_000);
  const days = Math.floor(abs / 86_400_000);

 
  if (diff <= 0) {
    if (mins < 2)  return { text: "Due now!",                                      upcoming: false };
    if (hrs  < 1)  return { text: `Overdue by ${mins} minute${mins !== 1 ? "s" : ""}`, upcoming: false };
    if (hrs  < 24) return { text: `Overdue by ${hrs} hour${hrs !== 1 ? "s" : ""}`,    upcoming: false };
    return               { text: `Overdue by ${days} day${days !== 1 ? "s" : ""}`,    upcoming: false };
  }

 
  if (hrs  < 1)   return { text: "Due now!",                                      upcoming: true };
  if (hrs  < 24)  return { text: `Due in ${hrs} hour${hrs !== 1 ? "s" : ""}`,    upcoming: true };
  if (days === 1) return { text: "Due tomorrow",                                  upcoming: true };
  return                 { text: `Due in ${days} days`,                           upcoming: true };
}

function updateTimeRemaining() {
  const { text, upcoming } = getTimeRemaining(DUE_DATE);

  timeRemainingEl.textContent = text;
  timeRemainingEl.setAttribute("aria-label", "Time remaining: " + text);
  timeRemainingEl.classList.toggle("upcoming", upcoming);
}





editBtn.addEventListener("click", function () {
  console.log("edit clicked");
});


deleteBtn.addEventListener("click", function () {
  alert("Delete clicked");
});

updateTimeRemaining();
setInterval(updateTimeRemaining, 60_000);
