// All hardcoded demo data

const DEMO_DATA = {
    // User credentials (hardcoded for demo)
    users: [
        { username: 'demo', password: 'demo123', name: 'Demo User', team: 'EcoWarriors', region: 'Kamppi', ecocarma: 2450 },
        { username: 'team1', password: 'team1', name: 'Team Alpha', team: 'GreenTech', region: 'Kallio', ecocarma: 3200 },
        { username: 'admin', password: 'admin', name: 'Admin User', team: 'EcoLeaders', region: 'Pasila', ecocarma: 5100 }
    ],

    // Helsinki regions
    regions: [
        {
            id: 'kamppi',
            name: 'Kamppi',
            score: 12500,
            teams: 4,
            solutions: 12,
            co2Saved: 45000,
            energySaved: 120000,
            rank: 1
        },
        {
            id: 'kallio',
            name: 'Kallio',
            score: 11800,
            teams: 5,
            solutions: 15,
            co2Saved: 42000,
            energySaved: 115000,
            rank: 2
        },
        {
            id: 'pasila',
            name: 'Pasila',
            score: 10200,
            teams: 3,
            solutions: 10,
            co2Saved: 38000,
            energySaved: 98000,
            rank: 3
        },
        {
            id: 'punavuori',
            name: 'Punavuori',
            score: 9800,
            teams: 4,
            solutions: 9,
            co2Saved: 35000,
            energySaved: 92000,
            rank: 4
        },
        {
            id: 'toolo',
            name: 'Töölö',
            score: 8900,
            teams: 3,
            solutions: 8,
            co2Saved: 32000,
            energySaved: 85000,
            rank: 5
        }
    ],

    // Teams data
    teams: [
        { id: 1, name: 'EcoWarriors', region: 'Kamppi', score: 3200, members: 5, solutions: 4 },
        { id: 2, name: 'GreenTech', region: 'Kallio', score: 2900, members: 4, solutions: 5 },
        { id: 3, name: 'EcoLeaders', region: 'Pasila', score: 2800, members: 6, solutions: 3 },
        { id: 4, name: 'SolarSquad', region: 'Kamppi', score: 2700, members: 4, solutions: 3 },
        { id: 5, name: 'CarbonCrushers', region: 'Kallio', score: 2600, members: 5, solutions: 4 },
        { id: 6, name: 'EnergyElite', region: 'Punavuori', score: 2500, members: 4, solutions: 3 },
        { id: 7, name: 'SustainableStars', region: 'Töölö', score: 2400, members: 3, solutions: 2 },
        { id: 8, name: 'GreenGuardians', region: 'Kamppi', score: 2300, members: 5, solutions: 2 }
    ],

    // Urban energy solutions
    solutions: [
        {
            id: 1,
            category: 'Produce energy locally',
            name: 'Solar Panels Installation',
            icon: '☀️',
            description: 'Install rooftop solar panels to generate clean electricity',
            co2Saved: 2500, // kg per year
            energyProduced: 8000, // kWh per year
            cost: 15000, // EUR
            paybackTime: 8, // years
            efficiencyRating: 'A',
            roi: 12.5,
            riskLevel: 'Low',
            implemented: false,
            region: null
        },
        {
            id: 2,
            category: 'Produce energy locally',
            name: 'Geothermal Heat Pumps',
            icon: '🌍',
            description: 'Ground-source heat pumps for efficient heating and cooling',
            co2Saved: 3200,
            energyProduced: 0,
            energySaved: 10000,
            cost: 25000,
            paybackTime: 10,
            efficiencyRating: 'A+',
            roi: 10.2,
            riskLevel: 'Low',
            implemented: false,
            region: null
        },
        {
            id: 3,
            category: 'Produce energy locally',
            name: 'Solar Thermal Systems',
            icon: '🔥',
            description: 'Solar collectors for hot water and space heating',
            co2Saved: 1800,
            energyProduced: 0,
            energySaved: 6000,
            cost: 12000,
            paybackTime: 7,
            efficiencyRating: 'A',
            roi: 14.3,
            riskLevel: 'Low',
            implemented: false,
            region: null
        },
        {
            id: 4,
            category: 'Store and balance energy',
            name: 'Battery Energy Storage',
            icon: '🔋',
            description: 'Large-scale battery systems for energy storage and grid balancing',
            co2Saved: 1500,
            energyProduced: 0,
            energySaved: 5000,
            cost: 30000,
            paybackTime: 12,
            efficiencyRating: 'B+',
            roi: 8.5,
            riskLevel: 'Medium',
            implemented: false,
            region: null
        },
        {
            id: 5,
            category: 'Store and balance energy',
            name: 'Thermal Energy Storage',
            icon: '💧',
            description: 'Hot water tanks and seasonal storage systems',
            co2Saved: 2200,
            energyProduced: 0,
            energySaved: 7500,
            cost: 18000,
            paybackTime: 9,
            efficiencyRating: 'A-',
            roi: 11.1,
            riskLevel: 'Low',
            implemented: false,
            region: null
        },
        {
            id: 6,
            category: 'Use energy more efficiently',
            name: 'Smart Grid Implementation',
            icon: '⚡',
            description: 'Intelligent grid management for optimized energy distribution',
            co2Saved: 4000,
            energyProduced: 0,
            energySaved: 15000,
            cost: 50000,
            paybackTime: 11,
            efficiencyRating: 'A',
            roi: 9.1,
            riskLevel: 'Medium',
            implemented: false,
            region: null
        },
        {
            id: 7,
            category: 'Use energy more efficiently',
            name: 'Demand-Response Systems',
            icon: '📊',
            description: 'Automated systems to reduce energy consumption during peak times',
            co2Saved: 2800,
            energyProduced: 0,
            energySaved: 11000,
            cost: 22000,
            paybackTime: 8,
            efficiencyRating: 'A-',
            roi: 12.7,
            riskLevel: 'Low',
            implemented: false,
            region: null
        },
        {
            id: 8,
            category: 'Use energy more efficiently',
            name: 'Energy-Efficient Building Upgrades',
            icon: '🏢',
            description: 'Heat pumps, ventilation automation, and insulation improvements',
            co2Saved: 3500,
            energyProduced: 0,
            energySaved: 13000,
            cost: 35000,
            paybackTime: 10,
            efficiencyRating: 'A',
            roi: 10.0,
            riskLevel: 'Low',
            implemented: false,
            region: null
        },
        {
            id: 9,
            category: 'Modernize district heating & cooling',
            name: 'Heat Recovery from Data Centers',
            icon: '💻',
            description: 'Capture waste heat from data centers for district heating',
            co2Saved: 5000,
            energyProduced: 0,
            energySaved: 20000,
            cost: 60000,
            paybackTime: 9,
            efficiencyRating: 'A+',
            roi: 11.1,
            riskLevel: 'Medium',
            implemented: false,
            region: null
        },
        {
            id: 10,
            category: 'Modernize district heating & cooling',
            name: 'Low-Temperature District Heating',
            icon: '🌡️',
            description: 'Modern low-temperature heating networks for improved efficiency',
            co2Saved: 4200,
            energyProduced: 0,
            energySaved: 17000,
            cost: 45000,
            paybackTime: 10,
            efficiencyRating: 'A',
            roi: 10.0,
            riskLevel: 'Low',
            implemented: false,
            region: null
        },
        {
            id: 11,
            category: 'Modernize district heating & cooling',
            name: 'Large Heat-Pump Integration',
            icon: '❄️',
            description: 'Industrial-scale heat pumps for district heating systems',
            co2Saved: 4800,
            energyProduced: 0,
            energySaved: 19000,
            cost: 55000,
            paybackTime: 9,
            efficiencyRating: 'A+',
            roi: 11.1,
            riskLevel: 'Medium',
            implemented: false,
            region: null
        }
    ],

    // Achievements/Badges
    achievements: [
        {
            id: 1,
            name: 'Solar Pioneer',
            icon: '☀️',
            description: 'First solar panel installation in your region',
            points: 500,
            unlocked: false
        },
        {
            id: 2,
            name: 'Carbon Crusher',
            icon: '🌱',
            description: 'Saved 1000kg of CO₂',
            points: 300,
            unlocked: false
        },
        {
            id: 3,
            name: 'Efficiency Expert',
            icon: '⭐',
            description: 'Achieved A+ energy rating',
            points: 400,
            unlocked: false
        },
        {
            id: 4,
            name: 'Regional Champion',
            icon: '🏆',
            description: 'Your region is #1 on the leaderboard',
            points: 1000,
            unlocked: false
        },
        {
            id: 5,
            name: 'Team Player',
            icon: '🤝',
            description: 'Implemented 5 solutions with your team',
            points: 600,
            unlocked: false
        },
        {
            id: 6,
            name: 'Energy Master',
            icon: '⚡',
            description: 'Saved 50,000 kWh of energy',
            points: 800,
            unlocked: false
        },
        {
            id: 7,
            name: 'Green Investor',
            icon: '💰',
            description: 'Achieved 15% ROI on sustainability investments',
            points: 700,
            unlocked: false
        },
        {
            id: 8,
            name: 'Eco Warrior',
            icon: '🛡️',
            description: 'Reached 5000 ecocarma points',
            points: 500,
            unlocked: false
        }
    ],

    // Metric conversion data (for demo)
    currentMetrics: {
        co2Saved: 125000, // kg
        energyProduced: 450000, // kWh
        energySaved: 380000, // kWh
        totalCost: 450000, // EUR
        totalSavings: 125000, // EUR per year
        
        // Citizen-friendly conversions
        treesEquivalent: 6250, // 1 tree = ~20kg CO2 per year
        homesPowered: 150, // Average home uses 3000 kWh/year
        carsRemoved: 75, // Average car emits ~1667kg CO2/year
        eurosSaved: 125000,
        
        // Policy metrics
        co2ReductionScore: 85, // 0-100
        energyEfficiencyRating: 'A',
        lifecycleSustainabilityIndex: 78, // 0-100
        circularityScore: 72, // 0-100
        paybackTime: 9.5, // years
        
        // Business metrics
        roiSustainability: 12.5, // %
        carbonCostAvoidance: 62500, // EUR (at 50 EUR per ton CO2)
        capex: 450000,
        opex: 45000, // 10% of CAPEX per year
        riskLevel: 'Low',
        timeToProfitability: 8.2 // years
    },

    // Historical data for trends (simulated)
    historicalData: {
        co2Trend: [
            { month: 'Jan', value: 80000 },
            { month: 'Feb', value: 85000 },
            { month: 'Mar', value: 90000 },
            { month: 'Apr', value: 95000 },
            { month: 'May', value: 100000 },
            { month: 'Jun', value: 110000 },
            { month: 'Jul', value: 120000 },
            { month: 'Aug', value: 125000 }
        ],
        energyTrend: [
            { month: 'Jan', value: 300000 },
            { month: 'Feb', value: 320000 },
            { month: 'Mar', value: 340000 },
            { month: 'Apr', value: 350000 },
            { month: 'May', value: 360000 },
            { month: 'Jun', value: 370000 },
            { month: 'Jul', value: 375000 },
            { month: 'Aug', value: 380000 }
        ],
        scoreTrend: [
            { month: 'Jan', value: 5000 },
            { month: 'Feb', value: 6500 },
            { month: 'Mar', value: 8000 },
            { month: 'Apr', value: 9500 },
            { month: 'May', value: 10500 },
            { month: 'Jun', value: 11500 },
            { month: 'Jul', value: 12000 },
            { month: 'Aug', value: 12500 }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DEMO_DATA;
}



