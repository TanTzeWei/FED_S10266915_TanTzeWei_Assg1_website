document.addEventListener("DOMContentLoaded", () => {
    const promoClickBtn = document.getElementById("promo-click");
    const modal = document.getElementById("sign-in-modal");
    const openModalBtn = document.getElementById("open-modal");
    const closeModalBtn = document.getElementById("close-modal");

    // Show promo code popup
    if (promoClickBtn) {
        promoClickBtn.addEventListener("click", () => {
            alert("Your promo code is: NEWUSERPROMO");
        });
    }
    if (openModalBtn){
        openModalBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent link default behavior
        modal.style.display = "flex"; 
    });
    }
    if (closeModalBtn){
        closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    }  

    // Cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(productId, productName, productPrice, productImage, productSize) {
        console.log(`Adding to cart: ${productName} (ID: ${productId}, Price: ${productPrice}, Image: ${productImage}, Size: ${productSize})`);
        const existingItem = cart.find(item => item.id === productId && item.size === productSize);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, image: productImage, size: productSize, quantity: 1 });
        }
        saveCart();
        updateCart();
    }

    function removeFromCart(productId, productSize) {
        console.log(`Removing from cart: ID ${productId}, Size: ${productSize}`);
        cart = cart.filter(item => !(item.id === productId && item.size === productSize));
        saveCart();
        updateCart();
    }

    function updateQuantity(productId, productSize, quantity) {
        console.log(`Updating quantity: ID ${productId}, Size: ${productSize}, Quantity: ${quantity}`);
        const item = cart.find(item => item.id === productId && item.size === productSize);
        if (item) {
            item.quantity = parseInt(quantity, 10);
            if (item.quantity <= 0) {
                removeFromCart(productId, productSize);
            } else {
                saveCart();
                updateCart();
            }
        }
    }

    function updateCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotalElement = document.getElementById("cart-total");

        if (!cartItemsContainer || !cartTotalElement) return;

        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            if (typeof item.price !== 'number' || isNaN(item.price)) {
                console.error(`Invalid price for item: ${item.name}`);
                return;
            }
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <span>${item.name} (Size: ${item.size})</span>
                    <span>$${item.price.toFixed(2)}</span>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}" data-size="${item.size}">
                    <button class="remove-btn" data-id="${item.id}" data-size="${item.size}">Remove</button>
                </div>
                <div class="cart-item-total">
                    $${itemTotal.toFixed(2)}
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalElement.textContent = `$${total.toFixed(2)}`;

        // Add event listeners for quantity inputs and remove buttons
        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("change", (e) => {
                const productId = e.target.dataset.id;
                const productSize = e.target.dataset.size;
                const quantity = e.target.value;
                updateQuantity(productId, productSize, quantity);
            });
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const productId = e.target.dataset.id;
                const productSize = e.target.dataset.size;
                removeFromCart(productId, productSize);
            });
        });
    }

    // Load cart from local storage on page load
    if (document.getElementById("cart-items") && document.getElementById("cart-total")) {
        updateCart();
    }

    // Add to cart button click event
    document.querySelectorAll(".btn-add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const product = button.closest('.product');
            const productId = button.dataset.id;
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(product.querySelector('.product-price').innerText.replace('Price:$', ''));
            const productImage = button.dataset.image;
            const productSize = product.querySelector('select').value;

            if (!productSize) {
                alert('Please select a size before adding to the cart.');
                return;
            }

            console.log(`Button clicked: ${productName} (ID: ${productId}, Price: ${productPrice}, Image: ${productImage}, Size: ${productSize})`);
            addToCart(productId, productName, productPrice, productImage, productSize);
        });
    });
    const colorFilter = document.getElementById("color-filter");
    if (colorFilter) {
        colorFilter.addEventListener("change", () => {
            const selectedColor = colorFilter.value;
            document.querySelectorAll(".product").forEach(product => {
                if (selectedColor === "all" || product.dataset.color === selectedColor) {
                    product.style.display = "flex";
                    product.style.flexDirection = "column";
                } else {
                    product.style.display = "none";
                }
            });
        });
    }

    // Add gift card to cart
    const addGiftCardBtn = document.getElementById("add-gift-card");
    if (addGiftCardBtn) {
        addGiftCardBtn.addEventListener("click", () => {
            const productId = "gift-card";
            const productName = "Gift Card";
            const giftCardValueElement = document.getElementById("gift-card-value");
            const productPrice = parseFloat(giftCardValueElement.value);
            if (isNaN(productPrice) || productPrice <= 0) {
                alert('Please select a valid gift card value.');
                return;
            }
            const productImage = "images/gift-card.jpg"; // Update with the correct image path
            const productSize = ""; // No size for gift card

            console.log(`Button clicked: ${productName} (ID: ${productId}, Price: ${productPrice})`);
            addToCart(productId, productName, productPrice, productImage, productSize);
        });
    }
});


