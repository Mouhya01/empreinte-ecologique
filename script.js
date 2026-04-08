// STEP 1: Element selection via DOM

const individual_transport = document.getElementById("voiture");
const collective_transport = document.getElementById("bus");
const aerial_transport = document.getElementById("vols");
const energy_consumed = document.getElementById("electricite");
const electronic_devices = document.getElementById("appareils");

// To get user response from the checkbox
const renewableEnergy = document.getElementById("renouvelable");

// To get user choice from the dropdown list
const meat_consumption = document.getElementById("viande");

// Button selection
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");

// Results section selection
const footprintValue = document.querySelector(".footprint-value");
const comparisonValue = document.querySelector(".comparison-value");
const recommendationText = document.querySelector(".conseils");

// STEP 2: EVENT MANAGEMENT

// Input events: Real-time logging
individual_transport.addEventListener("input", function() {
    console.log(`Car distance: ${individual_transport.value} km per week`);
});

collective_transport.addEventListener("input", function() {
    console.log(`Bus distance: ${collective_transport.value} km per week`);
});

aerial_transport.addEventListener("input", function() {
    console.log(`Flights: ${aerial_transport.value} per year`);
});

energy_consumed.addEventListener("input", function() {
    console.log(`Electricity usage: ${energy_consumed.value} kWh per month`);
});

electronic_devices.addEventListener("input", function() {
    console.log(`Devices purchased: ${electronic_devices.value} per year`);
});

// Selection events
renewableEnergy.addEventListener("change", function() {
    if (renewableEnergy.checked) {
        console.log("Using renewable energy: Yes");
    } else {
        console.log("Using renewable energy: No");
    }
});

meat_consumption.addEventListener("change", function() {
    console.log(`Meat consumption frequency: ${meat_consumption.value}`);
});

// Button click events
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    calculateFootprint();
});

resetBtn.addEventListener("click", function() {
    console.log("Form has been successfully reset");
});

// STEP 3: CALCULATION LOGIC

function calculateFootprint() {
    const carKm = Number(individual_transport.value) || 0;
    const busKm = Number(collective_transport.value) || 0;
    const flightCount = Number(aerial_transport.value) || 0;
    const electricityUsage = Number(energy_consumed.value) || 0;
    const deviceCount = Number(electronic_devices.value) || 0;
    const meatFreq = meat_consumption.value;
    
    // Data conversion (weekly/monthly to annual)
    const annualCarKm = carKm * 52;
    const annualBusKm = busKm * 52;
    const annualElectricity = electricityUsage * 12;

    // Footprint calculation per factor using coefficients
    const carFootprint = annualCarKm * 0.17;
    const busFootprint = annualBusKm * 0.1;
    const flightFootprint = flightCount * 250;
    const electricityFootprint = annualElectricity * 0.3;
    const deviceFootprint = deviceCount * 100;

    const totalFootprint = deviceFootprint + busFootprint + electricityFootprint + flightFootprint + carFootprint;

    // Bonus/Malus verification
    let finalTotalFootprint = totalFootprint; 

    // 1. Adjustment based on meat frequency (matches HTML option values)
    if (meatFreq === "often") { finalTotalFootprint *= 1.20; }
    else if (meatFreq === "sometimes") { finalTotalFootprint *= 1.10; }
    else if (meatFreq === "rarely") { finalTotalFootprint *= 1.05; }
    else if (meatFreq === "never") { finalTotalFootprint *= 1; }

    // 2. Reduction for renewable energy
    if (renewableEnergy.checked) {
        const adjustedElectricityFootprint = electricityFootprint * 0.5;
        finalTotalFootprint = finalTotalFootprint - electricityFootprint + adjustedElectricityFootprint;
    }

    // Convert to tonnes of CO2 per year
    finalTotalFootprint /= 1000;
    footprintValue.textContent = finalTotalFootprint.toFixed(2);
    
    // Comparison with Earths (Average capacity per person)
    const earthCount = finalTotalFootprint / 1.7;
    comparisonValue.textContent = earthCount.toFixed(1);

    // Dynamic recommendations based on final value
    if (finalTotalFootprint < 2) {
        recommendationText.innerText = "👏 Congratulations! Your ecological footprint is below average, proving your significant contribution to our planet's well-being!";
    } else if (finalTotalFootprint <= 5) {
        recommendationText.innerText = "🌱 You are within the average range. Keep up the good work and try to optimize further!";
    } else {
        recommendationText.innerText = "⚠️ Warning: Your ecological footprint is high. Consider reducing it to help preserve our planet.";
    }
}