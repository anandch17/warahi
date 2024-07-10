

document.addEventListener("DOMContentLoaded", () => {
    // Handle registration form submission
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            
            // Perform registration logic (e.g., send data to server)
            console.log("Registered:", { username, email, password });
            alert("Registration successful!");
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            
            // Perform login logic (e.g., send data to server)
            console.log("Logged in:", { username, password });
            alert("Login successful!");
        });
    }

    // Handle adding items to cart
    const productItems = document.querySelectorAll(".product-item button");
    productItems.forEach(button => {
        button.addEventListener("click", (e) => {
            const product = e.target.closest(".product-item");
            const productName = product.querySelector("h2").textContent;
            const productPrice = product.querySelector("p").textContent;
            
            addToCart(productName, productPrice);
        });
    });

    // Handle removing items from cart
    const cartItems = document.querySelectorAll(".cart-item button");
    cartItems.forEach(button => {
        button.addEventListener("click", (e) => {
            const cartItem = e.target.closest(".cart-item");
            removeFromCart(cartItem);
        });
    });

    // Add item to cart
    function addToCart(name, price) {
        const cartItemsContainer = document.querySelector(".cart-items");
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <h2>${name}</h2>
            <p>${price}</p>
            <button>Remove</button>
        `;
        
        // Append the new item to the cart
        cartItemsContainer.appendChild(cartItem);

        // Add event listener to the remove button of the new item
        cartItem.querySelector("button").addEventListener("click", (e) => {
            removeFromCart(cartItem);
        });

        console.log(`Added to cart: ${name} - ${price}`);
    }

    // Remove item from cart
    function removeFromCart(cartItem) {
        cartItem.remove();
        console.log("Item removed from cart");
    }
});
