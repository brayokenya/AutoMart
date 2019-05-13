const mainDiv = document.querySelector('#main');
const poDivs = document.querySelectorAll('.po-div');
const purchaseOrder = document.querySelector('#purchase-order-div');

poDivs.forEach((poDiv) => {
    poDiv.addEventListener('click', () => {
        mainDiv.style.display = 'none';
        purchaseOrder.style.display = 'block';
    });
});
