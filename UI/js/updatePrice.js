const editPriceBtn = document.querySelector('#edit-price-btn');
const price = document.querySelector('#price');
const inputDiv = document.querySelector('#input-div');
const newPriceInput = document.querySelector('#new-price');
const cancelBtn = document.querySelector('#cancel-btn');
const updateBtn = document.querySelector('#update-btn');


editPriceBtn.addEventListener('click', () => {
    blurLayer.style.display = 'block';
    inputDiv.style.display = 'block';
    blurLayer.removeEventListener('click', blur);
});

updateBtn.addEventListener('click', () => {
    if (newPriceInput.value) {
        price.innerHTML = `N ${newPriceInput.value}`;
        blurLayer.style.display = '';
        inputDiv.style.display = '';
    }
});

cancelBtn.addEventListener('click', () => {
    blurLayer.style.display = '';
    inputDiv.style.display = '';
});