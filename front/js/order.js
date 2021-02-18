function displayCart () {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    let productDiv = document.querySelector(".product")
    let cartCost = localStorage.getItem('totalCost')
    let totalBasket = document.getElementById("total-basket")
    let productNumbers = localStorage.getItem('cartNumbers');   
    productNumbers = parseInt(productNumbers)
        

    //check si cartItems existe
    if (cartItems && productDiv) {

        productDiv.innerHTML = ""

        totalBasket.innerHTML = ""
        
        Object.values(cartItems).forEach((product) => {

            productDiv.innerHTML += 
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
        
        totalBasket.innerHTML += 
            `
            <div class="totals">
                <div class="totals-item">
                    <label>Total :</label>
                    <div class="totals-value cart-total">${(cartCost) / 100 + ".00"}</div>
                </div>
            </div>
            `          

    } 

    modifyQuantity();

}

onLoadCartnumbers();
displayCart();
clearBasket();

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

            displayCart()

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

                displayCart()
                
                //document.location.reload();
            }
        })
    }

    //Supprimer la ligne du produit choisi
    for (let i = 0; i < deleteProduct.length; i++) {
        deleteProduct[i].addEventListener('click', (e) => {

            e.preventDefault();

            let cartItems = localStorage.getItem("productsInCart");           
            cartItems = JSON.parse(cartItems)
            
            let PRODUCT = Object.values(cartItems)[i] //Renvoie un tableau des valeurs de cartItems et surtout du produit choisi

            let cartCost = localStorage.getItem('totalCost')
            cartCost = parseInt(cartCost)
            localStorage.setItem("totalCost", cartCost - ( PRODUCT["inCart"] * PRODUCT["price"]))

            let productNumbers = localStorage.getItem('cartNumbers');  
            productNumbers = parseInt(productNumbers)          
            localStorage.setItem('cartNumbers', productNumbers - PRODUCT["inCart"])

            PRODUCT["inCart"] = 0

            localStorage.setItem("productsInCart", JSON.stringify(cartItems))

            delete cartItems[Object.keys(cartItems)[i]] 

            localStorage.setItem("productsInCart", JSON.stringify(Object.values(cartItems)))

            displayCart()

            clearBasket()
            
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

function clearBasket () {
    //fonction qui efface le panier au click sur le bouton
    let productsNumber = localStorage.getItem("cartNumbers");
    productsNumber = parseInt(productsNumber)
    let cartItems = localStorage.getItem("productsInCart");
    let cartCost = localStorage.getItem("totalCost")
    console.log( productsNumber);
    let deleteProductsButton = document.getElementById("btn-delete")
    let form = document.getElementById("form-order")
    let total = document.getElementById("total-basket")
    let label = document.getElementById("columns")

    if(productsNumber) {
        deleteProductsButton.innerHTML = "Effacer le panier"
        deleteProductsButton.addEventListener("click", () => {
            localStorage.clear()
        })
    } else {
        deleteProductsButton.innerHTML = "Votre panier est vide ! Cliquez ici pour retourner à vos achats"
        let linkButton = document.getElementById("link-btn")
        linkButton.href = "index.html"
        form.style.display = "none"
        total.style.display="none"
        label.style.display = "none"
    }

}

//Fetch POST method

function post() {

    let form = document.getElementById("form")

    form.addEventListener('submit', e => {

        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems)

        console.log(Object.values(cartItems));

        e.preventDefault()

        let firstName = document.getElementById('first-name')
        let lastName = document.getElementById('last-name')
        let address = document.getElementById('address')
        let city = document.getElementById('city')
        let email = document.getElementById('email')

        let array = [];
        for (let i = 0; i < Object.values(cartItems).length; i++) {
            let newArray = Object.values(cartItems)[i]._id;
            array.push(newArray)
        }
        
        //fecth post request

        const url = `http://localhost:3000/api/teddies/order`; 

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                contact: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value
                },
                products: array,
            }),
            headers: {
                "Content-Type" : "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            return response.json()
        })
        .then(datas => {
            console.log(datas);

            window.location = "/confirmation.html"

            let contact = {
                firstName: datas.contact.firstName,
                lastName: datas.contact.lastName,
                address: datas.contact.address,
                city: datas.contact.city,
                email: datas.contact.email,
            }
            contact = JSON.stringify(contact)
            let results = document.getElementById("results")
            let cartCost = localStorage.getItem('totalCost')
            cartCost = parseInt(cartCost)

            localStorage.setItem("orderId", datas.orderId)
            localStorage.setItem("contact", contact)
        })

    })
}

post()

