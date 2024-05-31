document.querySelector("#register-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        handleFormSubmission();
    });

document.querySelector("#continue").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default button behavior
    handleFormSubmission();
});

document.querySelector("#toggle-password").addEventListener("click", function () {
        const passwordField = document.querySelector("#password");
        const passwordFieldType = passwordField.getAttribute("type");

        if (passwordFieldType === "password") {
            passwordField.setAttribute("type", "text");
            this.innerHTML =
                '<span class="material-symbols-outlined">lock_open</span>'; // Change icon to indicate password is visible
        } else {
            passwordField.setAttribute("type", "password");
            this.innerHTML = '<span class="material-symbols-outlined">lock</span>'; // Change icon to indicate password is hidden
        }
    });

function handleFormSubmission() {
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // Check if any field is empty
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
        document.querySelector('#error-message').textContent;
        document.querySelector('#error-message').style.display = 'block';
        return; // Exit function early if any field is empty
    } else {
        document.querySelector('#error-message').style.display = 'none';
    }

    // Validate email and password
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // Display error messages
    document.querySelector("#error-email").textContent = emailError;
    document.querySelector("#error-email").style.display = emailError ? "block" : "none";

    document.querySelector("#error-password").textContent = passwordError;
    document.querySelector("#error-password").style.display = passwordError ? "block" : "none";

    // Proceed with registration if there are no errors
    if (!emailError && !passwordError) {
        register(username, email, password);
    }
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errorMessage = "";

    if (!emailRegex.test(email) || email.length > 254) {
        errorMessage += document.getElementById('error-email').textContent
    }

    return errorMessage.trim();
}

function validatePassword(password) {
    let errorMessage = '';

    if (
        password.length < 8 ||
        password.length > 128 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[!@#$%^&*]/.test(password)
    ) {
        errorMessage += document.getElementById('error-password').textContent;
    }

    return errorMessage.trim();
}

function register(username, email, password) {
    // Retrieve existing users from localStorage
    // const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists with the same email
    const userExists = existingUsers.some(function (user) {
        return user.email === email;
    });

    if (userExists) {
        // Display "Account already exists" message
        alert("Account already exists");
    } else {
        // Add new user to existing users
        existingUsers.push({
            username: username,
            email: email,
            password: password,
        });

        // Save updated user list to localStorage
        // localStorage.setItem("users", JSON.stringify(existingUsers));

        // Save username to localStorage
        // localStorage.setItem("username", username);

        // Redirect to the next page
        window.location.href = "/pages/dashboard.html";
    }
}
