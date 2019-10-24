//When the page is completely loaded , check for an empty object or for "items"
//set shoes to the item "items" in sessionStorage
//add the items from the sessionStorage to the cart
$(document).ready(function () {
    var shoes = JSON.parse(sessionStorage.getItem("items") || "[]");
    sessionStorage.setItem("items", JSON.stringify(shoes));
    addToCartFromSesh();
    // cartRow.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

});


//create a div element, add class cart-row, check if item has already been added, if true dislplay an alertfunction addItemToCart(title, price, image, item, pop) {
function addItemToCart(title, price, image, item, pop) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = $('.cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    //add cartRowContents to the cartRow and add the event listeners for the remove cart item button, the quantity 
    //and size input fields
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
            <input min="6" max="11" class="cart-size-input" type="number" value="6">
        </div>
        <span id="itemPrice" class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input min="1" max="20" class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    if (!pop) {
        shoes = JSON.parse(sessionStorage.getItem("items"));
        shoes.push(item);
        sessionStorage.setItem("items", JSON.stringify(shoes));
    }
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    cartRow.getElementsByClassName('cart-size-input')[0].addEventListener('change', sizeChanged(item));

}

//Adds to the cart from the sessionStorage
function addToCartFromSesh() {
    shoes = JSON.parse(sessionStorage.getItem("items"));
    for (var i = 0; i < shoes.length; i++) {
        name = shoes[i].title;
        amount = shoes[i].price;
        src = shoes[i].image;
        size = shoes[i].item;
        addItemToCart(name, amount, src, size, true);
        updateCartTotal()
    }

}

//Update the Cart total based on what items are in the cart , as well as the delivery method and if a coupon is added
function updateCartTotal() {
    var cartItemContainer = $('.cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('R.', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    var amt = 60
    $('input[name="drone"]').change(function () {
        if ($(this).attr("id") == "Post") {
            amt = 60;
        } else {
            amt = 100;
        }
        $('.cart-total-price').text("R " + (total + amt).toFixed(2))
    })
    $('.btn-coupon').click(function () {
        if ($('#Coupon').val() == "BOH232") {
            var code = -100;
            $('.cart-total-price').text("R " + (total + code + amt).toFixed(2))
        } else {
            var code = 0;
            $('.cart-total-price').text("R " + (total + code + amt).toFixed(2))
        }

    })
}



//creates an alert which says "thank you for your purchase" and gives a reference code
//Removes all the items in the cart
function purchaseClicked() {
    $('.btn-purchase').click(function () {
        var cartItems = $('.cart-items')[0];
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild);
            shoes = JSON.parse(sessionStorage.getItem("items"));
            shoes = [];
            sessionStorage.setItem("items", JSON.stringify(shoes));
        }
        var reference = Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F");
        var ref1 = reference[Math.floor(Math.random() * reference.length)] + reference[Math.floor(Math.random() * reference.length)];
        var ref2 = reference[Math.floor(Math.random() * reference.length)] + reference[Math.floor(Math.random() * reference.length)];
        var ref3 = reference[Math.floor(Math.random() * reference.length)] + reference[Math.floor(Math.random() * reference.length)];
        var REF = ref1 + ref2 + ref3;
        alert("Thank you for your purchase , Your reference code is: " + REF);
        updateCartTotal()
        $(this).fadeOut(3000);
    })
}



