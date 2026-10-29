// ==========================================================================
// Antigravity Interactive Engine - Kashiling Bhusnar Portfolio
// ==========================================================================

// 1. Theme Management (Dark/Light Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-icon') : null;

const getStoredTheme = () => localStorage.getItem('kb-theme') || 'dark';
const setStoredTheme = (theme) => localStorage.setItem('kb-theme', theme);

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
};

// Initialize Theme
applyTheme(getStoredTheme());

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        setStoredTheme(newTheme);
        showToast(`Switched to ${newTheme.toUpperCase()} theme`, '🌓');
    });
}

// 2. Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// 3. Smooth Scroll with Navbar Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        }
    });
});

// 4. Dynamic Subtitle Typing Effect
const typingTextEl = document.getElementById('typing-text');
const titles = [
    'Java 17 & Spring Boot 3 Specialist',
    'Distributed Systems & Microservices',
    'Multi-Tenant SaaS Cloud Architect',
    'Low-Latency Pipelines (Docker & RabbitMQ)',
    'High-Concurrency Systems Engineer'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 70;

const handleTyping = () => {
    if (!typingTextEl) return;
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingTextEl.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
    } else {
        typingTextEl.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2200; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 400; // Pause before typing next title
    }

    setTimeout(handleTyping, typingSpeed);
};

setTimeout(handleTyping, 600);

// 5. Interactive Terminal Simulator
const terminalScreen = document.getElementById('terminal-screen');
const terminalInput = document.getElementById('terminal-input');

const terminalCommands = {
    help: () => [
        { type: 'comment', text: 'Available commands:' },
        { type: 'out', text: '  • jmeter    : Run Apache JMeter 5,000-collector stress test' },
        { type: 'out', text: '  • health    : Query microservice cluster health status' },
        { type: 'out', text: '  • stack     : Print architecture config payload' },
        { type: 'out', text: '  • projects  : List deployed flagship platforms' },
        { type: 'out', text: '  • clear     : Clear terminal buffer' }
    ],
    jmeter: () => [
        { type: 'comment', text: '[INFO] Initializing Apache JMeter 5.5 Stress Test Engine...' },
        { type: 'sys', text: 'Target: AWS ELB -> EC2 (DairyAI Nexus Cluster)' },
        { type: 'sys', text: 'Config: ThreadGroup=5,000 concurrent collectors | Ramp-up=15s' },
        { type: 'out', text: 'Sending 16,000 HTTP POST /api/v1/telemetry/ingest payloads...' },
        { type: 'out', text: '>>> Requests: 16,000 | Passed: 16,000 | Failed: 0' },
        { type: 'sys', text: '>>> Latency: Min=12ms | P95=44.2ms | Max=49.8ms' },
        { type: 'comment', text: '>>> Throughput: 44.4 req/sec | Error Rate: 0.00%' },
        { type: 'out', text: 'Status: [TEST_SUITE_PASSED] ✅ Production SLA validated under 50ms.' }
    ],
    health: () => [
        { type: 'comment', text: '[GET] /actuator/health HTTP/1.1' },
        { type: 'out', text: '  • Gateway NGINX      : UP (SSL Terminated, Reverse Proxy to Vercel)' },
        { type: 'out', text: '  • RabbitMQ Queue     : UP (0 backlog, SSE Workers Active)' },
        { type: 'out', text: '  • Redis Cache Pool   : UP (Hit Ratio: 98.4%)' },
        { type: 'out', text: '  • MySQL Master/Read  : UP (Row-Level Isolation ACTIVE)' },
        { type: 'out', text: '  • Docker Sandbox     : UP (Warm Containers: 8 ready, pids-limit=50)' },
        { type: 'sys', text: 'Overall Health: GREEN / 200 OK' }
    ],
    stack: () => [
        { type: 'comment', text: '{' },
        { type: 'out', text: '  "runtime": "Java 17 LTS",' },
        { type: 'out', text: '  "framework": "Spring Boot 3.2.x",' },
        { type: 'out', text: '  "security": ["Spring Security", "Stateless JWT", "RBAC"],' },
        { type: 'out', text: '  "messaging": "RabbitMQ + SSE (Server-Sent Events)",' },
        { type: 'out', text: '  "cloud": ["AWS EC2", "ELB", "ASG", "S3", "NGINX"],' },
        { type: 'out', text: '  "databases": ["MySQL 8.0", "Redis 7.x"],' },
        { type: 'out', text: '  "verification": ["JUnit 5", "Mockito", "Apache JMeter"]' },
        { type: 'comment', text: '}' }
    ],
    projects: () => [
        { type: 'out', text: '1. DairyAI Nexus (Multi-Tenant Dairy ERP & IoT Platform) -> LIVE' },
        { type: 'out', text: '2. CodeArena (Microservices Sandbox Execution Platform) -> READY' }
    ]
};

const appendTerminalLines = (lines) => {
    if (!terminalScreen) return;
    lines.forEach(item => {
        const row = document.createElement('div');
        row.className = `term-row ${item.type}`;
        row.textContent = item.text;
        terminalScreen.appendChild(row);
    });
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
};

const runTerminalCmd = (cmd) => {
    if (!terminalScreen) return;
    const cleanCmd = cmd.trim().toLowerCase();

    // Print command entered
    const cmdRow = document.createElement('div');
    cmdRow.className = 'term-row cmd';
    cmdRow.textContent = `kashiling@backend:~$ ${cmd}`;
    terminalScreen.appendChild(cmdRow);

    if (cleanCmd === 'clear') {
        terminalScreen.innerHTML = '';
        return;
    }

    if (terminalCommands[cleanCmd]) {
        appendTerminalLines(terminalCommands[cleanCmd]());
    } else {
        appendTerminalLines([
            { type: 'comment', text: `Command not found: '${cmd}'. Type 'help' to see valid commands.` }
        ]);
    }
};

const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput) return;
    const val = terminalInput.value;
    if (val.trim()) {
        runTerminalCmd(val);
        terminalInput.value = '';
    }
};

// 6. Interactive Skill Category Filter & Search
const filterSkillCategory = (category) => {
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => pill.classList.remove('active'));
    
    const activePill = Array.from(pills).find(pill => 
        pill.getAttribute('onclick')?.includes(`'${category}'`)
    );
    if (activePill) activePill.classList.add('active');

    const cards = document.querySelectorAll('.skill-category-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
};

const filterSkills = () => {
    const query = document.getElementById('skill-search-input')?.value.toLowerCase().trim() || '';
    const badges = document.querySelectorAll('.tech-badge');
    
    badges.forEach(badge => {
        const skillName = badge.textContent.toLowerCase();
        if (query && skillName.includes(query)) {
            badge.classList.add('highlight-match');
        } else {
            badge.classList.remove('highlight-match');
        }
    });

    // Also filter category cards if query is present
    const cards = document.querySelectorAll('.skill-category-card');
    if (!query) {
        cards.forEach(c => c.style.display = 'flex');
        return;
    }

    cards.forEach(card => {
        const hasMatch = Array.from(card.querySelectorAll('.tech-badge')).some(b => 
            b.textContent.toLowerCase().includes(query)
        );
        card.style.display = hasMatch ? 'flex' : 'none';
    });
};

// 7. Interactive Project Sub-Tabs Switcher
const switchProjectTab = (projectPrefix, tabName) => {
    const projectCard = document.getElementById(`project-${projectPrefix}`);
    if (!projectCard) return;

    // Remove active from all tabs inside this project
    const tabBtns = projectCard.querySelectorAll('.proj-tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    const tabContents = projectCard.querySelectorAll('.proj-tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Activate the clicked button
    const targetBtn = Array.from(tabBtns).find(btn => 
        btn.getAttribute('onclick')?.includes(`'${tabName}'`)
    );
    if (targetBtn) targetBtn.classList.add('active');

    // Activate target content
    const targetContent = document.getElementById(`${projectPrefix}-tab-${tabName}`);
    if (targetContent) targetContent.classList.add('active');
};

// 8. Toast Notification System
const showToast = (message, icon = '✓') => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3200);
};

// Copy Contact Helper
const copyContact = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`${type} copied to clipboard!`, '📋');
    }).catch(() => {
        showToast(`Copied: ${text}`, '📋');
    });
};

// 9. Contact Form Submission Handler
const handleContactSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();

    if (name && email && message) {
        const subject = encodeURIComponent(`Inquiry from ${name} via Portfolio`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:kashilingbhusnur@gmail.com?subject=${subject}&body=${body}`;
        showToast(`Thank you, ${name}! Email composer opened.`, '✉️');
        document.getElementById('contact-form')?.reset();
    } else {
        showToast('Please fill in all fields.', '⚠️');
    }
};

// 10. Scroll Spy for Active Navigation
const sections = document.querySelectorAll('section');
const navLinksItems = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Back to top visibility
    if (backToTopBtn) {
        if (scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// 11. Staggered Scroll Animations (IntersectionObserver)
const animatedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            animatedObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.project-detailed-card, .skill-category-card, .timeline-card, .achieve-card, .stat-item, .highlight-chip'
).forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index % 4 * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index % 4 * 0.08}s`;
    animatedObserver.observe(el);
});
