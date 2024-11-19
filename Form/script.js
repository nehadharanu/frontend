const form = document.getElementById("feedback-form");
const submitBtn = document.getElementById("submit");
const dataContainer = document.getElementById("submittedDataContainer");
// regex for first and last name (alphabetic, no special characters, min 2, max 50)
const regExName = /^[a-zA-Z]{2,50}$/;
// regex for comments (alphanumeric, min 10, max 200 characters)
const regExAlphaNumeric = /^[a-zA-Z0-9\s]{10,200}$/;
// regex for email domain restricted
const regExEmail = /^[\w\.\-]+@northeastern\.edu$/;
// regex for phone (xxx-xxx-xxxx format)
const regExPhone = /^\d{3}-?\d{3}-\d{4}$/;
// regex for zipcode (5 or 9 digit zip)
const regExZip = /^\d{5}(?:-\d{4})?$/;
// regex for additional details(N/A ,min 10,max 100)
const regExDetails = /^N\/A$|^.{10,100}$/;

let formValid = {
  title: false,
  firstName: false,
  lastName: false,
  emailId: false,
  phoneNumber: false,
  zipcode: false,
  comments: false,
  source: false,
  streetAddress1: false,
  city: false,
  state: false,
  feedbackCategory: false,
  additionalDetails: true,
};

const fieldLabelMap = {
  title: "Title",
  firstName: "First Name",
  lastName: "Last Name",
  emailId: "Email Address",
  phoneNumber: "Phone Number",
  streetAddress1: "Street Address 1",
  streetAddress2: "Street Address 2",
  city: "City",
  state: "State",
  zipcode: "Zip Code",
  comments: "Comments",
  source: "How did you hear from us?",
  feedbackCategory: "Feedback Category",
  additionalDetails: "Additional Details",
};

// even listeners for  input validation events
form.addEventListener("input", (e) => {
  validateField(e.target);
  toggleSubmitButton();
});
// even listeners for  change validation events
form.addEventListener("change", (e) => {
  validateField(e.target);
  toggleSubmitButton();
});

// Adding blur event for when users leave the field without interacting with it
form.addEventListener(
  "blur",
  (e) => {
    validateField(e.target);
    toggleSubmitButton();
  },
  true
);

// Dedicated validation for the title radio buttons
const titleRadios = document.querySelectorAll('input[name="title"]');
titleRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    validateField({ name: "title" });
    toggleSubmitButton();
  });
});

function validateField(input) {
  const id = input.id || input.name;
  const value = input.value ? input.value.trim() : "";
  let isValid = false;

  // Validation for each field
  switch (id) {
    case "title":
      isValid = form.querySelector('input[name="title"]:checked') !== null;
      break;

    case "firstName":
    case "lastName":
      isValid = regExName.test(value);
      break;

    case "emailId":
      isValid = regExEmail.test(value);
      break;

    case "phoneNumber":
      isValid = regExPhone.test(value);
      break;

    case "zipcode":
      isValid = regExZip.test(value);
      break;

    case "comments":
      isValid = regExAlphaNumeric.test(value);
      break;

    case "source":
      isValid =
        form.querySelectorAll('input[name="source"]:checked').length > 0;
      break;

    case "streetAddress1":
    case "city":
    case "state":
      isValid = value.length > 0;
      break;

    case "streetAddress2": // Street Address 2 is optional, so it's always valid
      isValid = true;
      break;

    case "additionalDetails":
      const checkbox = document.getElementById("detailsCheckbox");
      // Only validate additional details if the checkbox is checked
      if (checkbox && checkbox.checked) {
        isValid = regExDetails.test(value);
      } else {
        isValid = true; // Skip validation if checkbox is not checked
      }
      break;

    default:
      isValid = value.length > 0;
      break;
  }

  formValid[id] = isValid;
  const errorField = document.getElementById(`error-${id}`);
  if (errorField) {
    errorField.style.display = isValid ? "none" : "block";
  }
  toggleSubmitButton();
}

function toggleSubmitButton() {
  // enabling submit btn only if all fields are valid
  const allValid = Object.values(formValid).every(Boolean);
  submitBtn.disabled = !allValid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  const submissionContainer = document.createElement("div");
  submissionContainer.id = "submissionContainer"; //for h3 styling

  const formData = new FormData(form);
  const table = document.createElement("table");
  table.border = 1;

  const headerRow = document.createElement("tr");
  ["Field", "Value"].forEach((heading) => {
    const th = document.createElement("th");
    th.innerText = heading;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Looping through form data and create rows for each field
  formData.forEach((value, key) => {
    const row = document.createElement("tr");
    const friendlyName = fieldLabelMap[key] || key;
    // cell for field name
    const fieldCell = document.createElement("td");
    fieldCell.innerText = friendlyName;
    row.appendChild(fieldCell);
    // for value cell
    const valueCell = document.createElement("td");
    valueCell.innerText = value;
    row.appendChild(valueCell);
    table.appendChild(row);
  });

  // Clear any previous table before appending the new one
  dataContainer.innerHTML = "";
  const heading = document.createElement("h3");
  heading.innerText = "Submitted Data:";
  submissionContainer.appendChild(heading);
  submissionContainer.appendChild(table);
  dataContainer.appendChild(submissionContainer);
  form.reset();
  for (let key in formValid) {
    formValid[key] = false;
  }
  toggleSubmitButton();
});

function handleCategoryChange() {
  const categorySelect = document.getElementById("feedbackCategory").value;
  validateField({ id: "feedbackCategory", value: categorySelect });
  const checkboxContainer = document.getElementById("dynamicCheckboxContainer");
  const textFieldContainer = document.getElementById(
    "dynamicTextFieldContainer"
  );

  //clearing previous checkbox and text field
  checkboxContainer.innerHTML = "";
  textFieldContainer.innerHTML = "";

  if (categorySelect) {
    // Create a new checkbox dynamically
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "detailsCheckbox";
    checkbox.name =
      "Would you like to provide more details for Product Quality?";
    checkbox.onchange = handleCheckboxToggle;

    const label = document.createElement("label");
    label.htmlFor = "detailsCheckbox";
    label.innerText = ` Would you like to provide more details for ${categorySelect}?`;

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
  }
}

function handleCheckboxToggle() {
  const checkbox = document.getElementById("detailsCheckbox");
  const textFieldContainer = document.getElementById(
    "dynamicTextFieldContainer"
  );

  // Clear the text field container before adding a new one
  textFieldContainer.innerHTML = "";

  if (checkbox.checked) {
    textFieldContainer.innerHTML = `
      <textarea 
        id="additionalDetails" 
        name="additionalDetails" 
        placeholder="Please provide additional details..." 
        rows="5" 
        cols="25" 
        required></textarea>
      <span class="error" id="error-additionalDetails" style="display: none; color: red;">
        Please enter between 10 and 100 characters or "N/A"
      </span>
    `;
    formValid.additionalDetails = false;
    // Add validation function dynamically to textarea
    const textarea = document.getElementById("additionalDetails");
    textarea.oninput = validateAdditionalDetails; // Attach validation on input
  } else {
    formValid.additionalDetails = true; // Set to valid if checkbox is unchecked
    toggleSubmitButton();
  }
}

function validateAdditionalDetails() {
  const textarea = document.getElementById("additionalDetails");
  const errorMsg = document.getElementById("error-additionalDetails");
  const value = textarea.value.trim(); // Trim spaces to avoid empty inputs with only spaces

  // Validate against regex (min 10, max 100 characters or "N/A")
  const isValid = regExDetails.test(value);
  formValid.additionalDetails = isValid;
  errorMsg.style.display = isValid ? "none" : "block";

  toggleSubmitButton();
}
