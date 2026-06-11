// File: app.js

// 1. Inisialisasi Animate On Scroll (AOS)
AOS.init({
    once: true, // Animasi hanya berjalan sekali saat di-scroll
    offset: 100 // Jarak (px) sebelum elemen memicu animasi
});

// 2. Efek Glassmorphism Navbar saat di-scroll
const navbar = document.getElementById('mainNavbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3. Menutup menu hamburger secara otomatis (Mobile)
const navLinks = document.querySelectorAll('.nav-item .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('dropdown-toggle')) {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// 4. Efek Mengetik Otomatis (Typing Effect)
const textsToType = [
    "Full-Stack Web Developer", 
    "Laravel & Vue.js Enthusiast", 
    "GIS Web Developer", 
    "Tersertifikasi BNSP & Cisco"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typed-text');

function typeEffect() {
    const currentText = textsToType[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    // Jika kata selesai diketik
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Jeda sebelum menghapus
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length; // Pindah ke kata selanjutnya
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}
// Mulai efek pengetikan
document.addEventListener("DOMContentLoaded", () => {
    if(typingElement) typeEffect();
});

// 5. Fitur Dark/Light Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;
const iconTheme = themeToggleBtn.querySelector('i');

// Cek LocalStorage apakah user sebelumnya memilih dark mode
if (localStorage.getItem('theme') === 'dark') {
    bodyElement.classList.add('dark-mode');
    iconTheme.classList.replace('fa-moon', 'fa-sun');
    themeToggleBtn.classList.replace('btn-outline-light', 'btn-outline-warning');
}

themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    
    if (bodyElement.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        iconTheme.classList.replace('fa-moon', 'fa-sun');
        themeToggleBtn.classList.replace('btn-outline-light', 'btn-outline-warning');
    } else {
        localStorage.setItem('theme', 'light');
        iconTheme.classList.replace('fa-sun', 'fa-moon');
        themeToggleBtn.classList.replace('btn-outline-warning', 'btn-outline-light');
    }
});