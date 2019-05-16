const adPage = document.querySelector('#main');
const relatedAdsPage = document.querySelector('#related-ads-wrapper');
const placeOrderBtn = document.querySelector('#place-order-btn');
const poInputForm = document.querySelector('#po-input-form');
const offerInput = document.querySelector('#offer-input');
const offer = document.querySelector('#offer');
const poInputBtn = document.querySelector('#po-input-btn');
const poDiv = document.querySelector('#purchase-order-div');
const completePoBtn = document.querySelector('#complete-po-btn');
const reportBtn = document.querySelector('#report-btn');
const reportFormDiv = document.querySelector('#report-form-div');
const cancelBtns = document.querySelectorAll('.cancel-po');


placeOrderBtn.addEventListener('click', () => {
    hideElement(adPage);
    hideElement(relatedAdsPage);
    showElement(poInputForm);
});

poInputBtn.addEventListener('click', () => {
    const offerAmount = offerInput.value;
    hideElement(poInputForm);
    offer.innerHTML = `N${offerAmount}`;
    showElement(poDiv);
});


const completePo = () => {
    hideElement(poInputForm);
    hideElement(poDiv);
    showElement(adPage);
    showElement(relatedAdsPage);
    offerInput.value = '';
};

reportBtn.addEventListener('click', (e) => {
    hideElement(adPage);
    hideElement(relatedAdsPage);
    showElement(reportFormDiv);
    e.preventDefault();
});


cancelBtns.forEach(btn => {
    btn.addEventListener('click', completePo);
});

completePoBtn.addEventListener('click', completePo);

