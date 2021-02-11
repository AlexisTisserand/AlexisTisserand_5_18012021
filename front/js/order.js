function displayCart () {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector(".product-container")
    let cartCost = localStorage.getItem('totalCost')
    let totalBasket = document.getElementById("total-basket")

    //check si cartItems existe
    if (cartItems && productContainer) {
        
        Object.values(cartItems).forEach((product) => {

            productContainer.innerHTML += 
            `
            <div class="product">
                <div class="product-image">
                    <img src="${product.imageUrl}">
                </div>
                <div class="product-details">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
                <div class="price">${(product.price) / 100 + ".00"}</div>
                <div class="product-quantity">
                    <span class="remove-product"><i class="fas fa-minus-circle"></i></span>
                    <span class="change-quantity">${product.inCart}</span>
                    <span class="add-product"><i class="fas fa-plus-circle"></i></span>
                </div>
                <div class="product-removal">
                    <span class="delete-product">Supprimer</span>
                </div>
                <div class="total-product-price">${(product.inCart * product.price) / 100 + ".00"}</div>
            </div>
            
            `       
        })

        modifyQuantity();
        
        totalBasket.innerHTML += 
            `
            <div class="totals">
                <div class="totals-item">
                    <label>Sous-total</label>
                    <div class="totals-value cart-subtotal">${(cartCost) / 100 + ".00"}</div>
                </div>
                <div class="totals-item">
                    <label>Livraison</label>
                    <div class="totals-value" id="cart-shipping">4.99</div>
                </div>
                <div class="totals-item totals-item-total">
                    <label>Total</label>
                    <div class="totals-value cart-total">${(((cartCost) / 100) + 4.99)}</div>
                </div>
            </div>
                <button class="checkout">Checkout</button>
            `          
    }
}


onLoadCartnumbers();
displayCart();

//Modifie la quantité de produits sur la page panier
function modifyQuantity () {
    
    let removeProduct = document.querySelectorAll(".remove-product")
    let addProduct = document.querySelectorAll('.add-product')
    let quantity = document.getElementsByClassName('change-quantity')
    let deleteProduct = document.getElementsByClassName('delete-product')
        
    //Augmenter quantité
    for (let i = 0; i < addProduct.length; i++) {

        addProduct[i].addEventListener('click', (e) => {

            e.preventDefault();

            let cartItems = localStorage.getItem("productsInCart");
            cartItems = JSON.parse(cartItems)     

            const PRODUCT = Object.values(cartItems)[i]

            PRODUCT["inCart"] +=  1;

            localStorage.setItem("productsInCart", JSON.stringify(cartItems))
            
            let productNumbers = localStorage.getItem('cartNumbers');  
            productNumbers = parseInt(productNumbers)          
            localStorage.setItem('cartNumbers', productNumbers + 1)

            let cartCost = localStorage.getItem('totalCost')
            cartCost = parseInt(cartCost)
            localStorage.setItem("totalCost", cartCost + PRODUCT["price"])

            quantity[i].innerHTML ++
            
            document.location.reload();
        })
    }

    //Réduire quantité
    for (let i = 0; i < removeProduct.length; i++) {
        removeProduct[i].addEventListener('click', (e) => {

            e.preventDefault();

            let cartItems = localStorage.getItem("productsInCart");
            cartItems = JSON.parse(cartItems)     
            const PRODUCT = Object.values(cartItems)[i]

            if(PRODUCT["inCart"] > 1) {            

                PRODUCT["inCart"] -=  1;

                localStorage.setItem("productsInCart", JSON.stringify(cartItems))
                
                let productNumbers = localStorage.getItem('cartNumbers');  
                productNumbers = parseInt(productNumbers)          
                localStorage.setItem('cartNumbers', productNumbers - 1)

                let cartCost = localStorage.getItem('totalCost')
                cartCost = parseInt(cartCost)
                localStorage.setItem("totalCost", cartCost - PRODUCT["price"])

                quantity[i].innerHTML --
                
                document.location.reload();
            }
        })
    }

    //Supprimer la ligne du produit choisi
    for (let i = 0; i < deleteProduct.length; i++) {
        deleteProduct[i].addEventListener('click', (e) => {

            e.preventDefault();

            let cartItems = localStorage.getItem("productsInCart");
            cartItems = JSON.parse(cartItems)

            

            localStorage.setItem("productsInCart", JSON.stringify(Object.values(cartItems)))

            const PRODUCT = Object.values(cartItems)[i] //Renvoie un tableau des valeurs de cartItems et surtout du produit choisi

            console.log("Vous avez retiré du panier : ", PRODUCT);



            let productNumbers = localStorage.getItem('cartNumbers');  
            productNumbers = parseInt(productNumbers)          
            localStorage.setItem('cartNumbers', productNumbers - PRODUCT["inCart"])

            let cartCost = localStorage.getItem('totalCost')
            cartCost = parseInt(cartCost)
            localStorage.setItem("totalCost", cartCost - ( PRODUCT["inCart"] * PRODUCT["price"]))

            PRODUCT["inCart"] = 0

            localStorage.setItem("productsInCart", JSON.stringify(cartItems))

            e.currentTarget.parentNode.parentNode.remove();

           // document.location.reload();
        
        })
    }
}

 //Quand on recharge la page le panier reste à jour
function onLoadCartnumbers () {

    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.getElementsByClassName('quantity').textContent = productNumbers;
        
    }
}


//fonction qui efface le panier au click sur le bouton
let cartItems = localStorage.getItem("productsInCart");
let deleteProductsButton = document.getElementById("btn-delete")

if(cartItems != null) {
    deleteProductsButton.innerHTML = "Effacer votre panier"
    deleteProductsButton.addEventListener('click', () => {
        deleteItems();
        document.location.reload();
    })
} else {
    deleteProductsButton.innerHTML = "Votre panier est vide ! Cliquez ici pour retourner à vos achats"
    let linkButton = document.getElementById("link-btn")
    linkButton.href = "index.html"
}

function deleteItems() {
    // Clear localStorage items 
    localStorage.clear();
}


