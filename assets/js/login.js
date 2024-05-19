document.querySelector('#login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Check if email or password is empty
    if ( email.trim() === '' || password.trim() === '') {
        document.querySelector('#error-message').style.display = 'block';
        return; // Exit function early if any field is empty
    } else {
        document.querySelector('#error-message').style.display = 'none';
    }

    // Call the login function with email and password
    login(email, password);
});



document.querySelector('#continue').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default button behavior

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Check if email or password is empty
    // if (email.trim() === '' || password.trim() === '') {
    //     alert('Please enter both email and password.');
    //     return; // Exit function early if email or password is empty
    // }

    if ( email.trim() === '' || password.trim() === '') {
        document.querySelector('#error-message').style.display = 'block';
        return; // Exit function early if any field is empty
    } else {
        document.querySelector('#error-message').style.display = 'none';
    }


    // Call the login function with email and password
    login(email, password);
});

function login(email, password) {
    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find user with matching email and password
    const user = existingUsers.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (user) {
        // Save username to localStorage
        localStorage.setItem('username', user.username);

        // Redirect to the next page
        window.location.href = "/pages/dashboard.html";
    } else {
        // Display error message for incorrect email/password
        alert('Invalid email or password. Please try again.');
    }
}
