// Gamification system: ecocarma, badges, achievements

let userEcocarma = 0;
let userAchievements = [];

function initializeGamification() {
    const user = getCurrentUser();
    if (user) {
        userEcocarma = user.ecocarma || 0;
        userAchievements = user.achievements || [];
    }
}

function addEcocarma(points, reason = '') {
    userEcocarma += points;
    
    // Update user data
    const user = getCurrentUser();
    if (user) {
        user.ecocarma = userEcocarma;
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    // Show notification
    showNotification('🎉 Ecocarma Earned!', `+${points} points${reason ? ': ' + reason : ''}`, 'success');
    
    // Update UI
    updateEcocarmaDisplay();
    
    // Check for achievements
    checkAchievements();
    
    return userEcocarma;
}

function checkAchievements() {
    const user = getCurrentUser();
    if (!user) return;
    
    const metrics = DEMO_DATA.currentMetrics;
    const newAchievements = [];
    
    // Check each achievement
    DEMO_DATA.achievements.forEach(achievement => {
        if (userAchievements.find(a => a.id === achievement.id)) return; // Already unlocked
        
        let unlocked = false;
        
        switch(achievement.id) {
            case 1: // Solar Pioneer
                unlocked = metrics.solutionsImplemented?.some(s => s.name.includes('Solar'));
                break;
            case 2: // Carbon Crusher
                unlocked = metrics.co2Saved >= 1000;
                break;
            case 3: // Efficiency Expert
                unlocked = metrics.energyEfficiencyRating === 'A+';
                break;
            case 4: // Regional Champion
                const userRegion = DEMO_DATA.regions.find(r => r.id === user.region.toLowerCase());
                unlocked = userRegion && userRegion.rank === 1;
                break;
            case 5: // Team Player
                unlocked = (metrics.solutionsImplemented?.length || 0) >= 5;
                break;
            case 6: // Energy Master
                unlocked = metrics.energySaved >= 50000;
                break;
            case 7: // Green Investor
                unlocked = metrics.roiSustainability >= 15;
                break;
            case 8: // Eco Warrior
                unlocked = userEcocarma >= 5000;
                break;
        }
        
        if (unlocked) {
            newAchievements.push(achievement);
            userAchievements.push(achievement);
            addEcocarma(achievement.points, achievement.name);
            showAchievementUnlock(achievement);
        }
    });
    
    // Update user data
    if (newAchievements.length > 0) {
        user.achievements = userAchievements;
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
}

function showAchievementUnlock(achievement) {
    // Create achievement unlock modal/notification
    const notification = document.createElement('div');
    notification.className = 'notification achievement-unlock';
    notification.innerHTML = `
        <div class="notification-icon">${achievement.icon}</div>
        <div class="notification-content">
            <div class="notification-title">Achievement Unlocked!</div>
            <div class="notification-message">${achievement.name}: ${achievement.description}</div>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function updateEcocarmaDisplay() {
    const displays = document.querySelectorAll('.ecocarma-value, .ecocarma-badge');
    displays.forEach(display => {
        if (display.classList.contains('ecocarma-badge')) {
            display.innerHTML = `⚡ ${formatNumber(userEcocarma)} Ecocarma`;
        } else {
            display.textContent = formatNumber(userEcocarma);
        }
    });
}

function calculateSolutionPoints(solution) {
    let points = 0;
    
    // Base points for implementation
    points += 100;
    
    // CO2 savings bonus (1 point per 10kg)
    points += Math.round(solution.co2Saved / 10);
    
    // Energy bonus (1 point per 100kWh)
    const energy = solution.energyProduced || solution.energySaved || 0;
    points += Math.round(energy / 100);
    
    // Efficiency rating bonus
    if (solution.efficiencyRating === 'A+') points += 50;
    else if (solution.efficiencyRating === 'A') points += 30;
    else if (solution.efficiencyRating === 'B') points += 20;
    
    // ROI bonus
    if (solution.roi >= 15) points += 30;
    else if (solution.roi >= 12) points += 20;
    else if (solution.roi >= 10) points += 10;
    
    return points;
}

function getEcocarmaLevel() {
    if (userEcocarma >= 10000) return { level: 10, name: 'Eco Master', color: '#ffd700' };
    if (userEcocarma >= 8000) return { level: 9, name: 'Eco Champion', color: '#c0c0c0' };
    if (userEcocarma >= 6000) return { level: 8, name: 'Eco Expert', color: '#cd7f32' };
    if (userEcocarma >= 5000) return { level: 7, name: 'Eco Warrior', color: '#22a86e' };
    if (userEcocarma >= 4000) return { level: 6, name: 'Eco Leader', color: '#22a8d4' };
    if (userEcocarma >= 3000) return { level: 5, name: 'Eco Advocate', color: '#4dd4a0' };
    if (userEcocarma >= 2000) return { level: 4, name: 'Eco Enthusiast', color: '#4dd4e0' };
    if (userEcocarma >= 1000) return { level: 3, name: 'Eco Starter', color: '#7f8c8d' };
    if (userEcocarma >= 500) return { level: 2, name: 'Eco Beginner', color: '#95a5a6' };
    return { level: 1, name: 'Eco Newcomer', color: '#bdc3c7' };
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initializeGamification();
    updateEcocarmaDisplay();
});



