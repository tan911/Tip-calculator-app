"use strict"

const tipBtn = document.querySelectorAll('#tip__btn');
const customTipInput = document.querySelector('#custom__tip');
const billAmount = document.querySelector('#bill');
const numberOfPeople = document.querySelector('#number__of__people');
const totalAmountPerPerson = document.querySelector('#total__amount__per__person');
const totalPerPerson = document.querySelector('#total__per__person');
const resetBtn = document.querySelector('#btn__reset');


function resetAll () {
    billAmount.value = '0';
    numberOfPeople.value = '0';
    totalAmountPerPerson.textContent = '0.00'; 
    totalPerPerson.textContent = '0.00';
}


function tipPerPersonAmount (input) {
    const percentage = (+input / 100) * +billAmount.value;
    const total = percentage / +numberOfPeople.value;

    // TODO 
    // manipulating the text

    totalPerPersonAmount(total)
}

function totalPerPersonAmount (input) {
    const perPersonAmount = +billAmount.value / +numberOfPeople.value;
    const totalperson = input + perPersonAmount;

     // TODO 
    // manipulating the text
    console.log(totalperson)
}

function displayError() {
    const message = document.querySelector('.error__message');
    message.classList.remove('hidden');
    message.style.color = '#ef4444';
    numberOfPeople.focus();
    numberOfPeople.style.outlineColor = '#ef4444'
}

function displaySuccess() {
    const message = document.querySelector('.error__message');
    message.classList.add('hidden');
}


function inputSlice (input) {
    const percentage = input.slice(0, -1);

    if(+numberOfPeople.value === 0) {
        displayError()
    } else {
        tipPerPersonAmount(percentage)
        displaySuccess()
    }
}

for(let i = 0; i < tipBtn.length; i++) {
    tipBtn[i].addEventListener('click', () => {
       const percent = tipBtn[i].querySelector('label').textContent;
        inputSlice(percent);
    })
}

resetBtn.addEventListener('click', resetAll);
