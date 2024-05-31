// Function to redirect to the onboarding HTML page after 3 seconds
function redirectToOnboardingPage() {
    setTimeout(function() {
        window.location.href = '/pages/onboarding.html'; 
    }, 3000); 
}

// Call the redirectToSecondPage function when the first HTML page loads
window.onload = redirectToOnboardingPage;
