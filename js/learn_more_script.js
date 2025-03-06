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

//go up button
document.addEventListener("DOMContentLoaded", function() {
    var goUpBtn = document.getElementById("go-up-btn");

    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            goUpBtn.style.display = "block";
        } else {
            goUpBtn.style.display = "none";
        }
    };

    goUpBtn.addEventListener("click", function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});