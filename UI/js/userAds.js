const viewBtns = document.querySelectorAll('.view-btn');
const table = document.querySelector('table');
const userAdDiv = document.querySelector('#user-ad-div');
const closeUserAdBtn = document.querySelector('#close-user-ad');
const editPriceBtn = document.querySelector('#edit-price-btn');
const price = document.querySelector('#price');
const inputDiv = document.querySelector('#input-div');
const newPriceInput = document.querySelector('#new-price');
const cancelBtns = document.querySelectorAll('.cancel-btn');
const updateBtn = document.querySelector('#update-btn');
const markAsSoldBtn = document.querySelector('#mark-as-sold-btn');
const confirmationPrompt = document.querySelector('#confirmation-prompt');
const confirmSaleBtn = document.querySelector('#confirm-sale-btn');


viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        table.style.display = 'none';
        userAdDiv.style.display = 'block';
    });
});

closeUserAdBtn.addEventListener('click', () => {
    table.style.display = 'block';
    userAdDiv.style.display = 'none';
});

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
        confirmationPrompt.style.display = '';
    }
});

cancelBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        blurLayer.style.display = '';
        inputDiv.style.display = '';
        confirmationPrompt.style.display = '';
    });
});

markAsSoldBtn.addEventListener('click', () => {
    blurLayer.style.display = 'block';
    confirmationPrompt.style.display = 'block';
    blurLayer.removeEventListener('click', blur);
});