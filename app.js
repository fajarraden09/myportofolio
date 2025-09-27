const hamburger = document.querySelector('#header .hamburger');
const mobile_menu = document.querySelector('#header .nav-list ul');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});