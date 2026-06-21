const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainCard = document.getElementById('main-card');
const successCard = document.getElementById('success-card');
const heartsContainer = document.getElementById('hearts');
const userNameSpan = document.getElementById('user-name');

// 1. Personalization via URL parameters
// Example: ?name=지수
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
if (name) {
    userNameSpan.innerText = `${name}님, \n`;
}

// 2. Smoother "No" Button Logic
let moveCount = 0;

function moveButton() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Add some margin from the edges
    const margin = 50;
    
    let newX, newY;
    
    if (moveCount < 5) {
        // First few moves are relatively nearby
        const rect = noBtn.getBoundingClientRect();
        newX = rect.left + (Math.random() - 0.5) * 400;
        newY = rect.top + (Math.random() - 0.5) * 400;
    } else {
        // Then it starts jumping all over the screen
        newX = Math.random() * (windowWidth - btnWidth - margin * 2) + margin;
        newY = Math.random() * (windowHeight - btnHeight - margin * 2) + margin;
    }

    // Keep within bounds
    newX = Math.max(margin, Math.min(newX, windowWidth - btnWidth - margin));
    newY = Math.max(margin, Math.min(newY, windowHeight - btnHeight - margin));

    noBtn.style.position = 'fixed';
    noBtn.style.transition = 'all 0.2s ease-out';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.right = 'auto';
    noBtn.style.margin = '0';
    
    moveCount++;
    
    // Scale up the Yes button as a hint
    if (moveCount % 2 === 0) {
        const currentScale = 1 + (moveCount * 0.05);
        yesBtn.style.transform = `scale(${Math.min(currentScale, 1.5)})`;
    }
}

// Event Listeners for No button
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

// 3. Yes Button - Success Logic
yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    successCard.classList.remove('hidden');
    startCelebrate();
});

function startCelebrate() {
    const emojis = ['❤️', '💖', '✨', '🌸', '🥰', '💌'];
    
    // Continuous hearts
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 2 + 2;
        heart.style.setProperty('--duration', `${duration}s`);
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }, 150);
}

