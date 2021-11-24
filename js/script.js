// Applies focus to Name input field on page load

let nameInput = document.getElementById('name');
nameInput.focus();

// hides Job Role text input field by default 

let jobRoleInput = document.getElementById('other-job-role');
jobRoleInput.style.display = 'none';

// Displays Job Role text input field when user selects "Other" from dropdown

let jobRoleDropdown = document.getElementById('title');
jobRoleDropdown.addEventListener("change", (e) => {
    if (e.target.value === 'other') {
        jobRoleInput.style.display = 'block';
    } else if (e.target.value !== 'other') {
        jobRoleInput.style.display = 'none';
    }
});

// Disables Color dropdown by default

let colorDropdown = document.getElementById('color');
colorDropdown.disabled = true;

// Enables Color dropdown once user has selected a design and displays only available colors

let designDropdown = document.getElementById('design');
designDropdown.addEventListener("change", (e) => {
    if (e.target.value === 'js puns') {
        colorDropdown.disabled = false;
        colorDropdown.children[1].hidden = false;
        colorDropdown.children[2].hidden = false;
        colorDropdown.children[3].hidden = false;
        colorDropdown.children[4].hidden = true;
        colorDropdown.children[5].hidden = true;
        colorDropdown.children[6].hidden = true;
    } else if (e.target.value === 'heart js') {
        colorDropdown.disabled = false;
        colorDropdown.children[1].hidden = true;
        colorDropdown.children[2].hidden = true;
        colorDropdown.children[3].hidden = true;
        colorDropdown.children[4].hidden = false;
        colorDropdown.children[5].hidden = false;
        colorDropdown.children[6].hidden = false;
    }
});

// Adds cost of all activities selected and displays total

let register = document.getElementById('activities');
let activities = document.querySelectorAll('.activities-box input');
let activitiesCost = document.getElementById('activities-cost');
let activitiesTotal = 0;

register.addEventListener('change', (e) => {
    let activityCost = +e.target.getAttribute('data-cost');
    if (e.target.checked) {
        activitiesTotal += activityCost; 
    } else {
        activitiesTotal -= activityCost;
    }
    activitiesCost.innerHTML = `Total: $${activitiesTotal}`;
});

// Displays only details of selected payment type, hides details of other payment types

let paymentType = document.getElementById('payment');
let credit = document.getElementById('credit-card');
let paypal = document.getElementById('paypal');
let bitcoin = document.getElementById('bitcoin');

paymentType.children[1].setAttribute('selected', 'selected');
paypal.hidden = true;
bitcoin.hidden = true;
paymentType.addEventListener('change', (e) => {
    if (e.target.value === 'credit-card') {
        credit.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    } else if (e.target.value === 'paypal') {
        credit.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;
    } else if (e.target.value === 'bitcoin') {
        credit.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    }
});

let form = document.querySelector('form');
let emailInput = document.querySelector('#email');
let creditCardInput = document.querySelector('#cc-num');
let zipCodeInput = document.querySelector('#zip');
let cvvInput = document.querySelector('#cvv');

// Tests whether name input contains at least a first name with only letters and allows for additional names.
// Adapted from https://teamtreehouse.com/library/fsjs-project-warm-up-form-input-validation-2

const nameValidator = () => {
    let nameInputValue = nameInput.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameInputValue);
    //console.log(`Name validation test on "${nameInputValue}" evaluates to ${nameIsValid}`);
    return nameIsValid;
};

// Tests whether email input format is valid.
// Adapted from https://teamtreehouse.com/library/fsjs-project-warm-up-form-input-validation-2

const emailValidator = () => {
    let emailValue = emailInput.value;
    const emailIsValid = /^[^@]+@[^@.]+\.com+$/i.test(emailValue);
    //console.log(`Email validation test on "${emailValue}" evaluates to ${emailIsValid}`);
    return emailIsValid;
};

// Tests whether at least one activity checkbox is selected.

const registerValidator = () => {
    const registerIsValid = activitiesTotal > 0;
    //console.log(`Activity registration test evaluates to ${registerIsValid}`);
    return registerIsValid;
};

// Tests whether credit card number field contains between 13 and 16 digits without spaces or other characters.

const creditCardValidator = () => {
    let creditCardValue = creditCardInput.value;
    const ccIsValid = /^\d{13,16}$/.test(creditCardValue);
    //console.log(`Credit card validation test on "${creditCardValue}" evaluates to ${ccIsValid}.`);
    return ccIsValid;
};

// Tests whether zip code field contains exactly 5 digits.

const zipCodeValidator = () => {
    let zipCodeValue = zipCodeInput.value;
    const zipCodeIsValid = /^\d{5}$/.test(zipCodeValue);
    //console.log(`Zip code validation test on "${zipCodeValue}" evaluates to ${zipCodeIsValid}.`);
    return zipCodeIsValid;
};

// Tests whether CVV field contains exactly 3 digits.

const cvvValidator = () => {
    let cvvValue = cvvInput.value;
    const cvvIsValid = /^\d{3}$/.test(cvvValue);
    //console.log(`CVV validation test on "${cvvValue}" evaluates to ${cvvIsValid}.`);
    return cvvIsValid;
};

// Removes .valid class and applies .not-valid class to label for any input field that is not properly filled out and displays hint element.

function notvalidStyleApplier(inputField) {
    inputField.parentNode.classList.add('not-valid');
    inputField.parentNode.classList.remove('valid');
    inputField.parentElement.lastElementChild.style.display = 'block';
}

// Removes .not-valid class and applies .valid class to label for any input field that is properly filled out and removes hint element.

function validStyleApplier(inputField) {
    inputField.parentNode.classList.remove('not-valid');
    inputField.parentNode.classList.add('valid');
    inputField.parentElement.lastElementChild.style.display = 'none';
}


// Prevents form from submitting if any required fields are not properly filled out and applies valid or not-valid styles.

form.addEventListener('submit', (e) => {
    
    if (!nameValidator()) {
        e.preventDefault();
        console.log("Form failed to submit because name field was left blank or not properly formatted.");
        notvalidStyleApplier(nameInput);
    } else if (nameValidator()) {
        validStyleApplier(nameInput);
    };

    if (!emailValidator()) {
        e.preventDefault();
        console.log("Form failed to submit because email field was left blank or not properly formatted.");
        notvalidStyleApplier(emailInput);
    } else if (emailValidator()) {
        validStyleApplier(emailInput);
    };

    if (!registerValidator()) {
        e.preventDefault();
        console.log("Form failed to submit because at least one activity must be selected.");
        register.classList.add('not-valid');
        register.classList.remove('valid');
        register.lastElementChild.style.display = 'block';
    } else if (registerValidator()) {
        register.classList.remove('not-valid');
        register.classList.add('valid');
        register.lastElementChild.style.display = 'none';
    };

    if (credit.hidden === false) {
        if (!creditCardValidator()) {
            e.preventDefault();
            console.log("Form failed to submit because credit card number field must contain between 13 and 16 digits without spaces or dashes.");
            notvalidStyleApplier(creditCardInput);
        } else if (creditCardValidator()) {
            validStyleApplier(creditCardInput);
        };

        if (!zipCodeValidator()) {
            e.preventDefault();
            console.log("Form failed to submit because zip code field must contain a 5 digit number.");
            notvalidStyleApplier(zipCodeInput);
        } else if (zipCodeValidator()) {
            validStyleApplier(zipCodeInput);
        };

        if (!cvvValidator()) {
            e.preventDefault();
            console.log("Form failed to submit because CVV field must contain a 3 digit number.");
            notvalidStyleApplier(cvvInput);
        } else if (cvvValidator()) {
            validStyleApplier(cvvInput);
        };
    };

});

// Applies .focus class to activities on focus and removes .focus class on blur

for (let i = 0; i < activities.length; i ++) {
    activities[i].addEventListener('focus', (e) => {
        activities[i].parentNode.classList.add('focus');
    });
    activities[i].addEventListener('blur', (e) => {
        activities[i].parentNode.classList.remove('focus');
    });
}