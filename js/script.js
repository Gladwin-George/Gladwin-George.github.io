//navbar scroll
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-link');

    for (const link of links) {
        link.addEventListener('click', smoothScroll);
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
});

// home bg animation
const bgAnimation = document.getElementById('bgAnimation');
const numberofColorBoxes = 400;

for(let i = 0; i < numberofColorBoxes; i++){
    const colorBox = document.createElement('div');
    colorBox.classList.add('colorBox');
    bgAnimation.append(colorBox)
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

// responssive nav bar 
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

// home text typing animation
// const typed= new Typed('.multiple-text', {
//     strings: ['Data Analyst', 'Python Developer'],
//     typeSpeed: 100,
//     backSpeed: 100,
//     backDelay: 1000,
//     loop: true
// })

//up button
// Get the button
var goUpBtn = document.getElementById("go-up-btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        goUpBtn.style.display = "block";
    } else {
        goUpBtn.style.display = "none";
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
        });
});