// Simulated authentication system

let currentUser = null;

function login(username, password) {
    const user = DEMO_DATA.users.find(u => 
        u.username === username && u.password === password
    );
    
    if (user) {
        currentUser = { ...user };
        // Store in sessionStorage for demo
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        return { success: true, user: currentUser };
    } else {
        return { success: false, message: 'Invalid username or password' };
    }
}

function logout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function getCurrentUser() {
    if (!currentUser) {
        const stored = sessionStorage.getItem('currentUser');
        if (stored) {
            currentUser = JSON.parse(stored);
        }
    }
    return currentUser;
}

function isAuthenticated() {
    return getCurrentUser() !== null;
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // Check if already logged in
        if (isAuthenticated()) {
            window.location.href = 'dashboard.html';
        }
    } else {
        // Check authentication for protected pages
        if (!isAuthenticated()) {
            window.location.href = 'index.html';
        }
    }
});



