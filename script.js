document.addEventListener('DOMContentLoaded', function () {


    // ===== ТЕМНА ТЕМА (сердечко) =====
    var loveInput = document.querySelector('.love input');
    if (loveInput) {
        loveInput.addEventListener('change', function () {
            document.body.classList.toggle('dark-theme', this.checked);
        });
    }


    // ===== ПЕРЕХІД У КОШИК ПО КНОПЦІ 🛒 =====
    var cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function () {
            // якщо ми вже на cart.html - нікуди не йдемо
            if (window.location.pathname.indexOf('cart.html') === -1) {
                window.location.href = 'cart.html';
            }
        });
    }


    // ===== ЛІЧИЛЬНИК БІЛЯ КОШИКА =====
    var counterEl = document.querySelector('.cart-counter');
    updateCartCounter();


    // ===== КНОПКА "Add To Basket" НА СТОРІНЦІ ТОВАРУ =====
    var addBtn = document.querySelector('.add-to-basket');
    if (addBtn) {
        addBtn.addEventListener('click', function () {
            var product = {
                id: this.getAttribute('data-id'),
                name: this.getAttribute('data-name'),
                price: Number(this.getAttribute('data-price')),
                image: this.getAttribute('data-image'),
                qty: 1
            };


            var cart = getCart();


            var found = false;
            var i;
            for (i = 0; i < cart.length; i++) {
                if (cart[i].id === product.id) {
                    cart[i].qty += 1;
                    found = true;
                    break;
                }
            }
            if (!found) {
                cart.push(product);
            }


            saveCart(cart);
            updateCartCounter();
            alert('Товар додано в кошик!');
        });
    }


    // ===== ДОПОМІЖНІ ФУНКЦІЇ ДЛЯ КОШИКА =====


    function getCart() {
        var stored = localStorage.getItem('cart');
        if (!stored) {
            return [];
        }
        try {
            var parsed = JSON.parse(stored);
            if (!parsed) {
                return [];
            }
            return parsed;
        } catch (e) {
            return [];
        }
    }


    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }


    function updateCartCounter() {
        if (!counterEl) {
            return;
        }
        var cart = getCart();
        var count = 0;
        var i;
        for (i = 0; i < cart.length; i++) {
            count += Number(cart[i].qty) || 0;
        }
        counterEl.textContent = count;
    }
});





