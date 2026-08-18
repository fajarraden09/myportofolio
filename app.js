// File: app.js

// 1. Inisialisasi Animate On Scroll (AOS)
AOS.init({
    once: false, // Animasi hanya berjalan sekali saat di-scroll
    mirror: true,
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
    "Tersertifikasi BNSP, IBM & Cisco"
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

// --- 6. GHOST TRAIL CURSOR EFFECT ---
let lastDrawTime = 0;

document.addEventListener('mousemove', (e) => {
    // Mencegah error atau bug di layar sentuh (mobile)
    if (window.innerWidth <= 768) return;

    const now = Date.now();
    // Membatasi pembuatan elemen baru agar tidak membuat browser lag (sekitar 60 partikel per detik)
    if (now - lastDrawTime < 16) return; 
    lastDrawTime = now;

    // 1. Buat elemen div baru (sebagai serpihan jejak)
    const ghost = document.createElement('div');
    ghost.classList.add('cursor-ghost');
    
    // 2. Tempatkan persis di titik kursor saat itu
    ghost.style.left = `${e.clientX}px`;
    ghost.style.top = `${e.clientY}px`;
    
    // 3. Masukkan ke dalam HTML (halaman)
    document.body.appendChild(ghost);

    // 4. Hapus elemen tersebut setelah 500 milidetik (sesuai durasi animasi di CSS)
    // Jika tidak dihapus, website akan kepenuhan elemen div tak kasat mata
    setTimeout(() => {
        ghost.remove();
    }, 500);
});

// --- 8. EFEK ROKET TERJUN LALU SCROLL ---
const btnProyek = document.getElementById('btn-proyek');
const rocketIcon = document.getElementById('rocket-icon');

if (btnProyek && rocketIcon) {
    btnProyek.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 1. Memicu animasi roket terjun bebas
        rocketIcon.classList.add('rocket-simple-dive');
        
        // 2. TUNGGU sampai roket benar-benar menghilang (1.2 detik / 1200ms)
        setTimeout(() => {
            // Baru setelah itu layar digulirkan ke bawah
            const targetSection = document.querySelector('#projects');
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // 3. Bersihkan class animasi 1 detik setelah layar mulai bergulir 
            // agar roket mereset posisinya tanpa ketahuan pengguna
            setTimeout(() => {
                rocketIcon.classList.remove('rocket-simple-dive');
            }, 1000);

        }, 1200); // <-- Kunci sekuensialnya ada di angka ini
    });
}

// --- 9. FITUR ZOOM GAMBAR SERTIFIKAT (MODAL LIGHTBOX) ---
const certImages = document.querySelectorAll('.cert-img');
const modalImage = document.getElementById('modalImage');
let imageModal;

certImages.forEach(img => {
    img.addEventListener('click', function() {
        // Inisialisasi modal Bootstrap jika belum ada
        if (!imageModal) {
            imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        }
        
        // Ambil URL gambar yang diklik
        const src = this.getAttribute('src');
        
        // Ganti URL gambar di dalam modal dengan gambar yang diklik
        modalImage.setAttribute('src', src);
        
        // Tampilkan modal
        imageModal.show();
    });
});