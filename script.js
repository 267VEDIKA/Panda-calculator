const messages = [
    "🐼 Brilliant!", "🎋 Tasty Math!", "🌈 You Rock!", 
    "⭐ Panda Power!", "🎉 High Five!", "🍭 So Smart!"
];

// 🌟 BUILD LIVING SCENERY FOREST ENVIRONMENT
function initJungleAtmosphere() {
    const leavesContainer = document.querySelector('.leaves-container');
    const firefliesContainer = document.querySelector('.fireflies-container');

    // Continually spawn ambient tumbling leaves
    for (let i = 0; i < 12; i++) {
        spawnLeafParticle(leavesContainer);
    }

    // Spawn floating background forest bugs
    for (let i = 0; i < 15; i++) {
        let fly = document.createElement('div');
        fly.classList.add('firefly');
        fly.style.width = fly.style.height = Math.random() * 8 + 5 + 'px';
        fly.style.left = Math.random() * 100 + 'vw';
        fly.style.top = Math.random() * 100 + 'vh';
        fly.style.animationDelay = Math.random() * 6 + 's';
        if (firefliesContainer) firefliesContainer.appendChild(fly);
    }
}

function spawnLeafParticle(targetContainer) {
    if (!targetContainer) return;
    let leaf = document.createElement('div');
    leaf.classList.add('leaf-particle');
    leaf.style.width = leaf.style.height = Math.random() * 16 + 10 + 'px';
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.top = '-20px';
    leaf.style.animationDelay = Math.random() * 8 + 's';
    leaf.style.animationDuration = Math.random() * 8 + 8 + 's';
    targetContainer.appendChild(leaf);
    
    setTimeout(() => {
        leaf.remove();
        spawnLeafParticle(targetContainer);
    }, 16000);
}
window.addEventListener('DOMContentLoaded', initJungleAtmosphere);

// 👀 PUPIL EYE PARALLAX TRACING LAYER
document.addEventListener('mousemove', (e) => {
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
        const rect = pupil.getBoundingClientRect();
        const x = (rect.left + rect.width / 2);
        const y = (rect.top + rect.height / 2);
        
        const angle = Math.atan2(e.clientY - y, e.clientX - x);
        const distance = 4; 
        
        const mx = Math.cos(angle) * distance;
        const my = Math.sin(angle) * distance;
        pupil.style.transform = `translate(${mx}px, ${my}px)`;
    });
});

// 💥 SPLASH LEAF BURSTS ON INTERACTION POINTS
function deployLeafBurst(button) {
    const container = document.querySelector('.leaves-container');
    if (!container) return;

    const rect = button.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    for (let i = 0; i < 6; i++) {
        let p = document.createElement('div');
        p.classList.add('leaf-burst');
        p.style.left = startX + 'px';
        p.style.top = startY + 'px';

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 70 + 40;
        p.style.setProperty('--mx', Math.cos(angle) * radius + 'px');
        p.style.setProperty('--my', Math.sin(angle) * radius + 'px');
        p.style.background = `hsl(${Math.random() * 40 + 90}, 75%, 60%)`;

        container.appendChild(p);
        setTimeout(() => p.remove(), 700);
    }
}

// 🐼 REACTIVE CALCULATION EMOTION SCHEDULER
function cyclePandaState(status) {
    const calc = document.querySelector('.calculator');
    const badge = document.getElementById('expressionBadge');
    if (!calc || !badge) return;

    calc.classList.remove('panda-shake', 'panda-dizzy');
    void calc.offsetWidth; 

    if (status === 'success') {
        calc.classList.add('panda-shake');
        badge.innerText = "😎";
        setTimeout(() => badge.innerText = "🐼", 1800);
    } else if (status === 'error') {
        calc.classList.add('panda-dizzy');
        badge.innerText = "😵";
    } else if (status === 'typing') {
        badge.innerText = "😋";
        setTimeout(() => { if(badge.innerText === "😋") badge.innerText = "🐼"; }, 400);
    } else if (status === 'clear') {
        badge.innerText = "🧼";
        setTimeout(() => badge.innerText = "🐼", 1000);
    }
}

function playSound() {
    const sound = document.getElementById("clickSound");
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => console.log("Audio waiting for user click interaction context."));
}

function appendValue(val, btn) {
    playSound();
    deployLeafBurst(btn);
    
    const display = document.getElementById("display");
    if (display.value === "" && ['/', '*', '+'].includes(val)) return;
    
    display.value += val;
    cyclePandaState('typing');

    let speechMap = { '/': 'divided by', '*': 'times', '-': 'minus', '+': 'plus', '.': 'point' };
    speak(speechMap[val] || val);
}

function clearDisplay(btn) {
    playSound();
    deployLeafBurst(btn);
    document.getElementById("display").value = "";
    document.getElementById("message").innerHTML = "🧹 Clean & Ready!";
    cyclePandaState('clear');
    speak("Cleared");
}

function calculate(btn) {
    playSound();
    deployLeafBurst(btn);
    try {
        let display = document.getElementById("display");
        let formula = display.value;
        if (!formula) return;

        let cleanFormula = formula.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
        let result = eval(cleanFormula);
        
        if (result === Infinity || isNaN(result)) throw new Error("Divide Zero");
        if (result % 1 !== 0) result = parseFloat(result.toFixed(4));

        display.value = result;
        document.getElementById("message").innerHTML = messages[Math.floor(Math.random() * messages.length)];
        
        // 🌟 TRIGGER THE CELEBRATION MOMENT HERE!
        triggerPandaParty();
        
        cyclePandaState('success');
        speak("The answer is " + result);
    } catch (err) {
        document.getElementById("display").value = "Error!";
        document.getElementById("message").innerHTML = "😢 Let's try that again!";
        cyclePandaState('error');
        speak("Error, try again");
    }
}

// 🎉 THE JUNGLE PARTY PARTY ENGINE
function triggerPandaParty() {
    const container = document.getElementById('celebration-container');
    const calc = document.querySelector('.calculator');
    if (!container || !calc) return;

    // 1. Force the calculator machine to bounce/pop visually
    calc.classList.remove('calculator-party-pop');
    void calc.offsetWidth; // Reset animation timeline trigger
    calc.classList.add('calculator-party-pop');
    setTimeout(() => calc.classList.remove('calculator-party-pop'), 600);

    // 2. Determine center launch coordinates
    const rect = calc.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3; // Pop outwards near the eyes/display area

    const partyPool = ['🐼', '🎋', '🎉', '✨', '⭐', '🌈', '🌿'];
    const totalParticles = 40; // Total explosion density count

    for (let i = 0; i < totalParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('celebration-particle');
        particle.innerText = partyPool[Math.floor(Math.random() * partyPool.length)];

        // Set random launch trajectories (360 degrees arc layout)
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 250 + 100; // Power of launch radius
        const moveX = Math.cos(angle) * velocity;
        const moveY = Math.sin(angle) * velocity - 50; // Bias upward motion arch slightly

        // Random sizing and custom rotations
        const size = Math.random() * 20 + 25; // 25px to 45px
        const duration = Math.random() * 0.8 + 1.2; // 1.2s to 2.0s duration

        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.setProperty('--mx', `${moveX}px`);
        particle.style.setProperty('--my', `${moveY}px`);
        particle.style.setProperty('--p-size', `${size}px`);
        particle.style.setProperty('--p-duration', `${duration}s`);
        particle.style.setProperty('--r-peak', `${Math.random() * 360}deg`);
        particle.style.setProperty('--r-end', `${Math.random() * 720 - 360}deg`);

        container.appendChild(particle);

        // Auto-clean DOM house cleaning loop
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(text);
        speech.rate = 1.05;
        speech.pitch = 1.5;
        const voices = window.speechSynthesis.getVoices();
        speech.voice = voices.find(v => v.lang.includes("en")) || voices[0];
        window.speechSynthesis.speak(speech);
    }
}