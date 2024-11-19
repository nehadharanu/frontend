$(document).ready(function () {
  function validateForm() {
    let isValid = true;

    // Email validation
    const email = $("#email").val();
    if (!email) {
      $("#emailError").text("Email is required.").show();
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(email)) {
      $("#emailError")
        .text("Please enter a valid Northeastern email address.")
        .show();
      isValid = false;
    } else {
      $("#emailError").hide();
    }

    // Username validation
    const username = $("#username").val();
    if (!username) {
      $("#usernameError").text("Username is required.").show();
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      $("#usernameError")
        .text("Username can only contain letters and numbers.")
        .show();
      isValid = false;
    } else if (username.length < 3 || username.length > 15) {
      $("#usernameError")
        .text("Username must be between 3 and 15 characters.")
        .show();
      isValid = false;
    } else {
      $("#usernameError").hide();
    }

    // Password validation
    const password = $("#password").val();
    if (!password) {
      $("#passwordError").text("Password is required.").show();
      isValid = false;
    } else if (password.length < 8 || password.length > 20) {
      $("#passwordError")
        .text("Password must be between 8 and 20 characters.")
        .show();
      isValid = false;
    } else {
      $("#passwordError").hide();
    }

    // Confirm Password validation
    const confirmPassword = $("#confirm-password").val();
    if (!confirmPassword) {
      $("#confirmPasswordError").text("Please confirm your password.").show();
      isValid = false;
    } else if (confirmPassword !== password) {
      $("#confirmPasswordError").text("Passwords do not match.").show();
      isValid = false;
    } else {
      $("#confirmPasswordError").hide();
    }

    // Enabling login button only if all fields are valid
    $("#loginButton").prop("disabled", !isValid);
  }

  // event listeners for real-time validation on input
  $("#email, #username, #password, #confirm-password").on(
    "input",
    validateForm
  );

  // Submit form and redirect to cal.html
  $("#loginForm").on("submit", function (e) {
    e.preventDefault(); // Prevent form submission
    const username = $("#username").val();
    localStorage.setItem("username", username); //  localStorage
    window.location.href = "calculator.html";
  });
});
