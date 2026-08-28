// Dollar to BDT conversion

const dollarPrice = 12.5;

const exchangeRate = 120;

const bdtPrice = dollarPrice * exchangeRate;

document.getElementById('currentPrice').textContent =
    "Tk" + bdtPrice.toLocaleString(); 


// Change main product image based on thumbnail click

function changeImage(imageSrc) {

    document.getElementById('main-image').src = imageSrc;

}
// Increase quantity

function increaseQuantity() {

    const quantityInput =
        document.getElementById('quantity');

    quantityInput.value =
        parseInt(quantityInput.value) + 1;

}


// Decrease quantity

function decreaseQuantity() {

    const quantityInput =
        document.getElementById('quantity');

    if (parseInt(quantityInput.value) > 1) {

        quantityInput.value =
            parseInt(quantityInput.value) - 1;

    }

}


// Add to Cart

function addToCart() {

    const quantity =
        document.getElementById('quantity').value;

    alert(
        quantity + " cake added to My Cart!"
    );

}