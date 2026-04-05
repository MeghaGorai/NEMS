const navButtons = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.content-panel');
const quickButtons = document.querySelectorAll('[data-target]');
const toast = document.getElementById('toast');
const refreshButton = document.getElementById('refresh-button');
const notificationBadge = document.getElementById('notification-badge');
const notificationList = document.getElementById('notification-list');

const notificationTemplates = [
    'New voter approval pending review.',
    'Candidate profile updated for East Zone.',
    'Security audit scheduled for tomorrow.',
    'Voter registration threshold reached for Central Zone.',
    'Candidate document verification completed.',
    'Election schedule confirmed for National ballot.',
    'New security audit report is available.',
    'Voting district metrics have been updated.'
];

const notifications = [
    'New voter approval pending review.',
    'Candidate profile updated for East Zone.',
    'Security audit scheduled for tomorrow.'
];

function activatePanel(targetId) {
    panels.forEach(panel => {
        const isActive = panel.id === targetId;
        panel.classList.toggle('active-panel', isActive);
        if (isActive) {
            animatePanel(panel);
        }
    });
    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === targetId);
    });
}

function animatePanel(panel) {
    const cards = panel.querySelectorAll('.animate-card');
    cards.forEach(card => {
        card.classList.remove('animate-card');
        void card.offsetWidth;
        card.classList.add('animate-card');
    });
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

function scheduleElection(event) {
    event.preventDefault();
    const name = document.getElementById('election-name').value;
    const date = document.getElementById('election-date').value;
    const deadline = document.getElementById('registration-deadline').value;
    if (!name || !date || !deadline) {
        showToast('Please complete all schedule fields');
        return;
    }
    showToast(`Election scheduled: ${name} on ${date}`);
    document.getElementById('schedule-form').reset();
    updateLastUpdated();
}

function updateStats(data) {
    document.getElementById('voter-count').textContent = data.voters.toLocaleString();
    document.getElementById('candidate-count').textContent = data.candidates;
    document.getElementById('next-election').textContent = data.nextElection;
    document.getElementById('security-alerts').textContent = data.securityAlerts;
}

function refreshDashboard() {
    refreshButton.disabled = true;
    refreshButton.textContent = 'Refreshing...';
    setTimeout(() => {
        window.location.reload();
    }, 300);
}

function updateNotificationBadge() {
    notificationBadge.textContent = `${notifications.length} new`;
}

function renderNotifications() {
    notificationList.innerHTML = notifications
        .slice(0, 5)
        .map(message => `<li>${message}</li>`)
        .join('');
    updateNotificationBadge();
}

function addNotification(message) {
    notifications.unshift(message);
    if (notifications.length > 6) {
        notifications.pop();
    }
    renderNotifications();
    showToast(message);
}

function scheduleNotification() {
    const next = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
    addNotification(next);
}

function generateReport() {
    showToast('Generating comprehensive report');
}

function downloadReport() {
    showToast('Report ready for download');
}

function updateLastUpdated() {
    const time = new Date();
    const label = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('last-updated').textContent = label;
}

navButtons.forEach(button => {
    button.addEventListener('click', () => activatePanel(button.dataset.target));
});

quickButtons.forEach(button => {
    button.addEventListener('click', event => {
        const target = event.currentTarget.dataset.target;
        if (target) {
            activatePanel(target);
        }
    });
});

refreshButton.addEventListener('click', refreshDashboard);

window.addEventListener('DOMContentLoaded', () => {
    activatePanel('dashboard');
    renderNotifications();
    setInterval(scheduleNotification, 14000);
});
