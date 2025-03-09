

//navbar scroll
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-link');

    for (const link of links) {
        link.addEventListener('click', smoothScroll);
    }

    function smoothScroll(event) {
        const linkHref = event.currentTarget.getAttribute('href');

        // If the link doesn't start with "#" (i.e., it's external or references another page),
        // allow normal navigation (no preventDefault).
        if (!linkHref.startsWith('#')) {
            return;
        }

        // Otherwise, handle smooth scrolling for local links
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
    }
});

// home bg animation
const bgAnimation = document.getElementById('bgAnimation');
const numberofColorBoxes = 400;

if (bgAnimation) {
    for(let i = 0; i < numberofColorBoxes; i++){
        const colorBox = document.createElement('div');
        colorBox.classList.add('colorBox');
        bgAnimation.append(colorBox);
    }
}

//darkmode
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
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

// responsive nav bar 
// Function to toggle the navbar and icons
function toggleNavbar() {
    document.querySelector('.nav-menu').classList.toggle('active');
    document.getElementById('nav-toggle').classList.toggle('active');
    document.getElementById('nav-close').classList.toggle('active');
}

// Function to close the navbar
function closeNavbar() {
    if (document.querySelector('.nav-menu').classList.contains('active')) {
        document.querySelector('.nav-menu').classList.remove('active');
        document.getElementById('nav-toggle').classList.remove('active');
        document.getElementById('nav-close').classList.remove('active');
    }
}

// Event listener for nav toggle button
document.getElementById('nav-toggle').addEventListener('click', function(event) {
    toggleNavbar();
    event.stopPropagation(); // Prevent the event from bubbling up to the document
});

// Event listener for nav close button
document.getElementById('nav-close').addEventListener('click', function(event) {
    toggleNavbar();
    event.stopPropagation(); // Prevent the event from bubbling up to the document
});

// Event listeners for each nav link
document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        if (document.querySelector('.nav-menu').classList.contains('active')) {
            toggleNavbar();
        }
    });
});

// Event listener for clicks outside the navbar
document.addEventListener('click', function(event) {
    const isClickInsideNav = document.querySelector('nav').contains(event.target);
    if (!isClickInsideNav) {
        closeNavbar();
    }
});

//up button
// Get the button
var goUpBtn = document.getElementById("go-up-btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
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
            }, 300); // Match the duration of the shrinkOut animation
        }
    }
}

// When the user clicks on the button, scroll to the top of the document
goUpBtn.onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};


//email js
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var form = this;
    var inputs = form.querySelectorAll('input, textarea');
    var allFilled = true;

    inputs.forEach(function(input) {
        if (!input.value) {
            allFilled = false;
            input.classList.add('error'); // Optionally add a class to highlight empty fields
        } else {
            input.classList.remove('error');
        }
    });

    if (!allFilled) {
        var messageElement = document.getElementById('alert-message');
        messageElement.textContent = 'Please fill in all fields.';
        messageElement.className = 'error';

        setTimeout(function() {
            messageElement.textContent = '';
            messageElement.className = '';
        }, 4000);

        return;
    }

    emailjs.sendForm('service_rgjez63', 'template_1vsvbal', form)
        .then(function() {
            var messageElement = document.getElementById('alert-message');
            messageElement.textContent = 'Email sent successfully!';
            messageElement.className = 'success';
            form.reset(); 

            setTimeout(function() {
                messageElement.textContent = '';
                messageElement.className = '';
            }, 4000);
        }, function(error) {
            var messageElement = document.getElementById('alert-message');
            messageElement.textContent = 'Failed to send email. Error: ' + JSON.stringify(error);
            messageElement.className = 'error';

            setTimeout(function() {
                messageElement.textContent = '';
                messageElement.className = '';
            }, 4000);
        });
});

//filter button
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.other-projects-container');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');

            // Filter projects based on category
            projects.forEach(project => {
                if (category === 'all' || project.getAttribute('data-category') === category) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
});

// On-scroll animation
document.addEventListener('DOMContentLoaded', function() {
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
