document.querySelector('#register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Check if any field is empty
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
        document.querySelector('#error-message').style.display = 'block';
        return; // Exit function early if any field is empty
    } else {
        document.querySelector('#error-message').style.display = 'none';
    }

    // Call the register function with username, email, and password
    register(username, email, password);
});

document.querySelector('#continue').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default button behavior

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Check if any field is empty
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
        document.querySelector('#error-message').style.display = 'block';
        return; // Exit function early if any field is empty
    } else {
        document.querySelector('#error-message').style.display = 'none';
    }

    // Call the register function with username, email, and password
    register(username, email, password);
});

function register(username, email, password) {
    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists with the same email
    const userExists = existingUsers.some(function(user) {
        return user.email === email;
    });

    if (userExists) {
        // Display "Account already exists" message
        alert('Account already exists');
    } else {
        // Add new user to existing users
        existingUsers.push({ username: username, email: email, password: password });

        // Save updated user list to localStorage
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // Save username to localStorage
        localStorage.setItem('username', username);

        // Redirect to the next page
        window.location.href = "/pages/dashboard.html";
    }
}
