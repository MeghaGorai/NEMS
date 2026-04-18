// DOM Elements
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const menuToggle = document.querySelector('.menu-toggle');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const pageTitle = document.getElementById('page-title');

// Live Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('current-time').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

const initialActiveNav = document.querySelector('.nav-item.active');
if (initialActiveNav) {
    pageTitle.textContent = initialActiveNav.querySelector('span').textContent;
}

// Navigation
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.getAttribute('data-section');

        if (sectionId === 'admin') {
            window.location.href = 'admin.html';
            return;
        }

        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Update active section
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');

        // Update page title
        const title = item.querySelector('span').textContent;
        pageTitle.textContent = title;
    });
});

// Sidebar toggle
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
});

// Election Countdown
function updateCountdown() {
    const electionDate = new Date('2026-05-15T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = electionDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown').innerHTML = '<h3>Election Day!</h3>';
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Results Chart
const ctx = document.getElementById('resultsChart').getContext('2d');
const resultsChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Party A', 'Party B', 'Party C', 'Others'],
        datasets: [{
            data: [45, 35, 20, 0],
            backgroundColor: [
                '#4CAF50',
                '#2196F3',
                '#FF9800',
                '#E91E63'
            ],
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 0.8)',
            hoverBorderWidth: 4,
            hoverBorderColor: 'rgba(255, 255, 255, 1)',
            hoverOffset: 20,
            hoverBackgroundColor: [
                'rgba(76, 175, 80, 0.8)',
                'rgba(33, 150, 243, 0.8)',
                'rgba(255, 152, 0, 0.8)',
                'rgba(233, 30, 99, 0.8)'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            title: {
                display: true,
                text: 'Election Results Overview',
                font: {
                    size: 18,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value}% (${percentage}%)`;
                    }
                }
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 2000,
            easing: 'easeOutBounce'
        },
        hover: {
            mode: 'nearest',
            intersect: true,
            animationDuration: 400
        },
        onHover: function(event, activeElements) {
            event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
        }
    }
});

// Animate progress bars when result section is active
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 300);
    });
}

// Enhanced observer for result section
const resultSection = document.getElementById('result');
const resultObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (resultSection.classList.contains('active')) {
                animateChart();
                animateProgressBars();
            }
        }
    });
});

resultObserver.observe(resultSection, {
    attributes: true,
    attributeFilter: ['class']
});

// Animate chart on section change
function animateChart() {
    if (resultsChart) {
        resultsChart.update('active');
    }
}

// Particle Effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 20 + 10 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = Math.random() * 4 + 6 + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Notification animation
const notificationIcon = document.querySelector('.notifications i');
function animateNotification() {
    notificationIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        notificationIcon.style.transform = 'scale(1)';
    }, 200);
}

setInterval(animateNotification, 5000);

// Search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    // Simple search simulation - in real app, this would search through data
    console.log('Searching for:', query);
});

// Form submission
const feedbackForm = document.querySelector('.feedback-form form');
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your feedback! We will get back to you soon.');
    feedbackForm.reset();
});

// Hover effects for cards
document.querySelectorAll('.stat-card, .action-btn, .activity-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Theme toggle (extra feature)
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.style.position = 'fixed';
themeToggle.style.bottom = '20px';
themeToggle.style.right = '20px';
themeToggle.style.background = '#4CAF50';
themeToggle.style.color = 'white';
themeToggle.style.border = 'none';
themeToggle.style.borderRadius = '50%';
themeToggle.style.width = '50px';
themeToggle.style.height = '50px';
themeToggle.style.cursor = 'pointer';
themeToggle.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
themeToggle.style.zIndex = '1001';
themeToggle.style.transition = 'all 0.3s ease';

let isDarkTheme = false;
themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme');
    themeToggle.innerHTML = isDarkTheme ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

document.body.appendChild(themeToggle);

// Auto-refresh data (simulation)
setInterval(() => {
    // In a real app, this would fetch new data
    const stats = document.querySelectorAll('.stat-info h3');
    stats.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(',', ''));
        const newValue = currentValue + Math.floor(Math.random() * 10 - 5);
        stat.textContent = newValue.toLocaleString();
    });
}, 30000); // Update every 30 seconds

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Responsive adjustments
function handleResize() {
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('collapsed');
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// Typing effect for page titles
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Apply typing effect when section changes
navItems.forEach(item => {
    item.addEventListener('click', () => {
        setTimeout(() => {
            const title = item.querySelector('span').textContent;
            typeWriter(pageTitle, title);
        }, 200);
    });
});

// Sound effects (muted by default for better UX)
let soundEnabled = false;
const soundToggle = document.createElement('button');
soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
soundToggle.style.position = 'fixed';
soundToggle.style.bottom = '80px';
soundToggle.style.right = '20px';
soundToggle.style.background = '#2196F3';
soundToggle.style.color = 'white';
soundToggle.style.border = 'none';
soundToggle.style.borderRadius = '50%';
soundToggle.style.width = '50px';
soundToggle.style.height = '50px';
soundToggle.style.cursor = 'pointer';
soundToggle.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
soundToggle.style.zIndex = '1001';
soundToggle.style.transition = 'all 0.3s ease';

soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
});

document.body.appendChild(soundToggle);

// Enhanced chart interactions
resultsChart.options.onClick = function(event, elements) {
    if (elements.length > 0) {
        const element = elements[0];
        const dataIndex = element.index;
        const label = resultsChart.data.labels[dataIndex];
        const value = resultsChart.data.datasets[0].data[dataIndex];

        // Create a modal or tooltip with more info
        showPartyDetails(label, value);
    }
};

function showPartyDetails(party, votes) {
    // Simple alert for now - in real app, this would show a modal
    alert(`${party}: ${votes} votes\nPercentage: ${((votes / resultsChart.data.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%`);
}

// Performance monitoring (extra feature)
let fps = 0;
let lastTime = performance.now();

function measureFPS() {
    const currentTime = performance.now();
    fps = Math.round(1000 / (currentTime - lastTime));
    lastTime = currentTime;
    requestAnimationFrame(measureFPS);
}

measureFPS();

// Console log for debugging (remove in production)
console.log('NEMS Dashboard loaded successfully!');
console.log('Features: Navigation, Charts, Animations, Theme Toggle, Live Clock, Countdown, Particles');