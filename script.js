function toggleMenu() {
    let d = document.getElementById("dropdown");
    d.style.display = d.style.display === "block" ? "none" : "block";
}

function toggleNav() {
    document.getElementById("navLinks").classList.toggle("show");
}

function updateLiveCharts() {
    const totalPeople = 120000 + Math.floor(Math.random() * 40000);
    const votedPeople = Math.floor(totalPeople * (0.35 + Math.random() * 0.25));

    const partyVotes = {
        tmc: 42000 + Math.floor(Math.random() * 5000),
        bjp: 38000 + Math.floor(Math.random() * 6000),
        inc: 21000 + Math.floor(Math.random() * 4000)
    };

    const maxParty = Math.max(partyVotes.tmc, partyVotes.bjp, partyVotes.inc, 1);

    document.getElementById("totalPeopleValue").textContent = totalPeople.toLocaleString();
    document.getElementById("votedPeopleValue").textContent = votedPeople.toLocaleString();
    document.getElementById("tmcValue").textContent = partyVotes.tmc.toLocaleString();
    document.getElementById("bjpValue").textContent = partyVotes.bjp.toLocaleString();
    document.getElementById("incValue").textContent = partyVotes.inc.toLocaleString();

    document.getElementById("totalPeopleBar").style.height = "100%";
    document.getElementById("votedPeopleBar").style.height = `${Math.round((votedPeople / totalPeople) * 100)}%`;
    document.getElementById("tmcBar").style.height = `${Math.round((partyVotes.tmc / maxParty) * 100)}%`;
    document.getElementById("bjpBar").style.height = `${Math.round((partyVotes.bjp / maxParty) * 100)}%`;
    document.getElementById("incBar").style.height = `${Math.round((partyVotes.inc / maxParty) * 100)}%`;
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -15% 0px'
    });

    revealElements.forEach((element) => observer.observe(element));
}

window.addEventListener("load", () => {
    updateLiveCharts();
    initScrollReveal();
    setInterval(updateLiveCharts, 300000);
});

