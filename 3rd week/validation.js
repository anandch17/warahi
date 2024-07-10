document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!registerForm.checkValidity()) {
                e.stopPropagation();
                registerForm.classList.add("was-validated");
                return;
            }
            const username = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            
            
            localStorage.setItem("user", JSON.stringify({ username, email, password }));
            console.log("Registered:", { username, email, password });
            alert("Registration successful!");
        });
    }

    
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!loginForm.checkValidity()) {
                e.stopPropagation();
                loginForm.classList.add("was-validated");
                return;
            }
            const username = e.target.username.value;
            const password = e.target.password.value;
            
           
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.username === username && storedUser.password === password) {
                console.log("Logged in:", { username, password });
                alert("Login successful!");
            } else {
                alert("Invalid username or password!");
            }
        });
    }

    
    const productItems = document.querySelectorAll(".product-item button");
    productItems.forEach(button => {
        button.addEventListener("click", (e) => {
            const product = e.target.closest(".product-item");
            const productName = product.querySelector(".card-title").textContent;
            const productPrice = product.querySelector(".card-text").textContent;
            
            addToCart(productName, productPrice);
        });
    });

   
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const cartItem = e.target.closest(".cart-item");
            removeFromCart(cartItem);
        }
    });

  
    loadCartItems();

    function addToCart(name, price) {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push({ name, price });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayCartItem(name, price);

        console.log(`Added to cart: ${name} - ${price}`);
    }

   
    function removeFromCart(cartItem) {
        const name = cartItem.querySelector(".card-title").textContent;
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems = cartItems.filter(item => item.name !== name);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        cartItem.remove();

        console.log("Item removed from cart:", name);
    }

   
    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.forEach(item => {
            displayCartItem(item.name, item.price);
        });
    }

    
    function displayCartItem(name, price) {
        const cartItemsContainer = document.querySelector(".cart-items");
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item", "card", "mb-2");
        cartItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${price}</p>
                <button class="btn btn-danger btn-sm">Remove</button>
            </div>
        `;
        
        
        cartItemsContainer.appendChild(cartItem);
    }
});
