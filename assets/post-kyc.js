(function () {
  const byId = (id) => document.getElementById(id);

  const sharedPrimarySubjects = {
    "English Language": { "Reading & Writing": ["Phonics", "Comprehension", "Composition"], "Oral Language": ["Listening", "Speaking"] },
    "Ghanaian Language": { "Literacy": ["Reading", "Writing"], "Communication": ["Oral expression", "Storytelling"] },
    Mathematics: { Numbers: ["Whole Numbers", "Fractions", "Decimals"], Geometry: ["Shapes", "Measurement"], "Data & Probability": ["Data collection", "Simple probability"] },
    Science: { "Living World": ["Plants", "Animals", "Human body"], "Material World": ["Matter", "Forces"], "Earth & Space": ["Weather", "Solar system"] },
    Computing: { "Digital Literacy": ["Computer basics", "Internet safety"], Programming: ["Algorithms", "Block coding"] },
    "Our World Our People": { Citizenship: ["Community values", "National identity"], Environment: ["Natural resources", "Conservation"] },
    "Creative Arts and Design": { "Visual Arts": ["Drawing", "Color"], "Performing Arts": ["Music", "Drama"] },
    "Religious and Moral Education": { Beliefs: ["Major religions", "Moral lessons"], Ethics: ["Respect", "Honesty"] },
    "Physical and Health Education": { Fitness: ["Movement", "Games"], Health: ["Personal hygiene", "Safety"] },
    "Career Technology": { "Basic Design": ["Tools", "Simple construction"], "Home Skills": ["Food basics", "Textiles"] },
    French: { "Basic Communication": ["Greetings", "Simple sentences"], Vocabulary: ["School", "Family"] }
  };

  const sharedJhsSubjects = {
    "English Language": { Grammar: ["Sentence structure", "Punctuation"], Literature: ["Poetry", "Prose"] },
    "Ghanaian Language": { Grammar: ["Syntax", "Vocabulary"], Literature: ["Folklore", "Reading passages"] },
    Mathematics: { Numbers: ["Fractions", "Ratio"], Algebra: ["Expressions", "Equations"], Geometry: ["Angles", "Mensuration"] },
    "Integrated Science": { "Diversity of Matter": ["Atoms", "Compounds"], "Cycles & Systems": ["Ecosystems", "Energy"] },
    "Social Studies": { Governance: ["Democracy", "Citizenship"], Development: ["Economy", "Environment"] },
    Computing: { "Digital Systems": ["Hardware", "Software"], Programming: ["Logic", "Web basics"] },
    "Career Technology": { "Pre-technical": ["Technical drawing", "Materials"], "Home Economics": ["Food & nutrition", "Management in living"] },
    "Creative Arts and Design": { "Visual communication": ["Design", "Craft"], "Performance": ["Music", "Drama"] },
    "Religious and Moral Education": { Religion: ["Beliefs", "Practices"], Morality: ["Ethics", "Responsibility"] },
    French: { Communication: ["Dialogues", "Writing"], Culture: ["Francophone culture", "Applied vocabulary"] }
  };

  const sharedShsSubjects = {
    "English Language": { Comprehension: ["Critical reading", "Summary"], Composition: ["Essays", "Reports"] },
    "Core Mathematics": { Algebra: ["Quadratics", "Functions"], Statistics: ["Data analysis", "Probability"] },
    "Integrated Science": { Biology: ["Cells", "Genetics"], Chemistry: ["Bonding", "Reactions"], Physics: ["Motion", "Electricity"] },
    "Social Studies": { Governance: ["Constitution", "Citizenship"], Development: ["Economy", "Globalization"] },
    "ICT / Computing": { Productivity: ["Spreadsheets", "Databases"], Programming: ["Algorithms", "Application design"] },
    Physics: { Mechanics: ["Forces", "Energy"], Waves: ["Light", "Sound"] },
    Chemistry: { "Physical Chemistry": ["Thermochemistry", "Equilibrium"], "Organic Chemistry": ["Hydrocarbons", "Polymers"] },
    Biology: { "Life Processes": ["Nutrition", "Respiration"], Ecology: ["Population", "Conservation"] },
    "Elective Mathematics": { Calculus: ["Differentiation", "Integration"], "Advanced Algebra": ["Matrices", "Series"] },
    Geography: { "Physical Geography": ["Landforms", "Climate"], "Human Geography": ["Population", "Settlement"] },
    Economics: { Microeconomics: ["Demand & supply", "Market structures"], Macroeconomics: ["National income", "Inflation"] },
    Government: { Constitution: ["Arms of government", "Rule of law"], Politics: ["Parties", "International relations"] },
    History: { "Ghana History": ["Pre-colonial", "Post-independence"], "World History": ["Wars", "Global change"] },
    "Literature in English": { Prose: ["Themes", "Characterization"], Drama: ["Plot", "Stagecraft"], Poetry: ["Imagery", "Tone"] },
    Accounting: { "Financial Accounting": ["Ledger", "Trial balance"], "Cost Accounting": ["Costing", "Budgeting"] },
    "Business Management": { Management: ["Planning", "Leadership"], Entrepreneurship: ["Business models", "Risk management"] },
    "General Knowledge in Art": { "Art History": ["Traditional art", "Modern art"], Design: ["Concept development", "Portfolio"] },
    "Agricultural Science": { "Crop Production": ["Soil science", "Crop husbandry"], "Animal Production": ["Livestock", "Animal health"] },
    "Home Economics": { "Food & Nutrition": ["Meal planning", "Food science"], "Management in Living": ["Family resource management", "Consumer education"] },
    French: { Language: ["Advanced grammar", "Essay writing"], Culture: ["Literature", "Civilization"] }
  };

  const curriculum = {
    1: sharedPrimarySubjects,
    2: sharedPrimarySubjects,
    3: sharedPrimarySubjects,
    4: sharedPrimarySubjects,
    5: sharedPrimarySubjects,
    6: sharedPrimarySubjects,
    7: sharedJhsSubjects,
    8: sharedJhsSubjects,
    9: sharedJhsSubjects,
    10: sharedShsSubjects,
    11: sharedShsSubjects,
    12: sharedShsSubjects
  };

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
        localStorage.clear();
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

    toggle.addEventListener("click", () => panel.classList.toggle("hidden"));

    if (askBtn && input && output) {
      askBtn.addEventListener("click", () => {
        const q = input.value.trim();
        if (!q) return;
        const grade = byId("practiceGrade")?.value || byId("lessonGrade")?.value || "7";
        const subject = byId("practiceSubject")?.value || byId("lessonSubject")?.value || "Mathematics";

        output.innerHTML = `<strong>ScholarAi Tutor:</strong> For Grade ${grade} ${subject}, here is a guided response:<br>
        1) Concept in simple terms<br>2) Worked example<br>3) 1 challenge question<br><br>
        <em>Q:</em> ${q}<br><br>
        <strong>Example:</strong> Fractions are parts of a whole. 3/6 equals 1/2 by dividing numerator and denominator by 3.`;
      });
    }
  }

  function populateSelect(select, values) {
    if (!select) return;
    select.innerHTML = values.map((v) => `<option value="${v}">${v}</option>`).join("");
  }

  function setupCurriculumChain(gradeId, subjectId, strandId, subStrandId, defaultGrade = "7") {
    const gradeSelect = byId(gradeId);
    const subjectSelect = byId(subjectId);
    const strandSelect = byId(strandId);
    const subStrandSelect = byId(subStrandId);
    if (!gradeSelect || !subjectSelect || !strandSelect || !subStrandSelect) return;

    populateSelect(gradeSelect, Array.from({ length: 12 }, (_, i) => String(i + 1)).map((g) => `Grade ${g}`));
    gradeSelect.value = `Grade ${defaultGrade}`;

    function refreshSubjects() {
      const grade = gradeSelect.value.replace("Grade ", "");
      const subjects = Object.keys(curriculum[grade] || {});
      populateSelect(subjectSelect, subjects);
      refreshStrands();
    }

    function refreshStrands() {
      const grade = gradeSelect.value.replace("Grade ", "");
      const subject = subjectSelect.value;
      const strands = Object.keys(curriculum[grade]?.[subject] || {});
      populateSelect(strandSelect, strands);
      refreshSubStrands();
    }

    function refreshSubStrands() {
      const grade = gradeSelect.value.replace("Grade ", "");
      const subject = subjectSelect.value;
      const strand = strandSelect.value;
      const subs = curriculum[grade]?.[subject]?.[strand] || [];
      populateSelect(subStrandSelect, subs);
    }

    gradeSelect.addEventListener("change", refreshSubjects);
    subjectSelect.addEventListener("change", refreshStrands);
    strandSelect.addEventListener("change", refreshSubStrands);
    refreshSubjects();
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

    setupCurriculumChain("practiceGrade", "practiceSubject", "practiceStrand", "practiceSubStrand", "7");

    const assignments = [
      { id: "A1", title: "Fractions Word Problems", subject: "Mathematics", teacher: "Mr. Boateng", deadline: "Today, 4:00 PM", difficulty: "Medium" },
      { id: "A2", title: "Reading Comprehension", subject: "English Language", teacher: "Ms. Asante", deadline: "Tomorrow, 10:00 AM", difficulty: "Easy" }
    ];

    const assignmentList = byId("assignmentList");
    if (assignmentList) {
      assignmentList.innerHTML = assignments.map((a) => `
        <article class="border border-slate-200 rounded-xl p-3">
          <h4 class="font-semibold">${a.title}</h4>
          <p class="text-sm text-slate-500">${a.subject} • ${a.teacher} • ${a.deadline}</p>
          <div class="mt-2 flex gap-2">
            <a class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm" href="./assignment-view.html?id=${a.id}">Start Assignment</a>
            <button class="px-3 py-1.5 rounded-lg border text-sm" type="button">Preview</button>
          </div>
        </article>`).join("");
    }

    const generatePracticeBtn = byId("generatePracticeBtn");
    const practiceOutput = byId("practiceOutput");
    if (generatePracticeBtn && practiceOutput) {
      generatePracticeBtn.addEventListener("click", () => {
        const grade = byId("practiceGrade").value;
        const subject = byId("practiceSubject").value;
        const strand = byId("practiceStrand").value;
        const sub = byId("practiceSubStrand").value;
        const difficulty = byId("practiceDifficulty").value;

        practiceOutput.innerHTML = `
          <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm">
            <p class="font-semibold">AI Generated Practice Set • ${grade} ${subject}</p>
            <p>${strand} → ${sub} • Difficulty: ${difficulty}</p>
            <ol class="list-decimal pl-5 mt-2 space-y-1">
              <li><strong>MCQ:</strong> Curriculum-aligned objective item</li>
              <li><strong>Short Answer:</strong> Explain key concept with one example</li>
              <li><strong>Drag & Drop:</strong> Match terms to definitions</li>
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
        <label class="option-row"><input type="radio" name="answer" value="${i}" ${picks[index] === i ? "checked" : ""} /> ${opt}</label>`).join("");
      optionsWrap.querySelectorAll('input[name="answer"]').forEach((input) => {
        input.addEventListener("change", () => {
          picks[index] = Number(input.value);
        });
      });
    }

    byId("nextQuestion")?.addEventListener("click", () => {
      if (index < questions.length - 1) {
        index += 1;
        drawQuestion();
      }
    });

    byId("prevQuestion")?.addEventListener("click", () => {
      if (index > 0) {
        index -= 1;
        drawQuestion();
      }
    });

    byId("submitAssignment")?.addEventListener("click", () => {
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

    setupCurriculumChain("lessonGrade", "lessonSubject", "lessonStrand", "lessonSubStrand", "10");
    setupCurriculumChain("quizGrade", "quizSubject", "quizStrand", "quizSubStrand", "10");

    const lessonYear = byId("lessonYear");
    if (lessonYear) {
      populateSelect(lessonYear, ["Grade 10", "Grade 11", "Grade 12", "Basic 7", "Basic 8", "Basic 9"]);
    }

    byId("generateLessonBtn")?.addEventListener("click", () => {
      const grade = byId("lessonGrade").value;
      const subject = byId("lessonSubject").value;
      const strand = byId("lessonStrand").value;
      const subStrand = byId("lessonSubStrand").value;
      const year = byId("lessonYear").value;
      byId("lessonOutput").innerHTML = `
        <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm">
          <h4 class="font-semibold">${grade} ${subject} • ${strand} • ${subStrand} (${year})</h4>
          <p><strong>Learning Objectives:</strong> Measurable goals aligned to NaCCA indicator/outcome.</p>
          <p><strong>Starter Activity:</strong> 5-min engagement task linked to prior knowledge.</p>
          <p><strong>Core Teaching Steps:</strong> Explicit instruction + guided + independent practice.</p>
          <p><strong>Interactive Activity:</strong> Group inquiry with differentiated support.</p>
          <p><strong>Assessment Check:</strong> Exit ticket + rubric checkpoint.</p>
          <p><strong>Homework:</strong> Curriculum-linked reinforcement task.</p>
        </div>`;
    });

    byId("generateQuizBtn")?.addEventListener("click", () => {
      const grade = byId("quizGrade").value;
      const subject = byId("quizSubject").value;
      const strand = byId("quizStrand").value;
      const subStrand = byId("quizSubStrand").value;
      const count = byId("quizCount").value;
      const difficulty = byId("quizDifficulty").value;

      byId("quizOutput").innerHTML = `
        <div class="rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm">
          <p><strong>NaCCA-aligned quiz generated</strong> • ${grade} ${subject}</p>
          <p>${strand} → ${subStrand} • ${count} questions • ${difficulty}</p>
          <ul class="list-disc pl-5 mt-2">
            <li>MCQ set with strand indicators</li>
            <li>Short-answer reasoning item</li>
            <li>Problem-solving challenge</li>
          </ul>
          <div class="mt-2 flex gap-2">
            <button class="px-3 py-1.5 rounded-lg border">Edit Question</button>
            <button class="px-3 py-1.5 rounded-lg border">Add Question</button>
            <button class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white">Publish Quiz</button>
          </div>
        </div>`;
    });
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
  if (page === "