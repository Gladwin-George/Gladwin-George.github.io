// -------------------- DOMContentLoaded Section --------------------
document.addEventListener('DOMContentLoaded', function () {
    // --- Smooth Scroll ---
    const links = document.querySelectorAll('.nav-link');
    for (const link of links) {
        link.addEventListener('click', function (event) {
            const linkHref = event.currentTarget.getAttribute('href');
            if (!linkHref.startsWith('#')) return;

            event.preventDefault();
            const targetId = linkHref.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                console.error(`Element with ID "${targetId}" not found.`);
            }
        });
    }

    // --- Filter Buttons ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.other-projects-container');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projects.forEach(project => {
                if (category === 'all' || project.getAttribute('data-category') === category) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // --- On-Scroll Animation ---
    const elements = document.querySelectorAll('.fade-in, .slide-in-top, .slide-in-right, .skill, .shrinkInAndOut, .project-item, .filter-btn, .slide-in-left, .patent-card1');

    function checkVisibility() {
        const windowHeight = window.innerHeight;
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            if (elementTop < windowHeight - 100 && elementBottom > 100) {
                element.classList.add('visible');
                element.classList.remove('hidden');
            } else {
                element.classList.remove('visible');
                element.classList.add('hidden');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check
});

// -------------------- Background Animation --------------------
const bgAnimation = document.getElementById('bgAnimation');
const numberofColorBoxes = 400;

if (bgAnimation) {
    for (let i = 0; i < numberofColorBoxes; i++) {
        const colorBox = document.createElement('div');
        colorBox.classList.add('colorBox');
        bgAnimation.append(colorBox);
    }
}

// -------------------- Dark Mode --------------------
document.getElementById('dark-mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('dark-mode-icon');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// -------------------- Navbar Toggle --------------------
function toggleNavbar() {
    document.querySelector('.nav-menu').classList.toggle('active');
    document.getElementById('nav-toggle').classList.toggle('active');
    document.getElementById('nav-close').classList.toggle('active');
}

function closeNavbar() {
    if (document.querySelector('.nav-menu').classList.contains('active')) {
        document.querySelector('.nav-menu').classList.remove('active');
        document.getElementById('nav-toggle').classList.remove('active');
        document.getElementById('nav-close').classList.remove('active');
    }
}

document.getElementById('nav-toggle').addEventListener('click', function (event) {
    toggleNavbar();
    event.stopPropagation();
});

document.getElementById('nav-close').addEventListener('click', function (event) {
    toggleNavbar();
    event.stopPropagation();
});

document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
        if (document.querySelector('.nav-menu').classList.contains('active')) {
            toggleNavbar();
        }
    });
});

document.addEventListener('click', function (event) {
    const isClickInsideNav = document.querySelector('nav').contains(event.target);
    if (!isClickInsideNav) {
        closeNavbar();
    }
});

// -------------------- Scroll to Top Button --------------------
const goUpBtn = document.getElementById("go-up-btn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        if (!goUpBtn.classList.contains('shrink-in')) {
            goUpBtn.classList.remove('shrink-out');
            goUpBtn.classList.add('shrink-in');
            goUpBtn.style.display = "block";
        }
    } else {
        if (goUpBtn.classList.contains('shrink-in')) {
            goUpBtn.classList.remove('shrink-in');
            goUpBtn.classList.add('shrink-out');
            setTimeout(() => {
                goUpBtn.style.display = "none";
            }, 300);
        }
    }
}

goUpBtn.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

// -------------------- EmailJS Form --------------------
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = this;
    const inputs = form.querySelectorAll('input, textarea');
    let allFilled = true;

    inputs.forEach(function (input) {
        if (!input.value) {
            allFilled = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    const messageElement = document.getElementById('alert-message');

    if (!allFilled) {
        messageElement.textContent = 'Please fill in all fields.';
        messageElement.className = 'error';

        setTimeout(() => {
            messageElement.textContent = '';
            messageElement.className = '';
        }, 4000);
        return;
    }

    emailjs.sendForm('service_rgjez63', 'template_1vsvbal', form)
        .then(() => {
            messageElement.textContent = 'Email sent successfully!';
            messageElement.className = 'success';
            form.reset();
        }, (error) => {
            messageElement.textContent = 'Failed to send email. Error: ' + JSON.stringify(error);
            messageElement.className = 'error';
        })
        .finally(() => {
            setTimeout(() => {
                messageElement.textContent = '';
                messageElement.className = '';
            }, 4000);
        });
});
