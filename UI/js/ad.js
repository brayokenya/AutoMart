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
        blurLayer.style.display = 'none';
        filterBtn.innerHTML = '<i class="fas fa-filter"></i>';
        filtersDiv.style.display = 'none';
        blurLayer.addEventListener('click', blur);
    } else {
        filtersDiv.style.display = 'block';
        filterBtn.innerHTML = 'X';
        blurLayer.style.display = 'block';
        inputDiv.style.display = 'block';
    }
});

makeFilter.addEventListener('click', () => {
    makeOptions.style.display = 'block';
    bodyTypeOptions.style.display = 'none';
    priceRange.style.display = 'none';

});

bodyTypeFilter.addEventListener('click', () => {
    makeOptions.style.display = 'none';
    bodyTypeOptions.style.display = 'block';
    priceRange.style.display = 'none';
});

priceRangeFilter.addEventListener('click', () => {
    makeOptions.style.display = 'none';
    bodyTypeOptions.style.display = 'none';
    priceRange.style.display = 'block';
});