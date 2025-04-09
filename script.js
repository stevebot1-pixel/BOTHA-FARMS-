let cart = [];

function addToCart(product, price) {
    let item = { product, price, quantity: 1 };
    let existingItem = cart.find(i => i.product === product);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    updateCart();
}

function updateCart() {
    let cartTable = document.getElementById("cart-items");
    let totalPrice = 0;
    cartTable.innerHTML = "";

    cart.forEach((item, index) => {
        let total = item.price * item.quantity;
        totalPrice += total;

        cartTable.innerHTML += `
            <tr>
                <td>${item.product}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${total.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
    });

    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

window.onload = function() {
    let savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
};

window.onbeforeunload = function() {
    localStorage.setItem("cart", JSON.stringify(cart));
};

<script>
  document.getElementById("checkout-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Order placed successfully! Thank you for shopping 🛒");
  });
</script>
