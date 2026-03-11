(function () {
  const byId = (id) => document.getElementById(id);

  function getSession() {
    const userRole = (localStorage.getItem("userRole") || localStorage.getItem("scholar_role") || "learner").toLowerCase();
    const userName = localStorage.getItem("userName") || (userRole === "teacher" ? "Mr. Kofi Mensah" : "Amina Mensah");
    const userID = localStorage.getItem("userID") || (userRole === "teacher" ? "UCIS-TCH-001" : "UCIS-STU-001");
    const kycStatus = localStorage.getItem("kycStatus") || "verified";

    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userID", userID);
    localStorage.setItem("kycStatus", kycStatus);

    return { userRole, userName, userID, kycStatus };
  }

  function redirectToRoleDashboard(role) {
    window.location.href = role === "teacher" ? "./teacher-dashboard.html" : "./learner-dashboard.html";
  }

  function requireVerified() {
    const session = getSession();
    if (session.kycStatus !== "verified") {
      window.location.href = "./kyc.html";
      return null;
    }
    return session;
  }

  function enforceRole(expectedRole) {
    const session = requireVerified();
    if (!session) return null;
    if (session.userRole !== expectedRole) {
      redirectToRoleDashboard(session.userRole);
      return null;
    }
    return session;
  }

  function fillIdentity(session) {
    const nameEl = byId("sessionUserName");
    const idEl = byId("sessionUserID");
    if (nameEl) nameEl.textContent = session.userName;
    if (idEl) idEl.textContent = session.userID;
  }

  function setupLogout() {
    document.querySelectorAll('[data-action="logout"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("scholar_role");
        localStorage.removeItem("userName");
        localStorage.removeItem("userID");
        localStorage.removeItem("kycStatus");
        window.location.href = "./index.html";
      });
    });
  }

  function setupAiTutor() {
    const toggle = byId("tutorToggle");
    const panel = byId("aiTutorPanel");
    const askBtn = byId("askTutorBtn");
    const input = byId("tutorInput");
    const output = byId("tutorOutput");

    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => panel.classList.toggle("open"));

    if (askBtn && input && output) {
      askBtn.addEventListener("click", () => {
        const q = input.value.trim().toLowerCase();
        if (!q) return;
        if (q.includes("fraction")) {
          output.innerHTML = "<strong>Explanation:</strong> Fractions represent parts of a whole. <br><strong>Worked Example:</strong> 2/4 = 1/2 by dividing numerator and denominator by 2. <br><strong>Practice:</strong> Simplify 6/9.";
        } else {
          output.innerHTML = "<strong>AI Tutor:</strong> Great question. Start with the concept definition, then apply one worked example, and test yourself with one practice question.";
        }
      });
    }
  }

  function initSuccessPage() {
    const session = getSession();
    localStorage.setItem("kycStatus", "verified");
    const msg = byId("successMessage");
    if (msg) msg.textContent = `KYC approved. Redirecting ${session.userName} to ${session.userRole} dashboard...`;
    setTimeout(() => redirectToRoleDashboard(session.userRole), 1200);
  }

  function renderLearnerDashboard() {
    const session = enforceRole("learner");
    if (!session) return;
    fillIdentity(session);
    setupLogout();
    setupAiTutor();

    const assignments = [
      { id: "A1", title: "Fractions Word Problems", subject: "Mathematics", teacher: "Mr. Boateng", deadline: "Today, 4:00 PM", difficulty: "Medium" },
      { id: "A2", title: "Photosynthesis Notes", subject: "Integrated Science", teacher: "Ms. Asante", deadline: "Tomorrow, 10:00 AM", difficulty: "Easy" }
    ];

    const assignmentList = byId("assignmentList");
    if (assignmentList) {
      assignmentList.innerHTML = assignments.map((a) => `
        <article class="assignment-card">
          <h4>${a.title}</h4>
          <p><strong>Subject:</strong> ${a.subject}</p>
          <p><strong>Teacher:</strong> ${a.teacher}</p>
          <p><strong>Deadline:</strong> ${a.deadline}</p>
          <p><span class="badge">Difficulty: ${a.difficulty}</span></p>
          <div class="row-actions">
            <a class="primary-button" href="./assignment-view.html?id=${a.id}">Start Assignment</a>
            <button class="ghost-button" type="button">Preview</button>
          </div>
        </article>`).join("");
    }

    const generatePracticeBtn = byId("generatePracticeBtn");
    const practiceOutput = byId("practiceOutput");
    if (generatePracticeBtn && practiceOutput) {
      generatePracticeBtn.addEventListener("click", () => {
        const subject = byId("practiceSubject").value;
        const strand = byId("practiceStrand").value;
        const difficulty = byId("practiceDifficulty").value;
        practiceOutput.innerHTML = `
          <div class="quiz-container">
            <p><strong>Generated Set:</strong> ${subject} • ${strand} • ${difficulty}</p>
            <ol>
              <li>MCQ: Which fraction is equivalent to 3/6?<br/>A. 1/3 B. 1/2 C. 2/3 D. 3/4</li>
              <li>Short Answer: Simplify 12/20.</li>
              <li>Drag & Drop (prototype): Match fractions to decimal values.</li>
            </ol>
          </div>`;
      });
    }
  }

  function renderAssignmentView() {
    const session = enforceRole("learner");
    if (!session) return;
    fillIdentity(session);
    setupLogout();
    setupAiTutor();

    const questions = [
      { q: "Which fraction is equivalent to 4/8?", options: ["1/2", "1/4", "2/3", "3/4"], answer: 0 },
      { q: "What is 3/5 + 1/5?", options: ["4/5", "3/10", "2/5", "1"], answer: 0 },
      { q: "Convert 0.25 to fraction.", options: ["1/2", "1/4", "2/5", "3/4"], answer: 1 }
    ];

    let index = 0;
    const picks = Array(questions.length).fill(null);

    const qText = byId("questionText");
    const optionsWrap = byId("questionOptions");
    const progress = byId("questionProgress");

    function drawQuestion() {
      const current = questions[index];
      progress.textContent = `Question ${index + 1} of ${questions.length}`;
      qText.textContent = current.q;
      optionsWrap.innerHTML = current.options.map((opt, i) => `
        <label class="option-row">
          <input type="radio" name="answer" value="${i}" ${picks[index] === i ? "checked" : ""} /> ${opt}
        </label>`).join("");
      optionsWrap.querySelectorAll('input[name="answer"]').forEach((input) => {
        input.addEventListener("change", () => {
          picks[index] = Number(input.value);
        });
      });
    }

    byId("nextQuestion").addEventListener("click", () => {
      if (index < questions.length - 1) {
        index += 1;
        drawQuestion();
      }
    });

    byId("prevQuestion").addEventListener("click", () => {
      if (index > 0) {
        index -= 1;
        drawQuestion();
      }
    });

    byId("submitAssignment").addEventListener("click", () => {
      const correct = questions.reduce((acc, q, i) => acc + (picks[i] === q.answer ? 1 : 0), 0);
      const scorePercent = Math.round((correct / questions.length) * 100);
      const result = {
        scorePercent,
        correct,
        incorrect: questions.length - correct,
        teacherFeedback: scorePercent >= 70 ? "Great effort. Keep practicing word problems." : "Revise equivalent fractions and retry practice set.",
        aiRevision: scorePercent >= 70 ? "Decimals and percentage conversions" : "Equivalent fractions, adding unlike fractions"
      };
      localStorage.setItem("latestAssignmentResult", JSON.stringify(result));
      localStorage.setItem("learnerAnalytics", JSON.stringify({ average: scorePercent, completion: 86 }));
      window.location.href = "./results.html";
    });

    drawQuestion();
  }

  function renderResults() {
    const session = enforceRole("learner");
    if (!session) return;
    fillIdentity(session);
    setupLogout();

    const data = JSON.parse(localStorage.getItem("latestAssignmentResult") || "{}");
    byId("scorePercent").textContent = `${data.scorePercent ?? 0}%`;
    byId("correctAnswers").textContent = data.correct ?? 0;
    byId("incorrectAnswers").textContent = data.incorrect ?? 0;
    byId("teacherFeedback").textContent = data.teacherFeedback || "No feedback available yet.";
    byId("aiRecommended").textContent = data.aiRevision || "Review recent weak topics.";
  }

  function renderProgress() {
    const session = enforceRole("learner");
    if (!session) return;
    fillIdentity(session);
    setupLogout();

    const data = JSON.parse(localStorage.getItem("learnerAnalytics") || '{"average":82,"completion":76}');
    byId("avgScoreVal").textContent = `${data.average}%`;
    byId("completionVal").textContent = `${data.completion}%`;
    byId("avgScoreBar").style.width = `${data.average}%`;
    byId("completionBar").style.width = `${data.completion}%`;
  }

  function renderTeacherDashboard() {
    const session = enforceRole("teacher");
    if (!session) return;
    fillIdentity(session);
    setupLogout();

    const lessonBtn = byId("generateLessonBtn");
    const lessonOutput = byId("lessonOutput");
    if (lessonBtn && lessonOutput) {
      lessonBtn.addEventListener("click", () => {
        const subject = byId("lessonSubject").value;
        const strand = byId("lessonStrand").value;
        const subStrand = byId("lessonSubStrand").value;
        const year = byId("lessonYear").value;
        lessonOutput.innerHTML = `
          <div class="quiz-container">
            <h4>${subject} • ${strand} • ${subStrand} (${year})</h4>
            <p><strong>Learning Objectives:</strong> Identify and solve equivalent fraction tasks.</p>
            <p><strong>Starter Activity:</strong> Fraction flash cards warm-up.</p>
            <p><strong>Core Teaching Steps:</strong> Model examples, guided practice, independent task.</p>
            <p><strong>Interactive Activity:</strong> Pair matching game using visual fraction cards.</p>
            <p><strong>Assessment Check:</strong> Exit ticket with 3 quick questions.</p>
            <p><strong>Homework Suggestion:</strong> Solve 10 word problems on fractions.</p>
          </div>`;
      });
    }

    const quizBtn = byId("generateQuizBtn");
    const quizOutput = byId("quizOutput");
    if (quizBtn && quizOutput) {
      quizBtn.addEventListener("click", () => {
        quizOutput.innerHTML = `
          <div class="quiz-container">
            <p><strong>NaCCA Aligned Quiz Generated</strong> (Subject > Strand > Sub-strand > Indicator > Outcome)</p>
            <ul>
              <li>Q1 (MCQ): Equivalent fractions</li>
              <li>Q2 (Short answer): Simplify fractions</li>
              <li>Q3 (Problem solving): Fraction word problem</li>
            </ul>
            <div class="row-actions">
              <button class="ghost-button" type="button">Edit Question</button>
              <button class="ghost-button" type="button">Add Question</button>
              <button class="primary-button" type="button">Publish Quiz</button>
            </div>
          </div>`;
      });
    }
  }

  function renderStudentInsights() {
    const session = enforceRole("teacher");
    if (!session) return;
    fillIdentity(session);
    setupLogout();
  }

  function renderContentLibrary() {
    const session = enforceRole("teacher");
    if (!session) return;
    fillIdentity(session);
    setupLogout();
  }

  const page = document.body.dataset.page;
  if (page === "success") initSuccessPage();
  if (page === "learner-dashboard") renderLearnerDashboard();
  if (page === "assignment-view") renderAssignmentView();
  if (page === "results") renderResults();
  if (page === "progress") renderProgress();
  if (page === "teacher-dashboard") renderTeacherDashboard();
  if (page === "student-insights") renderStudentInsights();
  if (page === "content-library") renderContentLibrary();
})();
