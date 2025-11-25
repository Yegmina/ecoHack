// Main application logic

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Initialize navigation
    setupNavigation();
    
    // Initialize dashboard if on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        initializeDashboard();
    }
    
    // Initialize battle page
    if (window.location.pathname.includes('battle.html')) {
        initializeBattlePage();
    }
    
    // Initialize solutions page
    if (window.location.pathname.includes('solutions.html')) {
        initializeSolutionsPage();
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    const result = login(username, password);
    
    if (result.success) {
        errorDiv.classList.remove('show');
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        errorDiv.textContent = result.message || 'Invalid credentials';
        errorDiv.classList.add('show');
    }
}

function setupNavigation() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Update user profile in navbar
    const userProfileElements = document.querySelectorAll('.user-profile');
    userProfileElements.forEach(el => {
        el.innerHTML = `
            <div class="ecocarma-badge">
                ⚡ ${formatNumber(user.ecocarma)} Ecocarma
            </div>
            <div>
                <strong>${user.name}</strong><br>
                <small>${user.team} • ${user.region}</small>
            </div>
            <button class="btn btn-primary" onclick="logout()">Logout</button>
        `;
    });
    
    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function initializeDashboard() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Set active tab
    let activeTab = sessionStorage.getItem('activeTab') || 'citizens';
    switchTab(activeTab);
    
    // Load metrics
    loadMetrics();
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    const activeContent = document.getElementById(`${tabName}View`);
    if (activeContent) {
        activeContent.style.display = 'block';
        activeContent.classList.add('fade-in');
    }
    
    sessionStorage.setItem('activeTab', tabName);
    
    // Load specific metrics
    loadTabMetrics(tabName);
}

function loadMetrics() {
    const metrics = DEMO_DATA.currentMetrics;
    
    // Update all metric displays
    updateCitizenMetrics(metrics);
    updatePolicyMetrics(metrics);
    updateBusinessMetrics(metrics);
}

function loadTabMetrics(tabName) {
    const metrics = DEMO_DATA.currentMetrics;
    
    switch(tabName) {
        case 'citizens':
            updateCitizenMetrics(metrics);
            break;
        case 'policymakers':
            updatePolicyMetrics(metrics);
            break;
        case 'business':
            updateBusinessMetrics(metrics);
            break;
    }
}

function updateCitizenMetrics(metrics) {
    const citizenMetrics = convertToCitizenMetrics(metrics);
    
    // Update trees equivalent
    const treesEl = document.getElementById('treesEquivalent');
    if (treesEl) {
        animateValue(treesEl, 0, citizenMetrics.treesEquivalent, 1000);
    }
    
    // Update homes powered
    const homesEl = document.getElementById('homesPowered');
    if (homesEl) {
        animateValue(homesEl, 0, citizenMetrics.homesPowered, 1000);
    }
    
    // Update cars removed
    const carsEl = document.getElementById('carsRemoved');
    if (carsEl) {
        animateValue(carsEl, 0, citizenMetrics.carsRemoved, 1000);
    }
    
    // Update euros saved
    const eurosEl = document.getElementById('eurosSaved');
    if (eurosEl) {
        animateValue(eurosEl, 0, citizenMetrics.eurosSaved, 1000, ' €');
    }
    
    // Update total metrics
    const totalCO2El = document.getElementById('totalCO2');
    const totalEnergyEl = document.getElementById('totalEnergy');
    const totalEnergySavedEl = document.getElementById('totalEnergySaved');
    
    if (totalCO2El) {
        animateValue(totalCO2El, 0, metrics.co2Saved, 1000, ' kg');
    }
    if (totalEnergyEl) {
        animateValue(totalEnergyEl, 0, metrics.energyProduced, 1000, ' kWh');
    }
    if (totalEnergySavedEl) {
        animateValue(totalEnergySavedEl, 0, metrics.energySaved, 1000, ' kWh');
    }
}

function updatePolicyMetrics(metrics) {
    const policyMetrics = convertToPolicyMetrics(metrics);
    
    // Update CO2 reduction score
    const co2ScoreEl = document.getElementById('co2ReductionScore');
    if (co2ScoreEl) {
        animateValue(co2ScoreEl, 0, policyMetrics.co2ReductionScore, 1000);
        const progressContainer = document.getElementById('co2Progress');
        if (progressContainer) {
            setTimeout(() => {
                updateProgressBar(progressContainer, policyMetrics.co2ReductionScore);
            }, 100);
        }
    }
    
    // Update energy efficiency rating
    const ratingEl = document.getElementById('energyEfficiencyRating');
    if (ratingEl) {
        ratingEl.textContent = policyMetrics.energyEfficiencyRating;
        ratingEl.className = `rating-badge rating-${policyMetrics.energyEfficiencyRating.replace('+', '')}`;
    }
    
    // Update sustainability index
    const sustainEl = document.getElementById('sustainabilityIndex');
    if (sustainEl) {
        animateValue(sustainEl, 0, policyMetrics.lifecycleSustainabilityIndex, 1000);
        const progressContainer = sustainEl.parentElement.querySelector('.progress-container');
        if (progressContainer) {
            setTimeout(() => {
                updateProgressBar(progressContainer, policyMetrics.lifecycleSustainabilityIndex);
            }, 100);
        }
    }
    
    // Update circularity score
    const circularityEl = document.getElementById('circularityScore');
    if (circularityEl) {
        animateValue(circularityEl, 0, policyMetrics.circularityScore, 1000);
        const progressContainer = circularityEl.parentElement.querySelector('.progress-container');
        if (progressContainer) {
            setTimeout(() => {
                updateProgressBar(progressContainer, policyMetrics.circularityScore);
            }, 100);
        }
    }
    
    // Update payback time
    const paybackEl = document.getElementById('paybackTime');
    if (paybackEl) {
        paybackEl.textContent = policyMetrics.paybackTime + ' years';
    }
    
    // Update investment metrics
    const totalInvEl = document.getElementById('totalInvestment');
    const annualSavEl = document.getElementById('annualSavings');
    if (totalInvEl) totalInvEl.textContent = formatCurrency(metrics.totalCost);
    if (annualSavEl) annualSavEl.textContent = formatCurrency(metrics.totalSavings);
}

function updateBusinessMetrics(metrics) {
    const businessMetrics = convertToBusinessMetrics(metrics);
    
    // Update ROI
    const roiEl = document.getElementById('roiSustainability');
    if (roiEl) {
        roiEl.textContent = businessMetrics.roiSustainability + '%';
    }
    
    // Update carbon cost avoidance
    const carbonEl = document.getElementById('carbonCostAvoidance');
    if (carbonEl) {
        carbonEl.textContent = formatCurrency(businessMetrics.carbonCostAvoidance);
    }
    
    // Update CAPEX/OPEX
    const capexEl = document.getElementById('capexValue');
    const opexEl = document.getElementById('opexValue');
    if (capexEl) capexEl.textContent = formatCurrency(businessMetrics.capex);
    if (opexEl) opexEl.textContent = formatCurrency(businessMetrics.opex);
    
    // Update risk level
    const riskEl = document.getElementById('riskLevel');
    if (riskEl) {
        riskEl.textContent = businessMetrics.riskLevel;
        riskEl.className = `badge badge-${businessMetrics.riskLevel === 'Low' ? 'success' : businessMetrics.riskLevel === 'Medium' ? 'warning' : 'danger'}`;
    }
    
    // Update time to profitability
    const profitEl = document.getElementById('timeToProfitability');
    if (profitEl) {
        profitEl.textContent = businessMetrics.timeToProfitability + ' years';
    }
    
    // Update timeline
    const timelineCapexEl = document.getElementById('timelineCapex');
    const profitabilityYearEl = document.getElementById('profitabilityYear');
    if (timelineCapexEl) timelineCapexEl.textContent = formatCurrency(businessMetrics.capex);
    if (profitabilityYearEl) {
        const year = Math.ceil(parseFloat(businessMetrics.timeToProfitability));
        profitabilityYearEl.textContent = `Year ${year}`;
    }
    
    // Update annual revenue
    const annualRevEl = document.getElementById('annualRevenue');
    if (annualRevEl) {
        annualRevEl.textContent = formatCurrency(metrics.totalSavings);
    }
}

function initializeBattlePage() {
    // Battle page is initialized by battle.js
    // This is just a placeholder for any additional initialization
}

function initializeSolutionsPage() {
    renderSolutions();
}

function renderSolutions() {
    const container = document.getElementById('solutionsContainer');
    if (!container) return;
    
    // Group solutions by category
    const categories = {};
    DEMO_DATA.solutions.forEach(solution => {
        if (!categories[solution.category]) {
            categories[solution.category] = [];
        }
        categories[solution.category].push(solution);
    });
    
    container.innerHTML = Object.keys(categories).map(category => {
        const solutions = categories[category];
        return `
            <div class="solution-category-section">
                <h2 class="category-title">${category}</h2>
                <div class="solutions-grid">
                    ${solutions.map(solution => renderSolutionCard(solution)).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function renderSolutionCard(solution) {
    const isImplemented = solution.implemented || false;
    
    return `
        <div class="solution-card">
            <div class="solution-header">
                <div>
                    <div class="solution-icon">${solution.icon}</div>
                    <div class="solution-title">${solution.name}</div>
                    <div class="solution-category">${solution.category}</div>
                </div>
            </div>
            <div class="solution-description">${solution.description}</div>
            <div class="solution-metrics">
                <div class="solution-metric">
                    <div class="solution-metric-label">CO₂ Saved</div>
                    <div class="solution-metric-value">${formatNumber(solution.co2Saved)} kg</div>
                </div>
                <div class="solution-metric">
                    <div class="solution-metric-label">Energy</div>
                    <div class="solution-metric-value">${formatNumber(solution.energyProduced || solution.energySaved)} kWh</div>
                </div>
                <div class="solution-metric">
                    <div class="solution-metric-label">Rating</div>
                    <div class="solution-metric-value">${solution.efficiencyRating}</div>
                </div>
                <div class="solution-metric">
                    <div class="solution-metric-label">ROI</div>
                    <div class="solution-metric-value">${solution.roi}%</div>
                </div>
            </div>
            <div class="solution-actions">
                <button class="btn-implement ${isImplemented ? 'implemented' : ''}" 
                        onclick="implementSolution(${solution.id})"
                        ${isImplemented ? 'disabled' : ''}>
                    ${isImplemented ? '✓ Implemented' : 'Implement Solution'}
                </button>
            </div>
        </div>
    `;
}

function implementSolution(solutionId) {
    const solution = DEMO_DATA.solutions.find(s => s.id === solutionId);
    if (!solution || solution.implemented) return;
    
    // Show implementation simulation
    showImplementationSimulation(solution);
}

function showImplementationSimulation(solution) {
    const user = getCurrentUser();
    const region = user ? DEMO_DATA.regions.find(r => r.id === user.region.toLowerCase()) : null;
    
    // Create confetti effect
    createConfetti();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal implementation-modal';
    modal.innerHTML = `
        <div class="modal-content implementation-content">
            <div class="implementation-header">
                <div class="solution-icon-large">${solution.icon}</div>
                <h2>Implementing ${solution.name}</h2>
                <p>Deploying solution in ${user ? user.region : 'your region'}...</p>
                <div class="location-badge">
                    <span class="location-icon">📍</span>
                    <span>${user ? user.region : 'Helsinki'}, Finland</span>
                </div>
            </div>
            
            <div class="validation-panel">
                <div class="validation-item" id="val1">
                    <div class="validation-icon">🔍</div>
                    <div class="validation-text">Verifying system requirements...</div>
                    <div class="validation-status"></div>
                </div>
                <div class="validation-item" id="val2">
                    <div class="validation-icon">✅</div>
                    <div class="validation-text">Checking environmental compliance...</div>
                    <div class="validation-status"></div>
                </div>
                <div class="validation-item" id="val3">
                    <div class="validation-icon">🔐</div>
                    <div class="validation-text">Validating permits & approvals...</div>
                    <div class="validation-status"></div>
                </div>
            </div>
            
            <div class="implementation-steps">
                <div class="step" id="step1">
                    <div class="step-icon">📋</div>
                    <div class="step-content">
                        <div class="step-title">Planning & Approval</div>
                        <div class="step-status">In progress...</div>
                        <div class="step-details" id="details1"></div>
                    </div>
                    <div class="step-check">✓</div>
                </div>
                <div class="step" id="step2">
                    <div class="step-icon">🏗️</div>
                    <div class="step-content">
                        <div class="step-title">Installation & Setup</div>
                        <div class="step-status">Pending...</div>
                        <div class="step-details" id="details2"></div>
                    </div>
                    <div class="step-check">✓</div>
                </div>
                <div class="step" id="step3">
                    <div class="step-icon">⚡</div>
                    <div class="step-content">
                        <div class="step-title">System Activation</div>
                        <div class="step-status">Pending...</div>
                        <div class="step-details" id="details3"></div>
                    </div>
                    <div class="step-check">✓</div>
                </div>
                <div class="step" id="step4">
                    <div class="step-icon">📊</div>
                    <div class="step-content">
                        <div class="step-title">Impact Measurement & Verification</div>
                        <div class="step-status">Pending...</div>
                        <div class="step-details" id="details4"></div>
                    </div>
                    <div class="step-check">✓</div>
                </div>
            </div>
            
            <div class="implementation-progress">
                <div class="progress-info">
                    <span>Deployment Progress</span>
                    <span id="progressPercent">0%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="implementationProgress" style="width: 0%">
                        <div class="progress-shine"></div>
                    </div>
                </div>
            </div>
            
            <div class="real-time-data" id="realtimeData" style="display: none;">
                <h4>📡 Real-Time Monitoring</h4>
                <div class="data-stream">
                    <div class="data-item">
                        <span class="data-label">System Status:</span>
                        <span class="data-value status-active">● Active</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Energy Output:</span>
                        <span class="data-value" id="realtimeEnergy">0 kWh</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">CO₂ Reduction:</span>
                        <span class="data-value" id="realtimeCO2">0 kg</span>
                    </div>
                    <div class="data-item">
                        <span class="data-label">Efficiency:</span>
                        <span class="data-value">${solution.efficiencyRating}</span>
                    </div>
                </div>
            </div>
            
            <div class="implementation-impact" id="impactSection" style="display: none;">
                <div class="success-animation">
                    <div class="success-icon">✓</div>
                    <h3>🎉 Implementation Complete!</h3>
                    <p class="success-message">Solution successfully deployed and verified</p>
                </div>
                
                <div class="certificate-badge">
                    <div class="certificate-icon">🏆</div>
                    <div class="certificate-text">
                        <strong>Eco Solution Certificate</strong>
                        <span>Verified & Active</span>
                    </div>
                </div>
                
                <div class="impact-metrics">
                    <div class="impact-metric">
                        <div class="impact-icon">🌱</div>
                        <div class="impact-value" id="impactCO2">0</div>
                        <div class="impact-label">kg CO₂ saved/year</div>
                        <div class="impact-trees">≈ ${Math.round(solution.co2Saved / 20)} trees</div>
                    </div>
                    <div class="impact-metric">
                        <div class="impact-icon">⚡</div>
                        <div class="impact-value" id="impactEnergy">0</div>
                        <div class="impact-label">kWh ${solution.energyProduced ? 'produced' : 'saved'}/year</div>
                        <div class="impact-homes">≈ ${Math.round((solution.energyProduced || solution.energySaved) / 3000)} homes</div>
                    </div>
                    <div class="impact-metric">
                        <div class="impact-icon">💰</div>
                        <div class="impact-value" id="impactSavings">€0</div>
                        <div class="impact-label">Annual savings</div>
                        <div class="impact-roi">ROI: ${solution.roi}%</div>
                    </div>
                    <div class="impact-metric">
                        <div class="impact-icon">⭐</div>
                        <div class="impact-value" id="impactPoints">0</div>
                        <div class="impact-label">Ecocarma points</div>
                        <div class="impact-level">Level ${getEcocarmaLevel().level}</div>
                    </div>
                </div>
                
                <div class="before-after">
                    <div class="comparison-item">
                        <div class="comparison-label">Before</div>
                        <div class="comparison-value before-value">
                            <span>CO₂: ${formatNumber(region ? region.co2Saved - solution.co2Saved : 0)} kg</span>
                            <span>Score: ${formatNumber(region ? region.score - calculateSolutionPoints(solution) : 0)}</span>
                        </div>
                    </div>
                    <div class="comparison-arrow">→</div>
                    <div class="comparison-item">
                        <div class="comparison-label">After</div>
                        <div class="comparison-value after-value">
                            <span>CO₂: ${formatNumber(region ? region.co2Saved : solution.co2Saved)} kg</span>
                            <span>Score: ${formatNumber(region ? region.score : calculateSolutionPoints(solution))}</span>
                        </div>
                    </div>
                </div>
                
                ${region ? `
                <div class="region-impact">
                    <div class="region-header">
                        <span class="region-icon">🗺️</span>
                        <p><strong>${region.name}</strong> region impact</p>
                    </div>
                    <div class="score-increase">
                        <span class="increase-icon">📈</span>
                        <span>+${calculateSolutionPoints(solution)} points</span>
                    </div>
                    <div class="region-stats">
                        <div class="region-stat">
                            <span>Rank:</span>
                            <strong>#${region.rank}</strong>
                        </div>
                        <div class="region-stat">
                            <span>Solutions:</span>
                            <strong>${region.solutions + 1}</strong>
                        </div>
                    </div>
                </div>
                ` : ''}
                
                <div class="achievement-preview" id="achievementPreview"></div>
                
                <button class="btn btn-primary btn-large" onclick="closeImplementationModal()" style="margin-top: 1.5rem;">
                    View Dashboard
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImplementationModal();
        }
    });
    
    // Validation steps
    function validateStep(valId, delay) {
        setTimeout(() => {
            const valEl = document.getElementById(valId);
            if (valEl) {
                valEl.classList.add('validated');
                const statusEl = valEl.querySelector('.validation-status');
                if (statusEl) {
                    statusEl.innerHTML = '<span class="check-mark">✓</span>';
                }
            }
        }, delay);
    }
    
    // Animate implementation steps
    let currentStep = 0;
    const steps = ['step1', 'step2', 'step3', 'step4'];
    const stepMessages = [
        'Planning completed ✓',
        'Installation completed ✓',
        'System activated ✓',
        'Impact measured ✓'
    ];
    const stepDetails = [
        '✓ Site survey completed<br>✓ Permits approved<br>✓ Budget allocated',
        '✓ Equipment installed<br>✓ Connections verified<br>✓ Safety checks passed',
        '✓ System online<br>✓ Performance optimal<br>✓ Monitoring active',
        '✓ Data collected<br>✓ Impact verified<br>✓ Certificate issued'
    ];
    
    function updateProgress(percentage) {
        const progressBar = document.getElementById('implementationProgress');
        const progressPercent = document.getElementById('progressPercent');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
        if (progressPercent) {
            progressPercent.textContent = Math.round(percentage) + '%';
        }
    }
    
    function completeStep(stepIndex) {
        if (stepIndex >= steps.length) return;
        
        const stepEl = document.getElementById(steps[stepIndex]);
        if (stepEl) {
            stepEl.classList.add('active');
            const statusEl = stepEl.querySelector('.step-status');
            const detailsEl = stepEl.querySelector('.step-details');
            if (statusEl) {
                statusEl.textContent = stepMessages[stepIndex];
                statusEl.classList.add('completed');
            }
            if (detailsEl) {
                detailsEl.innerHTML = stepDetails[stepIndex];
                detailsEl.style.display = 'block';
            }
            const checkEl = stepEl.querySelector('.step-check');
            if (checkEl) {
                checkEl.style.opacity = '1';
                checkEl.style.transform = 'scale(1)';
            }
        }
        
        updateProgress(((stepIndex + 1) / steps.length) * 100);
    }
    
    function updateRealTimeData() {
        const realtimeEl = document.getElementById('realtimeData');
        if (realtimeEl) {
            realtimeEl.style.display = 'block';
            realtimeEl.classList.add('fade-in');
            
            const energy = solution.energyProduced || solution.energySaved || 0;
            let currentEnergy = 0;
            let currentCO2 = 0;
            const energyIncrement = energy / 20;
            const co2Increment = solution.co2Saved / 20;
            
            const interval = setInterval(() => {
                currentEnergy += energyIncrement;
                currentCO2 += co2Increment;
                
                if (currentEnergy >= energy) currentEnergy = energy;
                if (currentCO2 >= solution.co2Saved) currentCO2 = solution.co2Saved;
                
                const energyEl = document.getElementById('realtimeEnergy');
                const co2El = document.getElementById('realtimeCO2');
                if (energyEl) energyEl.textContent = formatNumber(Math.round(currentEnergy)) + ' kWh';
                if (co2El) co2El.textContent = formatNumber(Math.round(currentCO2)) + ' kg';
                
                if (currentEnergy >= energy && currentCO2 >= solution.co2Saved) {
                    clearInterval(interval);
                }
            }, 100);
        }
    }
    
    // Start validation
    validateStep('val1', 300);
    validateStep('val2', 600);
    validateStep('val3', 900);
    
    // Simulate step-by-step implementation
    setTimeout(() => completeStep(0), 1200);
    setTimeout(() => completeStep(1), 2200);
    setTimeout(() => {
        completeStep(2);
        updateRealTimeData();
    }, 3200);
    setTimeout(() => {
        completeStep(3);
        
        // Show impact section
        setTimeout(() => {
            const impactSection = document.getElementById('impactSection');
            if (impactSection) {
                impactSection.style.display = 'block';
                impactSection.classList.add('fade-in');
                
                // Animate success icon
                const successIcon = impactSection.querySelector('.success-icon');
                if (successIcon) {
                    successIcon.classList.add('success-animate');
                }
                
                // Animate impact metrics
                const points = calculateSolutionPoints(solution);
                const energy = solution.energyProduced || solution.energySaved || 0;
                const savings = Math.round(solution.cost * (solution.roi / 100));
                
                animateValue(document.getElementById('impactCO2'), 0, solution.co2Saved, 1500);
                animateValue(document.getElementById('impactEnergy'), 0, energy, 1500);
                animateValue(document.getElementById('impactPoints'), 0, points, 1500);
                
                // Animate savings
                const savingsEl = document.getElementById('impactSavings');
                if (savingsEl) {
                    let currentValue = 0;
                    const increment = savings / 30;
                    const interval = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= savings) {
                            currentValue = savings;
                            clearInterval(interval);
                        }
                        savingsEl.textContent = formatCurrency(Math.round(currentValue));
                    }, 50);
                }
                
                // Check for new achievements
                setTimeout(() => {
                    checkNewAchievements();
                }, 2000);
            }
        }, 500);
        
        // Actually implement the solution
        finalizeImplementation(solution);
    }, 4200);
}

function finalizeImplementation(solution) {
    const user = getCurrentUser();
    
    // Mark as implemented
    solution.implemented = true;
    if (user) {
        solution.region = user.region;
    }
    
    // Calculate and add ecocarma points
    const points = calculateSolutionPoints(solution);
    addEcocarma(points, solution.name);
    
    // Update region score
    if (user) {
        const region = DEMO_DATA.regions.find(r => r.id === user.region.toLowerCase());
        if (region) {
            region.score += points;
            region.solutions += 1;
            region.co2Saved += solution.co2Saved;
            region.energySaved += (solution.energyProduced || solution.energySaved);
        }
    }
    
    // Update global metrics
    DEMO_DATA.currentMetrics.co2Saved += solution.co2Saved;
    DEMO_DATA.currentMetrics.energyProduced += (solution.energyProduced || 0);
    DEMO_DATA.currentMetrics.energySaved += (solution.energySaved || 0);
    DEMO_DATA.currentMetrics.totalCost += solution.cost;
    DEMO_DATA.currentMetrics.totalSavings += Math.round(solution.cost * (solution.roi / 100));
    
    // Show notification
    showNotification('✅ Solution Implemented!', `${solution.name} is now active in your region!`, 'success');
    
    // Re-render solutions
    renderSolutions();
    
    // Update dashboard if open
    if (window.location.pathname.includes('dashboard.html')) {
        loadMetrics();
    }
}

function closeImplementationModal() {
    const modal = document.querySelector('.implementation-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            modal.remove();
            // Redirect to dashboard if on solutions page
            if (window.location.pathname.includes('solutions.html')) {
                // Optionally redirect or just stay on page
            }
        }, 300);
    }
}

function createConfetti() {
    const colors = ['#22a86e', '#22a8d4', '#4dd4a0', '#4dd4e0'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 50);
    }
}

function checkNewAchievements() {
    const user = getCurrentUser();
    if (!user) return;
    
    const metrics = DEMO_DATA.currentMetrics;
    const newAchievements = [];
    const userAchievementsList = user.achievements || [];
    
    DEMO_DATA.achievements.forEach(achievement => {
        if (userAchievementsList.find(a => a.id === achievement.id)) return;
        
        let unlocked = false;
        const implementedSolutions = DEMO_DATA.solutions.filter(s => s.implemented);
        
        switch(achievement.id) {
            case 1: 
                unlocked = implementedSolutions.some(s => s.name.includes('Solar'));
                break;
            case 2: 
                unlocked = metrics.co2Saved >= 1000;
                break;
            case 3: 
                const policyMetrics = convertToPolicyMetrics(metrics);
                unlocked = policyMetrics.energyEfficiencyRating === 'A+';
                break;
            case 4: 
                const userRegion = DEMO_DATA.regions.find(r => r.id === user.region.toLowerCase());
                unlocked = userRegion && userRegion.rank === 1;
                break;
            case 5: 
                unlocked = implementedSolutions.length >= 5;
                break;
            case 6: 
                unlocked = metrics.energySaved >= 50000;
                break;
            case 7: 
                const businessMetrics = convertToBusinessMetrics(metrics);
                unlocked = businessMetrics.roiSustainability >= 15;
                break;
            case 8: 
                unlocked = (user.ecocarma || 0) >= 5000;
                break;
        }
        
        if (unlocked) {
            newAchievements.push(achievement);
        }
    });
    
    if (newAchievements.length > 0) {
        const previewEl = document.getElementById('achievementPreview');
        if (previewEl) {
            previewEl.innerHTML = `
                <div class="achievement-notification">
                    <h4>🏆 New Achievement Unlocked!</h4>
                    ${newAchievements.map(a => `
                        <div class="achievement-item">
                            <span class="achievement-icon">${a.icon}</span>
                            <div>
                                <strong>${a.name}</strong>
                                <span>${a.description}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            previewEl.style.display = 'block';
        }
    }
}

// Make function globally available
window.closeImplementationModal = closeImplementationModal;

function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    }).format(amount);
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

// Make functions globally available
window.switchTab = switchTab;
window.logout = logout;
window.implementSolution = implementSolution;

