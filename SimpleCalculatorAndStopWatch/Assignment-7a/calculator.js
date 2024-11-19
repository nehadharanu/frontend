$(document).ready(function () {
  // logged-in username
  const username = localStorage.getItem("username");
  $("#usernameDisplay").text(username);

  //  input fields validation
  const validateFields = () => {
    let isValid = true;

    // Validation for Number 1
    const num1 = $("#number1").val();
    if (!num1) {
      $("#number1Error").text("Number 1 is required.").show();
      isValid = false;
    } else if (!/^-?\d+(\.\d+)?$/.test(num1)) {
      $("#number1Error")
        .text("Please enter a valid number for Number 1.")
        .show();
      isValid = false;
    } else if (!isFinite(num1)) {
      $("#number1Error").text("Number 1 cannot be infinite.").show();
      isValid = false;
    } else {
      $("#number1Error").hide();
    }

    // Validation for Number 2
    const num2 = $("#number2").val();
    if (!num2) {
      $("#number2Error").text("Number 2 is required.").show();
      isValid = false;
    } else if (!/^-?\d+(\.\d+)?$/.test(num2)) {
      $("#number2Error")
        .text("Please enter a valid number for Number 2.")
        .show();
      isValid = false;
    } else if (!isFinite(num2)) {
      $("#number2Error").text("Number 2 cannot be infinite.").show();
      isValid = false;
    } else {
      $("#number2Error").hide();
    }

    return isValid;
  };

  //  arrow function for all operations
  const calculate = (operation) => {
    if (!validateFields()) {
      $("#result").val(""); // Clear result if validation fails
      return;
    }

    const num1 = parseFloat($("#number1").val());
    const num2 = parseFloat($("#number2").val());
    let result;

    // Perform the calculation based on the operation type
    result =
      operation === "add"
        ? num1 + num2
        : operation === "subtract"
        ? num1 - num2
        : operation === "multiply"
        ? num1 * num2
        : operation === "divide"
        ? num2 !== 0
          ? (num1 / num2).toFixed(2)
          : "Cannot divide by zero"
        : "Invalid operation";

    $("#result").val(result);
  };

  // Event listeners for buttons
  $("#addButton").on("click", () => calculate("add"));
  $("#subtractButton").on("click", () => calculate("subtract"));
  $("#multiplyButton").on("click", () => calculate("multiply"));
  $("#divideButton").on("click", () => calculate("divide"));

  // Real-time validation as user types in Number 1 and Number 2 fields
  $("#number1, #number2").on("input", validateFields);
});
