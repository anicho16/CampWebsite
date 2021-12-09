
/**
 * Array requirement for dropdown. Functionality only implemented on index page to meet project requirement as this is not preferred method.
 */

document.addEventListener('DOMContentLoaded', addTeachers);

function addTeachers() {
    let list = document.getElementById('teacher-list');
    let teachers = ["<li><a class=\"dropdown-item\" href=\"about.html#elsa\">Ms. Elsa</a></li>", "<li><a class=\"dropdown-item\" href=\"about.html#belle\">Ms. Belle</a></li>"];

    for (const li of teachers) {
        list.innerHTML += li;
    }
}

/**
 * Pricing Calculator
 */

document.getElementById('price-submit').addEventListener('click', run);

/**
 * Begins the process of validation, calculation, and displaying results.
 */
function run() {
    event.preventDefault();
    const result = document.getElementById('camp-result');

    let validNumber = validateNumber();
    if (!validNumber) {
        result.classList.add('display-none');
    } else {
        calculatePrice();
    }
}

/**
 * Calculates the price of the camp
 */

function calculatePrice() {

    let afterCare = document.getElementById('after-care').checked;
    let numberOfKids = document.getElementById('quantity').value;
    let weekCamp = document.getElementById('week-camp').checked;
    let dayCamp = document.getElementById('day-camp').checked;
    let campResult = document.getElementById('camp-result');

    const typeOfCamp = document.querySelectorAll('input[name="campType"]');
    let campPrice;
    let selectedCamp;
    for (const camp of typeOfCamp) {
        if (camp.checked) {
            campPrice = camp.value;
            selectedCamp = camp.nextElementSibling.innerHTML;
            break;
        }
    }

    let totalCost;
    if (afterCare && weekCamp) {
        totalCost = numberOfKids * campPrice + 50 * numberOfKids;
    } else if (afterCare && dayCamp) {
        totalCost = numberOfKids * campPrice + 15 * numberOfKids;
    } else {
        totalCost = numberOfKids * campPrice;
    }

    displayResults(selectedCamp, numberOfKids, totalCost, campResult);
}

/**
 * Displays results after price is calculated.
 * 
 * @param {String} selectedCamp 
 * @param {int} numberOfKids 
 * @param {int} totalCost 
 * @param {Element} campResult 
 */
function displayResults(selectedCamp, numberOfKids, totalCost, campResult) {
    document.getElementById('selected-camp').innerHTML = selectedCamp;
    document.getElementById('quantity-kids').innerHTML = numberOfKids;
    document.getElementById('total-cost').innerHTML = totalCost;

    let children = document.getElementById('child');
    if (numberOfKids > 1) {
        children.innerHTML = "children";
    } else {
        children.innerHTML = "child";
    }
    campResult.classList.remove('d-none');
}

/**
 * Validates whether the number entered in the form field is positive
 * 
 * @returns {boolean} true if the number is valid
 */
function validateNumber() {
    let numberOfKids = document.getElementById('quantity').value;
    let campResult = document.getElementById('camp-result');
    const numberError = document.getElementById('number-error');

    if (numberOfKids == "" || parseInt(numberOfKids) < 1) {
        numberError.classList.remove('d-none');
        campResult.classList.add('d-none');
        return false;
    } else {
        numberError.classList.add('d-none');
        return true;
    }
}


/**
 * Example starter JavaScript for disabling form submissions if 
 * there are invalid fields  
 */
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();