const params = new URLSearchParams(window.location.search);
const role = (params.get("role") || localStorage.getItem("scholar_role") || "learner").toLowerCase();
const roleLabel = role === "teacher" ? "Teacher" : "Learner";

function appendRole(path) {
  return `${path}?role=${role}`;
}

const roleProfiles = {
  teacher: { userID: "UCIS-TCH-001", userName: "Mr. Kofi Mensah" },
  learner: { userID: "UCIS-STU-001", userName: "Amina Mensah" }
};

function persistSession(stage = "login") {
  const profile = roleProfiles[role] || roleProfiles.learner;
  localStorage.setItem("scholar_role", role);
  localStorage.setItem("userRole", role);
  localStorage.setItem("userID", profile.userID);
  localStorage.setItem("userName", profile.userName);
  localStorage.setItem("kycStatus", stage === "verified" ? "verified" : "pending");
}

function setRoleCopy() {
  const title = document.getElementById("roleTitle");
  const subtitle = document.getElementById("roleSubtitle");
  const successTitle = document.getElementById("successTitle");
  const successMessage = document.getElementById("successMessage");
  const successCta = document.getElementById("successCta");

  if (title) {
    title.textContent = `${roleLabel} Login`;
  }
  if (subtitle) {
    subtitle.textContent = role === "teacher"
      ? "Sign in with staff credentials to continue to identity verification."
      : "Sign in with learner credentials to continue to identity verification.";
  }
  if (successTitle) {
    successTitle.textContent = `${roleLabel} Verification Complete`;
  }
  if (successMessage) {
    successMessage.textContent = `KYC approved. ${roleLabel} portal access is now unlocked.`;
  }
  if (successCta) {
    successCta.href = role === "teacher" ? "./teacher-dashboard.html" : "./learner-dashboard.html";
  }
}


function prefillDemoValues() {
  const userId = document.getElementById("userId");
  const password = document.getElementById("password");
  const schoolCode = document.getElementById("schoolCode");
  if (userId && !userId.value) userId.value = role === "teacher" ? "UCIS-TCH-001" : "UCIS-STU-001";
  if (password && !password.value) password.value = "demo123";
  if (schoolCode && !schoolCode.value) schoolCode.value = "UNIQUE-COLLEGE";

  const fullName = document.getElementById("fullName");
  const dob = document.getElementById("dob");
  const idType = document.getElementById("idType");
  const idNumber = document.getElementById("idNumber");
  const phone = document.getElementById("phone");
  if (fullName && !fullName.value) fullName.value = role === "teacher" ? "Ama Boateng" : "Amina Mensah";
  if (dob && !dob.value) dob.value = role === "teacher" ? "1993-05-12" : "2011-07-18";
  if (idType && !idType.value) idType.value = "School ID Card";
  if (idNumber && !idNumber.value) idNumber.value = role === "teacher" ? "TCH-8821" : "STU-4472";
  if (phone && !phone.value) phone.value = "+233 24 000 0000";

  const otp = document.getElementById("otp");
  if (otp && !otp.value) otp.value = "123456";
}

function wireBackLinks() {
  const backToLogin = document.getElementById("backToLogin");
  const backToKyc = document.getElementById("backToKyc");

  if (backToLogin) backToLogin.href = appendRole("./login.html");
  if (backToKyc) backToKyc.href = appendRole("./kyc.html");
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value.trim();
    const schoolCode = document.getElementById("schoolCode").value.trim();

    if (!userId || !password || !schoolCode) {
      alert("Please complete all login fields.");
      return;
    }

    persistSession("login");
    window.location.href = appendRole("./kyc.html");
  });
}

const kycForm = document.getElementById("kycForm");
if (kycForm) {
  kycForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const requiredIds = ["fullName", "dob", "idType", "idNumber", "phone"];
    const missing = requiredIds.some((id) => !document.getElementById(id).value.trim());
    if (missing) {
      alert("Please complete all KYC fields before continuing.");
      return;
    }

    persistSession("kyc");
    window.location.href = appendRole("./otp.html");
  });
}

const otpForm = document.getElementById("otpForm");
if (otpForm) {
  otpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const otp = document.getElementById("otp").value.trim();
    if (otp !== "123456") {
      alert("Invalid OTP. Please use demo code 123456.");
      return;
    }
    persistSession("verified");
    window.location.href = appendRole("./success.html");
  });
}

setRoleCopy();
wireBackLinks();


prefillDemoValues();