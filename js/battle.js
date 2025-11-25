// Region battle system logic

function updateLeaderboards() {
    updateRegionLeaderboard();
    updateTeamLeaderboard();
    updatePlayerLeaderboard();
}

function updateRegionLeaderboard() {
    const container = document.getElementById('regionLeaderboard');
    if (!container) return;
    
    const regions = [...DEMO_DATA.regions].sort((a, b) => b.score - a.score);
    
    container.innerHTML = regions.map((region, index) => {
        const rank = index + 1;
        const rankClass = rank === 1 ? 'top-1' : rank === 2 ? 'top-2' : rank === 3 ? 'top-3' : '';
        
        return `
            <div class="leaderboard-item stagger-item">
                <div class="rank ${rankClass}">${rank}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${region.name}</div>
                    <div class="leaderboard-details">${region.teams} teams • ${region.solutions} solutions</div>
                </div>
                <div class="leaderboard-score">${formatNumber(region.score)}</div>
            </div>
        `;
    }).join('');
}

function updateTeamLeaderboard() {
    const container = document.getElementById('teamLeaderboard');
    if (!container) return;
    
    const teams = [...DEMO_DATA.teams].sort((a, b) => b.score - a.score).slice(0, 10);
    
    container.innerHTML = teams.map((team, index) => {
        const rank = index + 1;
        const rankClass = rank === 1 ? 'top-1' : rank === 2 ? 'top-2' : rank === 3 ? 'top-3' : '';
        
        return `
            <div class="leaderboard-item stagger-item">
                <div class="rank ${rankClass}">${rank}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${team.name}</div>
                    <div class="leaderboard-details">${team.region} • ${team.members} members</div>
                </div>
                <div class="leaderboard-score">${formatNumber(team.score)}</div>
            </div>
        `;
    }).join('');
}

function updatePlayerLeaderboard() {
    const container = document.getElementById('playerLeaderboard');
    if (!container) return;
    
    const players = [...DEMO_DATA.users].sort((a, b) => b.ecocarma - a.ecocarma);
    
    container.innerHTML = players.map((player, index) => {
        const rank = index + 1;
        const rankClass = rank === 1 ? 'top-1' : rank === 2 ? 'top-2' : rank === 3 ? 'top-3' : '';
        
        return `
            <div class="leaderboard-item stagger-item">
                <div class="rank ${rankClass}">${rank}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${player.name}</div>
                    <div class="leaderboard-details">${player.team} • ${player.region}</div>
                </div>
                <div class="leaderboard-score">${formatNumber(player.ecocarma)}</div>
            </div>
        `;
    }).join('');
}

function renderRegionMap() {
    const container = document.getElementById('regionMap');
    if (!container) return;
    
    const regions = [...DEMO_DATA.regions].sort((a, b) => b.score - a.score);
    
    container.innerHTML = regions.map(region => {
        const isActive = false; // Could be based on user's region
        const percentage = (region.score / regions[0].score) * 100;
        
        return `
            <div class="region-card ${isActive ? 'active' : ''}" data-region="${region.id}">
                <div class="region-name">${region.name}</div>
                <div class="region-score">${formatNumber(region.score)}</div>
                <div class="region-stats">
                    <div class="stat-pill">
                        <span>Rank</span>
                        <strong>#${region.rank}</strong>
                    </div>
                    <div class="stat-pill">
                        <span>Teams</span>
                        <strong>${region.teams}</strong>
                    </div>
                    <div class="stat-pill">
                        <span>Solutions</span>
                        <strong>${region.solutions}</strong>
                    </div>
                    <div class="stat-pill">
                        <span>CO₂ Saved</span>
                        <strong>${formatNumber(region.co2Saved)} kg</strong>
                    </div>
                </div>
                <div class="progress-container" style="margin-top: 1rem;">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    container.querySelectorAll('.region-card').forEach(card => {
        card.addEventListener('click', function() {
            const regionId = this.dataset.region;
            showRegionDetails(regionId);
        });
    });
}

function showRegionDetails(regionId) {
    const region = DEMO_DATA.regions.find(r => r.id === regionId);
    if (!region) return;
    
    // Create modal or update sidebar with region details
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${region.name} Details</h2>
                <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="stats-row">
                    <div class="stat-item">
                        <div class="stat-label">Total Score</div>
                        <div class="stat-value">${formatNumber(region.score)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Rank</div>
                        <div class="stat-value">#${region.rank}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Teams</div>
                        <div class="stat-value">${region.teams}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Solutions</div>
                        <div class="stat-value">${region.solutions}</div>
                    </div>
                </div>
                <div class="stats-row">
                    <div class="stat-item">
                        <div class="stat-label">CO₂ Saved</div>
                        <div class="stat-value">${formatNumber(region.co2Saved)} kg</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Energy Saved</div>
                        <div class="stat-value">${formatNumber(region.energySaved)} kWh</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles if not present
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s;
            }
            .modal-content {
                background: white;
                border-radius: 15px;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-light);
            }
        `;
        document.head.appendChild(style);
    }
}

function simulateRealTimeUpdate() {
    // Simulate random updates to regions
    setInterval(() => {
        const randomRegion = DEMO_DATA.regions[Math.floor(Math.random() * DEMO_DATA.regions.length)];
        const pointsIncrease = Math.floor(Math.random() * 100) + 50;
        randomRegion.score += pointsIncrease;
        
        // Re-sort regions
        DEMO_DATA.regions.sort((a, b) => b.score - a.score);
        DEMO_DATA.regions.forEach((r, i) => r.rank = i + 1);
        
        // Update displays
        updateLeaderboards();
        renderRegionMap();
        
        // Show notification
        showNotification('⚡ Live Update!', `${randomRegion.name} gained ${pointsIncrease} points!`, 'info');
    }, 15000); // Every 15 seconds
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

function showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-icon">${type === 'success' ? '✅' : type === 'info' ? 'ℹ️' : '🎉'}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('regionMap')) {
        renderRegionMap();
        updateLeaderboards();
        simulateRealTimeUpdate();
    }
});



