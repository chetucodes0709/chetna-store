/* =========================================
   CHETNASTORE
   COMPLETE SCRIPT.JS
========================================= */


/* =========================================
   PRODUCT DATA
========================================= */

const products = [

    {
        id: 1,
        name: "Classic White T-Shirt",
        category: "Fashion",
        price: 699,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 2,
        name: "Denim Jacket",
        category: "Fashion",
        price: 1499,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "Fashion",
        price: 1899,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 4,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 5,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2199,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 6,
        name: "Modern Laptop",
        category: "Electronics",
        price: 45999,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 7,
        name: "Everyday Backpack",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 8,
        name: "Classic Sunglasses",
        category: "Accessories",
        price: 799,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85"
    }

];


/* =========================================
   GET HTML ELEMENTS
========================================= */

const productGrid = document.getElementById("productGrid");

const categoryFilter = document.getElementById("categoryFilter");

const sortProducts = document.getElementById("sortProducts");

const searchBtn = document.getElementById("searchBtn");

const searchSection = document.getElementById("searchSection");

const searchForm = document.getElementById("searchForm");

const searchInput = document.getElementById("searchInput");

const categoryCards = document.querySelectorAll(".category-card");

const menuBtn = document.getElementById("menuBtn");

const nav = document.getElementById("nav");

const cartBtn = document.getElementById("cartBtn");

const cartSidebar = document.getElementById("cartSidebar");

const closeCart = document.getElementById("closeCart");

const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const emptyCart = document.getElementById("emptyCart");

const checkoutBtn = document.getElementById("checkoutBtn");

const noProducts = document.getElementById("noProducts");

const contactForm = document.getElementById("contactForm");


/* =========================================
   CART
========================================= */

let cart = JSON.parse(
    localStorage.getItem("chetnaStoreCart")
) || [];


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts(list) {

    productGrid.innerHTML = "";

    if (list.length === 0) {

        noProducts.hidden = false;

        return;

    }

    noProducts.hidden = true;


    list.forEach(function(product) {

        const productCard = document.createElement("article");

        productCard.className = "product-card";

        productCard.dataset.category = product.category;


        productCard.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>


                <h3 class="product-title">
                    ${product.name}
                </h3>


                <p class="product-description">
                    Quality product for everyday use.
                </p>


                <div class="product-bottom">

                    <strong class="product-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </strong>


                    <button
                        type="button"
                        class="add-cart-btn"
                        data-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(productCard);

    });

}


/* =========================================
   INITIAL PRODUCTS
========================================= */

displayProducts(products);


/* =========================================
   FILTER PRODUCTS
========================================= */

function filterProducts() {

    const selectedCategory = categoryFilter.value;

    const searchText = searchInput.value
        .trim()
        .toLowerCase();


    let filteredProducts = products.filter(function(product) {

        const categoryMatch =
            selectedCategory === "All" ||
            product.category === selectedCategory;


        const searchMatch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);


        return categoryMatch && searchMatch;

    });


    /* SORT */

    const sortValue = sortProducts.value;


    if (sortValue === "low-high") {

        filteredProducts.sort(function(a, b) {
            return a.price - b.price;
        });

    }


    if (sortValue === "high-low") {

        filteredProducts.sort(function(a, b) {
            return b.price - a.price;
        });

    }


    if (sortValue === "name") {

        filteredProducts.sort(function(a, b) {

            return a.name.localeCompare(b.name);

        });

    }


    displayProducts(filteredProducts);

}


/* =========================================
   CATEGORY FILTER
========================================= */

categoryFilter.addEventListener(
    "change",
    filterProducts
);


/* =========================================
   SORT
========================================= */

sortProducts.addEventListener(
    "change",
    filterProducts
);


/* =========================================
   SEARCH BUTTON
========================================= */

searchBtn.addEventListener("click", function() {

    searchSection.classList.toggle("active");

    if (searchSection.classList.contains("active")) {

        searchInput.focus();

    }

});


/* =========================================
   SEARCH FORM
========================================= */

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    filterProducts();

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================================
   LIVE SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    filterProducts
);


/* =========================================
   CATEGORY CARDS
========================================= */

categoryCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const category = card.dataset.category;


        categoryFilter.value = category;


        filterProducts();


        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener("click", function() {

    nav.classList.toggle("active");

});


/* CLOSE MOBILE MENU AFTER CLICK */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        nav.classList.remove("active");

    });

});


/* =========================================
   OPEN CART
========================================= */

cartBtn.addEventListener("click", function() {

    openCart();

});


function openCart() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

    cartSidebar.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================================
   CLOSE CART
========================================= */

closeCart.addEventListener("click", function() {

    closeCartSidebar();

});


cartOverlay.addEventListener("click", function() {

    closeCartSidebar();

});


function closeCartSidebar() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

    cartSidebar.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================
   ADD TO CART
========================================= */

productGrid.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(".add-cart-btn");


        if (!button) {
            return;
        }


        const productId =
            Number(button.dataset.id);


        addToCart(productId);

    }
);


/* =========================================
   ADD PRODUCT
========================================= */

function addToCart(productId) {

    const product =
        products.find(function(item) {

            return item.id === productId;

        });


    if (!product) {
        return;
    }


    const existingItem =
        cart.find(function(item) {

            return item.id === productId;

        });


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            category: product.category,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    openCart();

}


/* =========================================
   REMOVE FROM CART
========================================= */

cartItems.addEventListener(
    "click",
    function(event) {

        const removeButton =
            event.target.closest(
                ".remove-cart-item"
            );


        if (!removeButton) {
            return;
        }


        const productId =
            Number(removeButton.dataset.id);


        cart = cart.filter(function(item) {

            return item.id !== productId;

        });


        saveCart();

        updateCart();

    }
);


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItems.innerHTML = "";


    let totalItems = 0;

    let totalPrice = 0;


    if (cart.length === 0) {

        emptyCart.style.display = "block";

    } else {

        emptyCart.style.display = "none";

    }


    cart.forEach(function(item) {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                    × ${item.quantity}
                </p>

            </div>


            <button
                type="button"
                class="remove-cart-item"
                data-id="${item.id}"
                aria-label="Remove ${item.name}"
            >
                ×
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = totalItems;


    cartTotal.textContent =
        "₹" + totalPrice.toLocaleString("en-IN");

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "chetnaStoreCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   INITIAL CART
========================================= */

updateCart();


/* =========================================
   CHECKOUT
========================================= */

checkoutBtn.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a product first."
            );

            return;

        }


        alert(
            "Checkout feature is ready for integration."
        );

    }
);


/* =========================================
   CONTACT FORM
========================================= */

contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document
                .getElementById("contactName")
                .value
                .trim();


        if (!name) {

            alert("Please enter your name.");

            return;

        }


        alert(
            "Thank you, " +
            name +
            "! Your message has been received."
        );


        contactForm.reset();

    }
);


/* =========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener(
    "click",
    function(event) {

        const clickedInsideNav =
            nav.contains(event.target);


        const clickedMenuButton =
            menuBtn.contains(event.target);


        if (
            !clickedInsideNav &&
            !clickedMenuButton
        ) {

            nav.classList.remove("active");

        }

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            nav.classList.remove("active");

            closeCartSidebar();

        }

    }
);