$(document).ready(function () {
  // Utility function to check for a valid email format
  function isEmail(email) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  // Show/Hide Password Toggle
  $("#togglePassword").on("click", function () {
    const passwordField = $("#Password");
    const type = passwordField.attr("type") === "password" ? "text" : "password";
    passwordField.attr("type", type);
    $(this).text(type === "password" ? "Show" : "Hide");
  });

  $("#toggleConfirmPassword").on("click", function () {
    const passwordField = $("#Confirm-Password");
    const type = passwordField.attr("type") === "password" ? "text" : "password";
    passwordField.attr("type", type);
    $(this).text(type === "password" ? "Show" : "Hide");
  });

  // 🔒 Block characters in phone number input
  $("#phoneno").on("keypress", function (e) {
    // Allow only digits (0–9)
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });

  $("#phoneno").on("paste", function (e) {
    const pasteData = e.originalEvent.clipboardData.getData('text');
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault();
    }
  });

  // 🧪 Form Validation
  $("form").submit(function (event) {
    event.preventDefault();
    var errorMessages = "";

    // --- Email Validation ---
    if ($("#Email").val() === "") {
      errorMessages += "<p>Email is required.</p>";
    } else if (!isEmail($("#Email").val())) {
      errorMessages += "<p>Please enter a valid email address.</p>";
    }

    // --- Phone Number Validation ---
    if ($("#phoneno").val() === "") {
      errorMessages += "<p>Phone number is required.</p>";
    } else if (!$.isNumeric($("#phoneno").val())) {
      errorMessages += "<p>Phone number must contain only digits.</p>";
    } else if ($("#phoneno").val().length !== 10) {
      errorMessages += "<p>Phone number must be exactly 10 digits.</p>";
    }

    // --- Password Validation ---
    if ($("#Password").val() === "") {
      errorMessages += "<p>Password is required.</p>";
    } else {
      var password = $("#Password").val();
      if (password.length < 8) {
        errorMessages += "<p>Password must be at least 8 characters long.</p>";
      }
      if (!/[A-Z]/.test(password)) {
        errorMessages += "<p>Password must contain at least one uppercase letter.</p>";
      }
      if (!/[a-z]/.test(password)) {
        errorMessages += "<p>Password must contain at least one lowercase letter.</p>";
      }
      if (!/[0-9]/.test(password)) {
        errorMessages += "<p>Password must contain at least one number.</p>";
      }
    }

    if ($("#Confirm-Password").val() === "") {
      errorMessages += "<p>Confirm Password is required.</p>";
    }
    if (
      $("#Password").val() &&
      $("#Confirm-Password").val() &&
      $("#Password").val() !== $("#Confirm-Password").val()
    ) {
      errorMessages += "<p>Passwords do not match.</p>";
    }

    // --- Display Result ---
    if (errorMessages !== "") {
      $("#errors")
        .html("<h3>Please correct the following errors:</h3>" + errorMessages)
        .addClass("error-active")
        .removeClass("success-active");
    } else {
      $("#errors")
        .html("<h3>Success!</h3><p>You are now registered.</p>")
        .addClass("success-active")
        .removeClass("error-active");
    }
  });
});
