document.addEventListener('DOMContentLoaded', function () {
    var itemsContainer = document.querySelector('.cart-items-list');
    var totalElement = document.querySelector('.cart-total');


    if (!itemsContainer || !totalElement) {
        return;
    }


    var cart = [];
    var stored = localStorage.getItem('cart');


    if (stored) {
        try {
            cart = JSON.parse(stored);
        } catch (e) {
            cart = [];
        }
    }


    if (!cart || cart.length === 0) {
        itemsContainer.textContent = 'У кошику ще немає товарів';
        totalElement.textContent = '0';
        return;
    }


    itemsContainer.innerHTML = '';
    var total = 0;


    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemPrice = Number(item.price) || 0;
        var itemQty = Number(item.qty) || 1;
        var itemTotal = itemPrice * itemQty;
        total += itemTotal;


        var wrapper = document.createElement('div');
        wrapper.className = 'cart-item d-flex align-items-center justify-content-between py-3 border-bottom';


        var imgHtml = '';
        if (item.image) {
            imgHtml =
                '<img src="' + item.image + '" alt="' + (item.name || '') +
                '" class="me-3 cart-item-image" width="80">';
        }


        wrapper.innerHTML =
            '<div class="d-flex align-items-center">' +
                imgHtml +
                '<div>' +
                    '<div class="cart-item-name fw-bold">' + (item.name || 'Товар') + '</div>' +
                    '<div class="cart-item-price">Ціна: ' + itemPrice.toFixed(2) + ' грн</div>' +
                    '<div class="cart-item-qty">Кількість: ' + itemQty + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="text-end">' +
                '<div class="cart-item-total fw-semibold">' + itemTotal.toFixed(2) + ' грн</div>' +
                '<button type="button" class="btn btn-sm btn-outline-danger cart-item-remove" ' +
                    'data-id="' + item.id + '">Видалити</button>' +
            '</div>';


        itemsContainer.appendChild(wrapper);
    }


    totalElement.textContent = total.toFixed(2);


    var removeButtons = itemsContainer.querySelectorAll('.cart-item-remove');


    for (var j = 0; j < removeButtons.length; j++) {
        removeButtons[j].addEventListener('click', function () {
            var id = this.getAttribute('data-id');
            removeFromCart(id);
        });
    }


    function removeFromCart(id) {
        for (var k = 0; k < cart.length; k++) {
            if (cart[k].id === id) {
                cart.splice(k, 1);
                break;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
    }
});
