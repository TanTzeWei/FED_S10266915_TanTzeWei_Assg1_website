function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please fill in both fields.');
        return false;
    }
    // Add more validation logic as needed, like regex for email format.
    return true;
}
