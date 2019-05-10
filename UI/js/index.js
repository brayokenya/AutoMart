const topNav = document.querySelector('nav');
const wrapper = document.querySelector('#wrapper');
const scrollBtn = document.querySelector('#scroll-btn');
const menuBtn = document.querySelector('#menu-btn');
const blurLayer = document.querySelector('#blur-layer');
const sideNav = document.querySelector('#side-nav');
const closeBtn = document.querySelector('#close-btn');


scrollBtn.addEventListener('click', () => {
    wrapper.style.display = 'block';
    topNav.style.background = '#003542';
});


menuBtn.addEventListener('click', () => {
    if (!blurLayer.style.display || blurLayer.style.display === 'none') {
        blurLayer.style.display = 'block';
        sideNav.style.width = '200px';
        menuBtn.style.display = 'none';
        closeBtn.style.display = 'block';
    }
});

closeBtn.addEventListener('click', () => {
    if (blurLayer.style.display = 'block') {
        blurLayer.style.display = 'none';
        sideNav.style.width = '0';
        menuBtn.style.display = '';
        closeBtn.style.display = 'none';
    }
});

blurLayer.addEventListener('click', () => {
    if (blurLayer.style.display = 'block') {
        blurLayer.style.display = 'none';
        sideNav.style.width = '0';
        menuBtn.style.display = '';
        closeBtn.style.display = 'none';
    }
});