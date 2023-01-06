"use strict"

const tipBtn = document.querySelectorAll('#tip__btn');
const customTipInput = document.querySelector('#custom');
const billAmount = document.querySelector('#bill');
const numberOfPeople = document.querySelector('#number__of__people');
const totalTipPerPerson = document.querySelector('#total__amount__per__person');
const totalPerPerson = document.querySelector('#total__per__person');
const resetBtn = document.querySelector('#btn__reset');
const userInput = document.querySelectorAll('.user__input');

// Check if the window height below 600 
// then apply min-height with property value of 100vh
if(window.innerWidth > 900 && window.innerHeight <= 600) {
    document.querySelector('.main').style.minHeight = '100vh';
    document.querySelector('.main').style.paddingTop = '3rem';
}

// Reset all values
function resetAll () {
    billAmount.value = '';
    numberOfPeople.value = '';
    totalTipPerPerson.textContent = '0.00'; 
    totalPerPerson.textContent = '0.00';
    customTipInput.value = '';
    resetBtn.setAttribute('disabled', '');
}


// Tip per person
function tipPerPersonAmount (input) {
    if(isNaN(+numberOfPeople.value) || +numberOfPeople.value === 0) return;

    const percentage = (+input / 100) * +billAmount.value;
    const total = percentage / +numberOfPeople.value;
    
    totalTipPerPerson.textContent = (Math.floor(total * 100) / 100).toFixed(2);

    totalPerPersonAmount(total);
}

// Total per person
function totalPerPersonAmount (input) {
    if(isNaN(+input)) return;

    const perPersonAmount = +billAmount.value / +numberOfPeople.value;
    const totalPerson = +input + perPersonAmount;
   
    totalPerPerson.textContent = totalPerson.toFixed(2);
}

// Display error/success
function displayMessage(message) {
    const span = document.querySelector('.error__message');
    if(message === 'error') {
        span.classList.remove('hidden');
        span.style.color = 'var(--error)';
        numberOfPeople.focus();
        numberOfPeople.style.outlineColor = 'var(--error)';
    } else {
        span.classList.add('hidden');
        numberOfPeople.blur();
        numberOfPeople.style.outlineColor = 'var(--color-001)';
    }
}

// Selected Tip
function selectedTipAmount (input) {

    // removing percentage 
    const percentage = input.slice(0, -1);

    // check if the input(number of people) is empty
    if(+numberOfPeople.value === 0) {
        displayMessage('error');
    } else {
        tipPerPersonAmount(percentage)
        displayMessage('success');
    }
}

// Loop every tip buttons and add click handler except custom button
for(let i = 0; i < tipBtn.length; i++) {
    tipBtn[i].addEventListener('click', () => {
        const percent = tipBtn[i].querySelector('label').textContent;
        selectedTipAmount(percent);
    })
}

// Loop every inputs
for(let i = 0; i < userInput.length; i++) {
    userInput[i].addEventListener('change', (e) => {
        resetBtn.removeAttribute('disabled');
        tipPerPersonAmount(e.target.value)
    })
}

// reset button
resetBtn.addEventListener('click', resetAll);



