// Metric calculations and conversions

function convertToCitizenMetrics(data) {
    return {
        treesEquivalent: Math.round(data.co2Saved / 20), // 1 tree = ~20kg CO2/year
        homesPowered: Math.round(data.energyProduced / 3000), // Average home uses 3000 kWh/year
        carsRemoved: Math.round(data.co2Saved / 1667), // Average car emits ~1667kg CO2/year
        eurosSaved: data.totalSavings || 0
    };
}

function convertToPolicyMetrics(data) {
    // CO2 Reduction Score (0-100)
    const maxCO2 = 200000; // kg (target)
    const co2Score = Math.min(100, Math.round((data.co2Saved / maxCO2) * 100));
    
    // Energy Efficiency Rating (A-E)
    const efficiency = data.energySaved / (data.energyProduced + data.energySaved);
    let rating = 'E';
    if (efficiency >= 0.8) rating = 'A+';
    else if (efficiency >= 0.7) rating = 'A';
    else if (efficiency >= 0.6) rating = 'B';
    else if (efficiency >= 0.5) rating = 'C';
    else if (efficiency >= 0.4) rating = 'D';
    
    // Lifecycle Sustainability Index (0-100)
    const sustainabilityIndex = Math.round(
        (co2Score * 0.4) + 
        (efficiency * 100 * 0.3) + 
        (data.circularityScore || 70) * 0.3
    );
    
    // Payback Time
    const paybackTime = data.totalCost / (data.totalSavings || 1);
    
    return {
        co2ReductionScore: co2Score,
        energyEfficiencyRating: rating,
        lifecycleSustainabilityIndex: sustainabilityIndex,
        circularityScore: data.circularityScore || 72,
        paybackTime: paybackTime.toFixed(1)
    };
}

function convertToBusinessMetrics(data) {
    // ROI of Sustainability
    const annualSavings = data.totalSavings || 0;
    const roi = ((annualSavings / data.totalCost) * 100).toFixed(1);
    
    // Carbon Cost Avoidance (at 50 EUR per ton CO2)
    const carbonCostAvoidance = (data.co2Saved / 1000) * 50;
    
    // Risk Level
    let riskLevel = 'Low';
    if (data.paybackTime > 12) riskLevel = 'High';
    else if (data.paybackTime > 8) riskLevel = 'Medium';
    
    // Time to Profitability
    const timeToProfitability = data.totalCost / (annualSavings || 1);
    
    return {
        roiSustainability: parseFloat(roi),
        carbonCostAvoidance: Math.round(carbonCostAvoidance),
        capex: data.totalCost,
        opex: Math.round(data.totalCost * 0.1), // 10% of CAPEX
        riskLevel: riskLevel,
        timeToProfitability: timeToProfitability.toFixed(1)
    };
}

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

function animateValue(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    const isNumber = typeof end === 'number';
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        if (isNumber) {
            const current = Math.round(start + (end - start) * easeOutQuart);
            element.textContent = formatNumber(current) + suffix;
        } else {
            element.textContent = end;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function updateProgressBar(containerElement, percentage) {
    const fill = containerElement ? containerElement.querySelector('.progress-fill') : null;
    if (fill) {
        fill.style.width = percentage + '%';
        fill.textContent = Math.round(percentage) + '%';
    }
}

