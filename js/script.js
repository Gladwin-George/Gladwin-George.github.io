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

// home background animation
const typed= new Typed('.multiple-text', {
    strings: ['Data Analyst', 'Python Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})


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




