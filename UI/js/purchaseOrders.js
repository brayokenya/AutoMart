const mainDiv = document.querySelector('#main');
const poDivs = document.querySelectorAll('.po-div');
const purchaseOrder = document.querySelector('#purchase-order-div');
const editBtn = document.querySelector('#edit-po-btn');
const inputDiv = document.querySelector('#po-update-div');
const inputValue = document.querySelector('input');
const updateBtn = document.querySelector('#po-update-btn');
const offer = document.querySelector('#offer');
const cancelBtns = document.querySelectorAll('.cancel-btn');

poDivs.forEach((poDiv) => {
    poDiv.addEventListener('click', () => {
        hideElement(mainDiv);
        showElement(purchaseOrder);
    });
});

editBtn.addEventListener('click', () => {
    hideElement(purchaseOrder);
    showElement(inputDiv);
});

updateBtn.addEventListener('click', () => {
    const newValue = inputValue.value;
    offer.innerHTML = `N${newValue}`;
    hideElement(inputDiv);
    showElement(purchaseOrder);
});

cancelBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        inputValue.value = '';
        hideElement(inputDiv);
        hideElement(purchaseOrder);
        showElement(mainDiv);
    });
});