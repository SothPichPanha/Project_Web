 
// Page navigation functions
function showLogin() {
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('registerPage').classList.remove('active');
    clearAllErrors();
}

function showRegister() {
    document.getElementById('registerPage').classList.add('active');
    document.getElementById('loginPage').classList.remove('active');
    clearAllErrors();
}

// Password visibility toggle
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const toggle = field.parentElement.querySelector('.password-toggle');
    
    if (field.type === 'password') {
field.type = 'text';
toggle.textContent = '🙈';
    } else {
field.type = 'password';
toggle.textContent = '👁️';
    }
}

// Form validation functions
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    
    // Add red border to input field
    const inputField = document.getElementById(fieldId);
    inputField.classList.add('border-red-500');
    inputField.classList.remove('border-gray-300');
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.classList.add('hidden');
    
    // Remove red border from input field
    const inputField = document.getElementById(fieldId);
    inputField.classList.remove('border-red-500');
    inputField.classList.add('border-gray-300');
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('[id$="Error"]');
    errorElements.forEach(element => {
element.classList.add('hidden');
    });
    
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(field => {
field.classList.remove('border-red-500');
field.classList.add('border-gray-300');
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
}

// Login form validation
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    clearAllErrors();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    let isValid = true;

    // Email validation
    if (!email) {
showError('loginEmail', 'Email is required');
isValid = false;
    } else if (!validateEmail(email)) {
showError('loginEmail', 'Please enter a valid email address');
isValid = false;
    }

    // Password validation
    if (!password) {
showError('loginPassword', 'Password is required');
isValid = false;
    }

    if (isValid) {
// Simulate successful login
        console.log('Login data:', { email, password });

        // Simulate successful login (e.g., show success message or spinner here)

        setTimeout(() => {
            window.location.href = '/HTML/1Home_Page.html'; // Redirect to homepage
        }, 3000);
    }
});

// Register form validation
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    clearAllErrors();
    
    const fullName = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    let isValid = true;

    // Full name validation
    if (!fullName) {
showError('registerName', 'Full name is required');
isValid = false;
    } else if (fullName.length < 2) {
showError('registerName', 'Full name must be at least 2 characters');
isValid = false;
    }

    // Email validation
    if (!email) {
showError('registerEmail', 'Email is required');
isValid = false;
    } else if (!validateEmail(email)) {
showError('registerEmail', 'Please enter a valid email address');
isValid = false;
    }

    // Password validation
    if (!password) {
showError('registerPassword', 'Password is required');
isValid = false;
    } else if (!validatePassword(password)) {
showError('registerPassword', 'Password must be at least 6 characters with uppercase, lowercase, and number');
isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
showError('confirmPassword', 'Please confirm your password');
isValid = false;
    } else if (password !== confirmPassword) {
showError('confirmPassword', 'Passwords do not match');
isValid = false;
    }

    // Terms validation
    if (!terms) {
alert('Please accept the Terms of Service and Privacy Policy');
isValid = false;
    }

    if (isValid) {
// Simulate successful registration
alert('Registration successful! Welcome to our platform.');
// In a real app, you would make an API call here
console.log('Registration data:', { fullName, email, password });
// Optionally switch to login page
showLogin();
    }
});

// Real-time validation for better UX
document.getElementById('loginEmail').addEventListener('blur', function() {
    const email = this.value.trim();
    if (email && !validateEmail(email)) {
showError('loginEmail', 'Please enter a valid email address');
    } else if (email) {
clearError('loginEmail');
    }
});

document.getElementById('registerEmail').addEventListener('blur', function() {
    const email = this.value.trim();
    if (email && !validateEmail(email)) {
showError('registerEmail', 'Please enter a valid email address');
    } else if (email) {
clearError('registerEmail');
    }
});

document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = this.value;
    
    if (confirmPassword && password !== confirmPassword) {
showError('confirmPassword', 'Passwords do not match');
    } else if (confirmPassword) {
clearError('confirmPassword');
    }
});

// Clear errors when user starts typing
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
if (this.classList.contains('border-red-500')) {
    clearError(this.id);
}
    });
});
