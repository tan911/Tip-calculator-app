# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshot

![](./screenshot/desktop.png)


### Links

- Solution URL: [Code](https://github.com/tan911/Tip-calculator-app)
- Live Site URL: [Live site](https://tan911.github.io/Tip-calculator-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Desktop-first workflow
- Javscript
- Sass/scss
- BEM methodology


### What I learned

The layout and functionality of this app are what I'm concentrating on, although there are many factors to take into account. To begin the structure,
I always employ semantic elements rather than putting their role attribute inside a div element because I'm thinking about it from a semantic standpoint.

```html
<body>
  <main>
    <div>
      <h1><svg>Logo</svg></h1>
    </div>
    <div>input</div>
    <div>output</div>
  <main>
<body>
```
and to make the content centered both horizontally and vertically I use flexbox for body elements

```css
body {
  display: flex;
  align-items: center;
  justify-content: center;  
}
```
If you're wondering why I use the h1 element for the logo, I'll wrap it in a level 1 heading and insert an inline element with the word "splitter" to prevent getting an accessibility error. though why? We must employ aria characteristics because our logo is purely decorative but yet needs to be readable by screen readers. 

by adding an [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) attribute with the value "title" to your h1, followed by a 'id" attribute with the same value to your span element.

```html
  <h1 aria-labelledby="title">
    <span id="title">splitter</span>
  </h1>
```

However, what we really want is just the logo, no text, right? I do this by using the [visually-hidden](https://www.a11yproject.com/posts/how-to-hide-content/) class. Additionally adding focusable="false" and aria-hidden="true" attributes for the logo makes this only decorative.

```html
  <h1 aria-labelledby="title">
    <span class="visually-hidden" id="title">splitter</span>
    <svg aria-hidden="true" focusable="false"></svg>
  </h1>
```

Now let's talk about javascript. I'm having a great time developing the functionality of this app. Sometimes, in order to generate the best results, you need to put yourself in someone else's position. This application's main goal is to determine the tip of the provided input.

- bill input - Entering your bill's amount
- custom input - entering the tip you prefer
- input selection - chosen tip (for example, 5%, 10%,..)
- number of people - entering number's of people

However I use 3 different type of inputs 

type = radio : if you have buttons that will give input a value then type radio is more preferrable as it contain accessibility rather than natural button

type = number : I use this for custom input so that user will input only a number

type = text : although I only need numbers and the user might be able to enter text but javscript will handle this validation

I categorize these 3 inputs into 2 for the looping. Every time a user will click the buttons or the inputs the value of these will pass to the respective function that will handle some instruction before calculating the output.
```js
// for radio buttons
for(let i = 0; i < tipBtn.length; i++) {
    tipBtn[i].addEventListener('click', () => {
        const percent = tipBtn[i].querySelector('label').textContent;
        selectedTipAmount(percent);
    })
}

// for text and number inputs
for(let k = 0; k < userInput.length; k++) {
    userInput[k].addEventListener('change', (e) => {
        if(!tipBtn[k].checked && customTipInput.value.length === 0) {
            displayMessage('success');
        } else {
            tipPerPersonAmount(e.target.value);
        }   
    })
}
```

During the process of this application's development, I discover several flaws, which I quickly fix.
Before we look at those bugs, let's ask a few questions. 

What happens if a user mistakenly omits one of the inputs and chooses to type text rather than a number?
So, in order to address this, I utilized the term "guard" in the computations. What does the guard do? 

It merely contains conditions, and if one of them is met, end the function and, to be more precise, "do nothing." 

These conditions apply if:
- when the input can be converted into a number
- if the input contains no data 

```js
  // guard
  // isNaN function - it will just return boolean value if the numberofpeople is not a number, if it is then the value will be 'true' otherwise 'false'.  
  if(isNaN(+numberOfPeople.value) || +numberOfPeople.value === 0) return;
```
another scenario that could result in bugs in my program is:
- If the user begins to enter data from the numberOfPeople, custom input, then bill input and vice versa.
- switch to a different input choice if the user has already provided a custom input 

For instance, the user will start to type custom input and then bill input, and the number of people, the output of this is not correct as expected. The same as when the user already gives a custom input and then switches to another input choices. 

So to fix these bugs I used the advantage of the ternary operator and a very handy of converting a string into a number
```js
    const fixedInput = +input === +numberOfPeople.value || +input === +billAmount.value ? +customTipInput.value : +input;  
    const toInput = customTipInput.value === '' ? +input : fixedInput;
```

The value of the first line, "fixedInput," will depend on the specified condition; if it is satisfied, custom input will be used; else, the input choice will be used.
```js
 const fixedInput = +input === +numberOfPeople.value || +input === +billAmount.value ? +customTipInput.value : +input;  
```

However, the first line is insufficient to provide a reliable answer.
What happens if a user previously provides a custom input and tries to change the input choice (for example, 5, 10, 15, 25, or 50)?
Then the custom input will be the value that is calculated instead of the input choice value. 

But this time, the given condition would be different because it would have to be reevaluated in order to determine whether or not the custom input value is empty.
However, I need to tweak some code in "selectedTipAmount" before the reevaluation.
Therefore, I must first clear the value of the custom input before providing it to "tipPerPersonAmount" if the user tries to switch to the input choice. 
```js
function tipPerPersonAmount (input) {
  const toInput = customTipInput.value === '' ? +input : fixedInput;
}

function selectedTipAmount (input) {
  customTipInput.value = '';
}
```

### Continued development

I wish to add an accessible modal for this application in the future.
If the user forgets to enter the tip amount, this popup will alert them. 

### Useful resources

- [MDN docs for ARIA](https://developer.mozilla.org/en-US/)

## Author

- Website - [soon](https://www.your-site.com)
- Frontend Mentor - [@tan](https://www.frontendmentor.io/profile/tan911)

