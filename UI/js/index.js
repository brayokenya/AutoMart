const menuBtn = document.querySelector('#menu-btn');
const blurLayer = document.querySelector('#blur-layer');
const sideNav = document.querySelector('#side-nav');
const closeBtn = document.querySelector('#close-btn');
const applyFilterBtn = document.querySelector('#apply-filter');
const filterIcon = document.querySelector('#filter-icon');
const hiddenFilters = document.querySelectorAll('.hide');

const hideElement = (element) => {
    return element.style.display = 'none';
};

const showElement = (element) => {
    return element.style.display = 'block';
};

const giveOpacity = (element, value) => {
    return element.style.opacity = value;
};

const giveWidth = (element, value) => {
    return element.style.width = value;
};

menuBtn.addEventListener('click', () => {
    if (!blurLayer.style.display || blurLayer.style.display === 'none') {
        showElement(blurLayer);
        showElement(closeBtn);
        giveWidth(sideNav, '200px');
        giveOpacity(menuBtn, 0);
    }
});

closeBtn.addEventListener('click', () => {
    if (blurLayer.style.display === 'block') {
        hideElement(blurLayer);
        hideElement(closeBtn);
        giveWidth(sideNav, '0px');
        giveOpacity(menuBtn, 1);
    }
});

const blur = () => {
    if (blurLayer.style.display = 'block') {
        hideElement(blurLayer);
        giveWidth(sideNav, '0px');
        giveOpacity(menuBtn, 1);
        hideElement(closeBtn);
    }
}
blurLayer.addEventListener('click', blur);


applyFilterBtn.addEventListener('click', (e) => {
    if (hiddenFilters[0].style.display === 'block') {
        hiddenFilters.forEach(filter => filter.style.display = 'none');
        filterIcon.innerHTML = `<i class="fas fa-chevron-right mg-l-10"></i>`;
    } else {
        hiddenFilters.forEach(filter => filter.style.display = 'block');
        filterIcon.innerHTML = `<i class="fas fa-chevron-down mg-l-10"></i>`;
    }
    e.preventDefault();
})