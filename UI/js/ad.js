const ads = document.querySelector('#ads');
const filtersDiv = document.querySelector('#filters-div');
const filterBtn = document.querySelector('#filter-btn');
const makeFilter = document.querySelector('#make-filter');
const bodyTypeFilter = document.querySelector('#body-type-filter');
const priceRangeFilter = document.querySelector('#price-range-filter');
const makeOptions = document.querySelector('#make-options');
const bodyTypeOptions = document.querySelector('#body-type-options');
const priceRange = document.querySelector('#price-range');

filterBtn.addEventListener('click', () => {
    blurLayer.removeEventListener('click', blur);
    if (blurLayer.style.display === 'block') {
        hideElement(blurLayer);
        filterBtn.innerHTML = '<i class="fas fa-filter"></i>';
        hideElement(filtersDiv);
        blurLayer.addEventListener('click', blur);
    } else {
        showElement(filtersDiv);
        filterBtn.innerHTML = 'X';
        showElement(blurLayer);
        showElement(inputDiv);
    }
});

makeFilter.addEventListener('click', () => {
    showElement(makeOptions);
    hideElement(bodyTypeOptions);
    hideElement(priceRange);

});

bodyTypeFilter.addEventListener('click', () => {
    hideElement(makeOptions);
    showElement(bodyTypeOptions);
    hideElement(priceRange);
});

priceRangeFilter.addEventListener('click', () => {
    hideElement(makeOptions);
    hideElement(bodyTypeOptions);
    showElement(priceRange);
});