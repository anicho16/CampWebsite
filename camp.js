
/**
 * Array requirement for dropdown. Functionality only implemented on index page to meet project requirement as this is not preferred method.
 */

document.addEventListener('DOMContentLoaded', addTeachers);

function addTeachers() {
    let list = document.getElementById('teacher-list');
    let teachers = ["<li><a class=\"dropdown-item\" href=\"about.html#Kayla\">Ms. Kayla</a></li>", "<li><a class=\"dropdown-item\" href=\"about.html#belle\">Ms. Amber</a></li>"];

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

/**
 * Payment Page - PayPal buttons and payments
 */

function initPayPalButton() {
    var shipping = 0;
    var itemOptions = document.querySelector("#smart-button-container #item-options");
    var quantity = parseInt();
    var quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
    if (!isNaN(quantity)) {
        quantitySelect.style.visibility = "visible";
    }
    var orderDescription = 'Choose your camp from the following options: Week Camp or Saturday Camp with optional after-care.';
    if (orderDescription === '') {
        orderDescription = 'Item';
    }
    paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'blue',
            layout: 'vertical',
            label: 'paypal',

        },
        createOrder: function (data, actions) {
            var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
            var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
            var tax = (8 === 0 || false) ? 0 : (selectedItemPrice * (parseFloat(8) / 100));
            if (quantitySelect.options.length > 0) {
                quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
            } else {
                quantity = 1;
            }

            tax *= quantity;
            tax = Math.round(tax * 100) / 100;
            var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
            priceTotal = Math.round(priceTotal * 100) / 100;
            var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;

            return actions.order.create({
                purchase_units: [{
                    description: orderDescription,
                    amount: {
                        currency_code: 'USD',
                        value: priceTotal,
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: itemTotalValue,
                            },
                            shipping: {
                                currency_code: 'USD',
                                value: shipping,
                            },
                            tax_total: {
                                currency_code: 'USD',
                                value: tax,
                            }
                        }
                    },
                    items: [{
                        name: selectedItemDescription,
                        unit_amount: {
                            currency_code: 'USD',
                            value: selectedItemPrice,
                        },
                        quantity: quantity
                    }]
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {

                // Full available details
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                // Show a success message within this page, e.g.
                const element = document.getElementById('paypal-button-container');
                element.innerHTML = '';
                element.innerHTML = '<h3>Thank you for your payment!</h3>';

                // Or go to another URL:  actions.redirect('thank_you.html');

            });
        },
        onError: function (err) {
            console.log(err);
        },
    }).render('#paypal-button-container');
}
