const tabs = [
  "Learning Hub",
  "Assignments",
  "Tests & Quizzes",
  "Grades & Feedback",
  "Attendance",
  "Announcements"
];

const content = {
  "Learning Hub": `
    <h3>Learning Hub</h3>
    <p class="muted">Assignments, quizzes, lesson notes, and class materials organized by subject.</p>
    <div class="item"><span class="pill success">Mathematics</span><h4>Number Operations Practice Quiz</h4><p>Topic: Fractions and decimals • Teacher: Mr. Boateng</p></div>
    <div class="item"><span class="pill warning">Science</span><h4>States of Matter Study Notes</h4><p>Review material uploaded for upcoming class activity.</p></div>
    <p class="notice">If no tasks exist, ScholarAi shows: "No assessments or assignments have been posted yet."</p>
  `,
  Assignments: `
    <h3>Assignments</h3>
    <div class="item"><span class="pill warning">Due in 2 days</span><h4>English Essay: My Learning Goals</h4><p>Teacher: Ms. Addo</p><p>Write a 500-word essay and upload a PDF before Friday, 4:00 PM.</p><button class="btn-primary">Submit Assignment</button></div>
    <div class="item"><span class="pill success">Submitted</span><h4>Integrated Science Worksheet</h4><p>Teacher: Mr. Kofi</p></div>
  `,
  "Tests & Quizzes": `
    <h3>Tests and Quizzes</h3>
    <p class="muted">Secure Test Mode activates when you start an exam.</p>
    <div class="item"><span class="pill danger">Exam Today</span><h4>Mathematics Quiz - Number Operations</h4><p>Duration: 25 minutes • Questions: 20</p><button class="btn-primary" id="startQuizBtn">Start Secure Test</button></div>
    <p class="notice">Secure mode in production uses managed browser + device restrictions to prevent cheating.</p>
  `,
  "Grades & Feedback": `
    <h3>Grades and Feedback</h3>
    <div class="item"><h4>Mathematics Quiz 1</h4><p><strong>Score:</strong> 88%</p><p><strong>Teacher Feedback:</strong> Great accuracy. Revise word problems.</p></div>
    <div class="item"><h4>English Reading Assessment</h4><p><strong>Score:</strong> 76%</p><p><strong>Teacher Feedback:</strong> Improve summary structure and punctuation.</p></div>
  `,
  Attendance: `
    <h3>Attendance</h3>
    <div class="item"><span class="pill success">Present</span>Monday</div>
    <div class="item"><span class="pill success">Present</span>Tuesday</div>
    <div class="item"><span class="pill warning">Late</span>Wednesday</div>
    <div class="item"><span class="pill success">Present</span>Thursday</div>
  `,
  Announcements: `
    <h3>Announcements</h3>
    <div class="item"><h4>Mid-Term Timetable Released</h4><p>Check your test schedule in the Learning Hub.</p></div>
    <div class="item"><h4>Parents Meeting - Friday</h4><p>Parents and students should attend at 2:30 PM in the school hall.</p></div>
  `
};

const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const panel = document.getElementById("panel");
const tabsEl = document.getElementById("tabs");
const secureOverlay = document.getElementById("secureOverlay");
const workflowStatus = document.getElementById("workflowStatus");

function renderTabs(active = "Learning Hub") {
  tabsEl.innerHTML = tabs.map((tab) => `<button class="${tab === active ? "active" : "btn-soft"}" data-tab="${tab}">${tab}</button>`).join("");
  panel.innerHTML = content[active];
}

tabsEl.addEventListener("click", (e) => {
  const button = e.target.closest("button[data-tab]");
  if (!button) return;
  renderTabs(button.dataset.tab);
});

document.getElementById("loginBtn").addEventListener("click", () => {
  const id = document.getElementById("studentId").value.trim();
  const pw = document.getElementById("password").value.trim();
  if (!id || !pw) {
    alert("Please enter Student ID and password.");
    return;
  }
  loginSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
  renderTabs();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  dashboardSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

document.body.addEventListener("click", (e) => {
  if (e.target.id === "startQuizBtn") {
    secureOverlay.classList.remove("hidden");
    document.documentElement.requestFullscreen?.().catch(() => {});
  }
});

document.getElementById("submitQuizBtn").addEventListener("click", () => {
  secureOverlay.classList.add("hidden");
  alert("Quiz submitted. Score processing started.");
});

document.getElementById("exitSecureBtn").addEventListener("click", () => {
  secureOverlay.classList.add("hidden");
  document.exitFullscreen?.();
});

fetch("./czx/workflows/scholarai-student-platform-phase1.workflow.czx.json")
  .then((res) => res.json())
  .then((data) => {
    workflowStatus.textContent = `Loaded workflow: ${data.workflowName} (${data.modules.length} modules)`;
  })
  .catch(() => {
    workflowStatus.textContent = "Workflow file not loaded.";
  });
