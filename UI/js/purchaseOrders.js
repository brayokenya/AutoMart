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
        mainDiv.style.display = 'none';
        purchaseOrder.style.display = 'block';
    });
});

editBtn.addEventListener('click', () => {
    purchaseOrder.style.display = 'none';
    inputDiv.style.display = 'block';
});

updateBtn.addEventListener('click', () => {
    const newValue = inputValue.value;
    offer.innerHTML = `N${newValue}`;
    inputDiv.style.display = 'none';
    purchaseOrder.style.display = 'block';

});

cancelBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        inputValue.value = '';
        inputDiv.style.display = 'none';
        purchaseOrder.style.display = 'none';
        mainDiv.style.display = 'block';
    });
});