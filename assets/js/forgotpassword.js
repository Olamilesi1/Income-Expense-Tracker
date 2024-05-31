
document.querySelector("#submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve the email and new password entered by the user
    const email = document.querySelector("#email").value;
    const newPassword = document.querySelector("#password").value;

    if (email.trim() === "" || newPassword.trim() === "") {
        document.querySelector("#error-message").style.display = "block";
        return; // Exit function early if any field is empty
    } else {
        document.querySelector("#error-message").style.display = "none";
    }

    const passwordError = validatePassword(newPassword);
    document.querySelector("#error-password").textContent = passwordError;
    document.querySelector("#error-password").style.display = passwordError ? "block" : "none";

    // Proceed with password reset if there are no errors
    if (!passwordError) {
        forgotPassword(email, newPassword);
    }
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
        errorMessage = "Password must be: at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    return errorMessage.trim();
}

function forgotPassword(email, newPassword) {
    // Check if the email exists in the local storage
    // const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(function(user) {
        return user.email === email;
    });

    if (user) {
        // Email exists, update the password for the user
        user.password = newPassword;

        // Save the updated user list to local storage
        // localStorage.setItem('users', JSON.stringify(existingUsers));

        // Display success message or redirect to login page
        // alert('Password reset successfully.');
        // You can also redirect the user to the login page if needed:
        window.location.href = "../pages/login.html";
    } else {
        // Email does not exist, display error message
        document.querySelector('#error-message').textContent = "This email is not registered.";
        document.querySelector('#error-message').style.display = 'block';
    }
}


    