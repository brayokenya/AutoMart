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
        hideElement(table);
        showElement(userAdDiv);
    });
});

closeUserAdBtn.addEventListener('click', () => {
    showElement(table);
    hideElement(userAdDiv);
});

editPriceBtn.addEventListener('click', () => {
    showElement(blurLayer);
    showElement(inputDiv);
    blurLayer.removeEventListener('click', blur);
});

updateBtn.addEventListener('click', () => {
    if (newPriceInput.value) {
        price.innerHTML = `N ${newPriceInput.value}`;
        hideElement(blurLayer);
        hideElement(inputDiv);
        hideElement(confirmationPrompt);
    }
});

cancelBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        hideElement(blurLayer);
        hideElement(inputDiv);
        hideElement(confirmationPrompt);
    });
});

markAsSoldBtn.addEventListener('click', () => {
    showElement(blurLayer);
    showElement(confirmationPrompt);
    blurLayer.removeEventListener('click', blur);
});
