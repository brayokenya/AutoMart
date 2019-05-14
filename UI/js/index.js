const menuBtn = document.querySelector('#menu-btn');
const blurLayer = document.querySelector('#blur-layer');
const sideNav = document.querySelector('#side-nav');
const closeBtn = document.querySelector('#close-btn');

menuBtn.addEventListener('click', () => {
    if (!blurLayer.style.display || blurLayer.style.display === 'none') {
        blurLayer.style.display = 'block';
        sideNav.style.width = '200px';
        menuBtn.style.opacity = 0;
        closeBtn.style.display = 'block';
    }
});

closeBtn.addEventListener('click', () => {
    if (blurLayer.style.display = 'block') {
        blurLayer.style.display = 'none';
        sideNav.style.width = '0';
        menuBtn.style.opacity = 100;
        closeBtn.style.display = 'none';
    }
});

const blur = () => {
    if (blurLayer.style.display = 'block') {
        blurLayer.style.display = 'none';
        sideNav.style.width = '0';
        menuBtn.style.opacity = 100;
        closeBtn.style.display = 'none';
    }
}
blurLayer.addEventListener('click', blur);