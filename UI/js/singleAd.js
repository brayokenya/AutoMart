const adPage = document.querySelector('#main');
const relatedAdsPage = document.querySelector('#related-ads-wrapper');
const placeOrderBtn = document.querySelector('#place-order-btn');
const poInputForm = document.querySelector('#po-input-form');
const offerInput = document.querySelector('#offer-input');
const offer = document.querySelector('#offer');
const poInputBtn = document.querySelector('#po-input-btn');
const poDiv = document.querySelector('#purchase-order-div');
const completePoBtn = document.querySelector('#complete-po-btn');
const cancelBtns = document.querySelectorAll('.cancel-po');


placeOrderBtn.addEventListener('click', () => {
    adPage.style.display = 'none';
    relatedAdsPage.style.display = 'none';
    poInputForm.style.display = 'block';
});

poInputBtn.addEventListener('click', () => {
    const offerAmount = offerInput.value;
    poInputForm.style.display = 'none';
    offer.innerHTML = `N${offerAmount}`;
    poInputForm.style.display = 'none';
    poDiv.style.display = 'block';
});


const completePo = () => {
    poInputForm.style.display = 'none';
    poDiv.style.display = 'none';
    adPage.style.display = 'block';
    relatedAdsPage.style.display = 'block';
    offerInput.value = '';
}
cancelBtns.forEach(btn => {
    btn.addEventListener('click', completePo);
});

completePoBtn.addEventListener('click', completePo);

