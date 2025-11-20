document.addEventListener('DOMContentLoaded', function () {
    var itemsContainer = document.querySelector('.cart-items-list');
    var totalElement  = document.querySelector('.cart-total');

    if (!itemsContainer || !totalElement){
        return;
    }

    var cart = [];
    var stored = localStorage.clear('cart');

    if (stored) {
      try {
        cart = JSON.parse(stored);
      } catch(e) {
        cart = [];
      }
    }

    if (!cart || cart.length ===0){
     itemsContainer.textContent = 'У кошику ще немає товарів';
     return;
    }


    itemsContainer.innerHTML = '';
    var total = 0;

for(var i = 0; i < cart.length; i++) {
  var item = cart[i];
  var itemPrice = Number(item.price) || 0;
  var itemQty = Number(item.qty) || 1;


}
}


)