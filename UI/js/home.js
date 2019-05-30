const topNav = document.querySelector('nav');
const scrollBtn = document.querySelector('#scroll-btn');
const loginBtns = document.querySelectorAll('.login-btn');
const signupBtns = document.querySelectorAll('.signup-btn');
const resetPasswordBtn = document.querySelector('#reset-pass-btn');
const searchFormDiv = document.querySelector('#search-form-div');
const closeFormBtn = document.querySelector('#close-form-btn');
const signupNotes = document.querySelectorAll('.signup-note');
const loginNotes = document.querySelectorAll('.login-note');


scrollBtn.addEventListener('click', () => {
    showElement(wrapper);
    topNav.style.background = '#003542';
});


const searchFormHtml = `
<h3 class="lt-grey sm"> Search for automobiles</h3>
<form action="" id="search-form" class="primary-form">
    <input type="text" name="make" placeholder="manufacturer eg (Ford)">
    <input type="text" name="bodyType" placeholder="body type (eg truck)">
    <select name="state" id="select-state" class="block" placeholder="select">
        <option value=""> select vehicle state </option>
        <option value=""> ---- </option>
        <option value="new"> new </option>
        <option value="used"> used </option>
        <option value="used"> new and used </option>
    </select>
    <input type="number" name="minPrice" placeholder="min-price">
    <input type="number" name="maxPrice" placeholder="max-price">
    <button class="main-btn btn-primary block primary-form-btn" id="search-btn"> search </button>
</form>
`;

const signupFormHtml = `
<h3 class="lt-grey sm"> Signup</h3>
<form action="" id="signup-form" class="primary-form">
    <input type="text" name="firstName" placeholder="first name" > 
    <input type="text" name="lastName" placeholder="last name">
    <input type="email" name="email" placeholder="email">
    <input type="password" name="password" placeholder="password">
    <input type="password" name="confirmPassword" placeholder="confirm password">
    <button class="main-btn btn-primary block primary-form-btn" id="signup-submit-btn"> signup </button>
</form>
`;

const loginFormHtml = `
<h3 class="lt-grey sm"> Login</h3>
<form action="" id="login-form" class="primary-form">
    <input type="email" name="email" placeholder="email">
    <input type="password" name="password" placeholder="password">
    <button class="main-btn btn-primary block primary-form-btn" id="login-submit-btn"> login </button>
</form>
`;

const resetPasswordFormHtml = `
<h3 class="lt-grey sm"> Reset Password </h3>
<form action="" id="login-form" class="primary-form">
    <input type="email" name="email" placeholder="email">
    <button class="main-btn btn-primary block primary-form-btn" id="login-submit-btn"> reset </button>
</form>
`;

const showSignupNotes = () => {
    signupNotes.forEach(note => showElement(note));
};

const hideSignupNotes = () => {
    signupNotes.forEach(note => hideElement(note));
};

const showLoginNotes = () => {
    loginNotes.forEach(note => showElement(note));
};

const hideLoginNotes = () => {
    loginNotes.forEach(note => hideElement(note));
};

signupBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        searchFormDiv.innerHTML = signupFormHtml;
        showElement(closeFormBtn);
        closeBtn.click();
        window.scrollTo(0, 0);
        hideLoginNotes();
        showSignupNotes();
    });
});

loginBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        searchFormDiv.innerHTML = loginFormHtml;
        showElement(closeFormBtn);
        closeBtn.click();
        window.scrollTo(0, 0);
        showLoginNotes();
        hideSignupNotes();
    });
});

resetPasswordBtn.addEventListener('click', () => {
    searchFormDiv.innerHTML = resetPasswordFormHtml;
    showElement(closeFormBtn);
    closeBtn.click();
    window.scrollTo(0, 0);
    hideLoginNotes();
    showSignupNotes();
});

closeFormBtn.addEventListener('click', () => {
    searchFormDiv.innerHTML = searchFormHtml;
    hideElement(closeFormBtn);
    hideLoginNotes();
    hideSignupNotes();
});

