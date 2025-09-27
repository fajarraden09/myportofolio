// AMBIL KODE INI DAN GANTI SELURUH ISI FILE app.js ANDA

const hamburger = document.querySelector('#header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('#header .nav-bar .nav-list ul');
const menu_items = document.querySelectorAll('#header .nav-bar .nav-list ul li a');

// Fungsi untuk membuka & menutup menu hamburger
hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

// Fungsi agar menu mobile tertutup saat item di-klik
menu_items.forEach((item) => {
	item.addEventListener('click', () => {
		// Hanya tutup jika menu sedang terbuka
		if (mobile_menu.classList.contains('active')) {
			hamburger.classList.remove('active');
			mobile_menu.classList.remove('active');
		}
	});
});