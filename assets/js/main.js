function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  const isHidden = input.type === 'password';

  input.type = isHidden ? 'text' : 'password';
  icon.classList.toggle('fa-eye-slash');
  icon.classList.toggle('fa-eye');
}

function updatePasswordStrength() {
  const passwordInput = document.getElementById('password');
  const strengthLabel = document.getElementById('password-strength-label');
  const strengthBar = document.getElementById('password-strength-bar');
  const password = passwordInput.value;

  if (password.length === 0) {
    strengthLabel.textContent = 'Password strength: Weak';
    strengthBar.className = 'password-strength-bar';
    return;
  }

  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) {
    strengthLabel.textContent = 'Password strength: Weak';
    strengthBar.className = 'password-strength-bar weak';
  } else if (strength <= 4) {
    strengthLabel.textContent = 'Password strength: Moderate';
    strengthBar.className = 'password-strength-bar moderate';
  } else {
    strengthLabel.textContent = 'Password strength: Strong';
    strengthBar.className = 'password-strength-bar strong';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  const loadingBar = document.querySelector('.loading-bar');
  const compass = document.querySelector('.compass-inner');

  let progress = 0;
  const interval = setInterval(function () {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      setTimeout(function () {
        loadingScreen.style.opacity = '0';
        setTimeout(function () {
          loadingScreen.style.display = 'none';
          mainContent.style.display = 'block';
        }, 500);
      }, 500);
    }

    loadingBar.style.width = progress + '%';

    compass.style.transform = 'rotate(' + (progress * 3.6) + 'deg)';
  }, 30);

  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('input', updatePasswordStrength);
  }
});

function handleGoogleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      console.log('Google login success:', result.user);
      window.location.href = '/compass/Compass Home.php';
    })
    .catch(error => {
      console.error('Google login error:', error);
    });
}

function closePopup(event) {
  const popup = document.getElementById('popup');
  const popupContent = document.querySelector('.popup-content');
  if (event.target === popup || event.target === document.querySelector('.close-btn') || event.target.classList.contains('popup-button')) {
    popup.style.display = 'none';
  }
}

(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 1800,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });
});