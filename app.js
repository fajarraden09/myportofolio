// File: app.js

// Menutup menu hamburger secara otomatis saat item menu di-klik (di tampilan mobile)
const navLinks = document.querySelectorAll('.nav-item .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // PERBAIKAN: Hanya tutup menu jika yang di-klik BUKAN sebuah dropdown
        if (!link.classList.contains('dropdown-toggle')) {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});