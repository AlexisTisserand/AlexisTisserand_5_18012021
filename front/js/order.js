 //check s'il existe un product dans localstorage
function displayCart() {

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    const productContainer = document.querySelector("#products")
    let cartCost = localStorage.getItem('totalCost')
    let totalBasket = document.getElementById("total-basket")

    if(cartItems) {

        Object.values(cartItems).forEach(product => {
            console.log(product.inCart);
            productContainer.innerHTML += 
            `
            <div id="product-teddy" class="product">
                <div class="product-image">
                    <img src="${product.imageUrl}">
                </div>
                <div class="product-details">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
                <div class="product-price">${(product.price) / 100 + ".00"}</div>
                <div class="product-quantity">
                    <i id="remove-product" class="fas fa-minus-circle"></i>
                    <span id="addPriceOrRemove">${product.inCart}</span>
                    <i id="add-product" class="fas fa-plus-circle"></i>
                    
                </div>
                <div class="product-removal">
                    <button class="remove-product">Supprimer</button>
                </div>
                <div id="product-line-price">${(product.inCart * product.price) / 100 + ".00"}</div>
            </div>
            
            `           

            
            /*let addProduct = document.getElementById("add-product");
            let removeProduct = document.getElementById("remove-product");
            
            //Ajoute un produit au clic quand on est sur la page panier
            function add() {

                addProduct.addEventListener('click', () => { 
                
                    let productNumbers = localStorage.getItem('cartNumbers');
                    productNumbers = parseInt(productNumbers)
    
                    if(productNumbers >= 0) {
    
                        productNumbers = parseInt(productNumbers)
                        localStorage.setItem('cartNumbers', productNumbers + 1)
    
                        let cartCost = localStorage.getItem('totalCost')
                        cartCost = parseInt(cartCost)
                        localStorage.setItem("totalCost", cartCost + product.price);
                        addPriceOrRemove.innerHTML = productNumbers + 1
    
                        let totalPriceProducts = document.querySelector("#product-line-price")
                        totalPriceProducts.innerHTML = (cartCost + product.price) / 100 + ".00€"

                        document.location.reload()
    
                    }
                    
                })

            }
            
            //Enlève un produit au clic quand on est sur la page panier
            function remove () {
                removeProduct.addEventListener('click', () => {
                    let productNumbers = localStorage.getItem('cartNumbers');
                    if(productNumbers > 0) {
    
                        productNumbers = parseInt(productNumbers)
                        localStorage.setItem('cartNumbers', productNumbers - 1)
    
                        let cartCost = localStorage.getItem('totalCost')
                        cartCost = parseInt(cartCost)
                        localStorage.setItem("totalCost", cartCost - product.price);
                        addPriceOrRemove.innerHTML = productNumbers - 1
    
                        let totalPriceProducts = document.querySelector("#product-line-price")
                        totalPriceProducts.innerHTML = (cartCost - product.price) / 100 + ".00€"

                        document.location.reload()
                    }                        
                    
                })
            }

            remove();
            add()
            

           

            //Quand on recharge la page le panier reste à jour
            function onLoadCartnumbers () {
                let productNumbers = localStorage.getItem('cartNumbers');
                
                if(productNumbers) {
                    document.getElementById('addPriceOrRemove').textContent = productNumbers;
                    document.getElementById('product-line-price').textContent = ((productNumbers * product.price) / 100) + ".00€";
                }
            }
        
            onLoadCartnumbers()*/

        })

        totalBasket.innerHTML += 
            `
            <div class="totals">
                <div class="totals-item">
                    <label>Sous-total</label>
                    <div class="totals-value" id="cart-subtotal">${(cartCost) / 100 + ".00"}</div>
                </div>
                <div class="totals-item">
                    <label>Livraison</label>
                    <div class="totals-value" id="cart-shipping">4.99</div>
                </div>
                <div class="totals-item totals-item-total">
                    <label>Total</label>
                    <div class="totals-value" id="cart-total">${(((cartCost) / 100) + 4.99)}</div>
                </div>
            </div>
                <button class="checkout">Checkout</button>
            `     
            
    }
}

displayCart()


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





