const params = new URLSearchParams(window.location.search);
const role = (params.get("role") || localStorage.getItem("scholar_role") || "learner").toLowerCase();
const roleLabel = role === "teacher" ? "Teacher" : "Learner";

function appendRole(path) {
  return `${path}?role=${role}`;
}

function setRoleCopy() {
  const title = document.getElementById("roleTitle");
  const subtitle = document.getElementById("roleSubtitle");
  const successTitle = document.getElementById("successTitle");
  const successMessage = document.getElementById("successMessage");

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

    localStorage.setItem("scholar_role", role);
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
    window.location.href = appendRole("./success.html");
  });
}

setRoleCopy();
wireBackLinks();
