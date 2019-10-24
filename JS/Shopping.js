//When the page has finished loading call the function addToCartClicked, create session storage item
//call function addToCartFromSesh
$(document).ready(function () {
    addToCartClicked();
    var shoes = JSON.parse(sessionStorage.getItem("items") || "[]");
    sessionStorage.setItem("items", JSON.stringify(shoes));
    addToCartFromSesh();
})

//COnstructor function for shoe objects
function shoe(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.size = sizeChanged;
}

//Create each sneaker object
var sneaker1 = new shoe(
    "Adidas Sneakers 1",
    1350,
    "Images/adidas 1.jpg",
);

var sneaker2 = new shoe(
    "Adidas Sneakers 2",
    1350,
    "Images/adidas 2.jpg",
);

var sneaker3 = new shoe(
    "Adidas Sneakers 3",
    1500,
    "Images/adidas 3.jpg",
);

var sneaker4 = new shoe(
    "Adidas Sneakers 4",
    1400,
    "Images/adidas 6.jpg",
);

var sneaker5 = new shoe(
    "Adidas Sneakers 5",
    1500,
    "Images/adidas 7.jpg",
);

var sneaker6 = new shoe(
    "Adidas Sneakers 6",
    1350,
    "Images/adidas 9.jpg",
);

var sneaker7 = new shoe(
    "Adidas Sneakers 7",
    1550,
    "Images/adidas 13.jpg",
);

var sneaker8 = new shoe(
    "Nike Sneakers 1",
    1700,
    "Images/nike 1.png",
);

var sneaker9 = new shoe(
    "Adidas Sneakers 8",
    1350,
    "Images/adidas 2.jpg",
);

var sneaker10 = new shoe(
    "Adidas Sneakers 9",
    1600,
    "Images/adidas 12.jpg",
);

var sneaker11 = new shoe(
    "Nike Sneakers 2",
    1400,
    "Images/nike 3.jpg",
);

var sneaker12 = new shoe(
    "Adidas Sneakers 10",
    1350,
    "Images/adidas 11.jpg",
);

//when a remove item button is clicked remove that item from the cart, and update the cart total
function removeCartItem(event) {
    var buttonClicked = $(event.target);
    buttonClicked.parent().parent().remove();
    var title = buttonClicked.parents(".cart-row").find(".cart-item-title").text()
    shoes = JSON.parse(sessionStorage.getItem("items"));
    var indexOfItem = 0
    for (var index in shoes) {
        if (shoes[index].name == title) {
            indexOfItem = index
            break
        }
    }
    shoes.splice(indexOfItem, 1)
    sessionStorage.setItem("items", JSON.stringify(shoes))
    updateCartTotal();

}

//when a quantity is changed , if it is <=0 then change it to 1, then update the cart total
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal()
}

//change the price of the sneaker according to the size selected in the size number input
function sizeChanged(item) {
    return function sizeChangedWrapped() {
        let sizeChange = parseInt($(this).val());
        if (sizeChange == 6) {
            $(this).parent().next().text(item.price)
        } else if (sizeChange == 8) {
            $(this).parent().next().text(item.price + 100)
        } else if (sizeChange > 9) {
            $(this).parent().next().text(item.price + 200)
        }
        updateCartTotal();
        shoes = JSON.parse(sessionStorage.getItem("items"));
        shoes.price = $(this).item.price;
        sessionStorage.setItem("items", JSON.stringify(shoes));
    }
}

//when the add to cart button is clicked , add that item to the cart (image, price, and title)
//update the cart total
function addToCartClicked() {
    var current_button = 0
    $(".thumbnail > .shop-item-button").each(function () {
        let current_number = ++current_button
        $(this).click(function () {
            let item = window["sneaker" + current_number]
            addItemToCart(item.title, item.price, item.image, item)
            updateCartTotal()

        })

    })
};


//create a div element, add class cart-row, check if item has already been added, if true dislplay an alert and break 
//out from the function
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

//If the page is reloaded add the items in the session to the cart
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

//Update the cart total based on what items are still in the cart
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
    total = Math.round(total * 100) / 100;
    $('.cart-total-price')[0].innerText = 'R' + total;
    alert("Current Total is " + "R " + total)

}
