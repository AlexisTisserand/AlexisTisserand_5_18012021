//Fonction displayCart() qui permet d'afficher sur la page cart.html le panier de l'ensemble des produits choisis
function displayCart () {
    //Récupération de toutes les données nécessaires
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    let productDiv = document.querySelector(".product")
    let cartCost = localStorage.getItem('totalCost')
    let totalBasket = document.getElementById("total-basket")
    let productNumbers = localStorage.getItem('cartNumbers');   
    productNumbers = parseInt(productNumbers)

    //si cartItems et productDiv existent alors productDiv s'affiche de manière dynamique avec toutes les caractéristiques des produits choisis
    if (cartItems && productDiv) {

        //Vide ces deux divisions pour rajouter les valeurs de façon dynamiques sans rafraichir la page
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

//Modifie la quantité de produits sur la page panier
function modifyQuantity () {
    
    let removeProduct = document.querySelectorAll(".remove-product")
    let addProduct = document.querySelectorAll('.add-product')
    let quantity = document.getElementsByClassName('change-quantity')
    let deleteProduct = document.getElementsByClassName('delete-product')
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)     
    let productNumbers = localStorage.getItem('cartNumbers');  
    productNumbers = parseInt(productNumbers)          
    let cartCost = localStorage.getItem('totalCost')
    cartCost = parseInt(cartCost)
        
    //Augmenter quantité
    for (let i = 0; i < addProduct.length; i++) {
        //À chaque click sur "add-product", rajoute 1 à inCart du produit choisi ainsi qu'à productNumbers et rajoute le prix du produit dans totalCost. Stocke ensuite les nouvelles valeurs de cartItems, productNumbers et totalCost dans le localStorage afin de bien récupérer les données nécessaires pour les autres fonctions.
        addProduct[i].addEventListener('click', (e) => {

            // si l'événement n'est pas traité explicitement, son action par défaut n'est pas être prise en compte comme elle le serait normalement. L'événement continue à se propager comme d'habitude.
            e.preventDefault();

            let PRODUCT = Object.values(cartItems)[i]

            PRODUCT["inCart"] +=  1;
            localStorage.setItem("productsInCart", JSON.stringify(cartItems))            
            localStorage.setItem('cartNumbers', productNumbers + 1)           
            localStorage.setItem("totalCost", cartCost + PRODUCT["price"])

            //Rajoute de manière dynamique dans le HTML +1 à la div "change quantity"
            quantity[i].innerHTML ++

            //Appelle la fonction displayCart() à chaque modification de panier ce qui permet de ne pas rafraichir la page.
            displayCart()

        })
    }

    //Réduire quantité
    for (let i = 0; i < removeProduct.length; i++) {
         //À chaque click sur "remove-product", enlève 1 à inCart du produit choisi ainsi qu'à productNumbers et soustrait le prix du produit dans totalCost. Stocke ensuite les nouvelles valeurs de cartItems, productNumbers et totalCost dans le localStorage afin de bien récupérer les données nécessaires pour les autres fonctions.
        removeProduct[i].addEventListener('click', (e) => {

            e.preventDefault();            
            let PRODUCT = Object.values(cartItems)[i]

            //Condition qui permet de ne pas avoir de valeurs négatives dans le panier et qui oblige l'utilisateur à avoir au minimum 1 article dans le panier du produit qu'il a choisi. S'il désire le supprimer complètement il doit cliquer sur le bouton "Supprimer" à côté de la modification de quantité
            if(PRODUCT["inCart"] > 1) {            

                PRODUCT["inCart"] -=  1;

                localStorage.setItem("productsInCart", JSON.stringify(cartItems))              
                localStorage.setItem('cartNumbers', productNumbers - 1)
                localStorage.setItem("totalCost", cartCost - PRODUCT["price"])

                //Rajoute de manière dynamique dans le HTML -1 à la div "change quantity"
                quantity[i].innerHTML --

                //Appelle la fonction displayCart() à chaque modification de panier ce qui permet de ne pas rafraichir la page
                displayCart()

            }
        })
    }

    //Supprimer la ligne du produit choisi
    for (let i = 0; i < deleteProduct.length; i++) {

        //Au click sur "Supprimer", retire les valeurs de inCart du produit choisi, son prix total ainsi que sa présence dans productNumbers du localStorage. Stocke ensuite les nouvelles valeurs dans le localStorage avec les valeurs du produit supprimé en moins
        deleteProduct[i].addEventListener('click', (e) => {

            e.preventDefault();
            
            let PRODUCT = Object.values(cartItems)[i] //Renvoie un tableau des valeurs de cartItems et surtout du produit choisi
            
            localStorage.setItem("totalCost", cartCost - (PRODUCT["inCart"] * PRODUCT["price"]))   
            localStorage.setItem('cartNumbers', productNumbers - PRODUCT["inCart"])

            PRODUCT["inCart"] = 0
            localStorage.setItem("productsInCart", JSON.stringify(cartItems))

            // Retire complètement la propriété de l'objet choisi
            delete cartItems[Object.keys(cartItems)[i]] 

            localStorage.setItem("productsInCart", JSON.stringify(Object.values(cartItems)))

            displayCart()

            //Si l'utisateur clique sur "Supprimer" alors qu'il ne reste qu'un seul produit dans le panier, appelle la fonction clearBasket() qui efface alors le panier entièrement et qui affiche un nouveau bouton de retour à l'accueil. 
            clearBasket()
            
        })
    }
}

 //Permet de conserver les valeurs du panier sur chaque page lorsqu'on met à jour la page
function onLoadCartnumbers () {

    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.getElementsByClassName('quantity').textContent = productNumbers;
        
    }
}

//fonction qui efface le panier au click sur le bouton et affiche un nouveau bouton de retour à l'accueil. S'il existe des valeurs dans le localStorage alors effectue un localStorage.clear() et affiche le nouveau bouton retour accueil
function clearBasket () {
    let productsNumber = localStorage.getItem("cartNumbers");
    productsNumber = parseInt(productsNumber)
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
        let shoppingCartFooter = document.getElementById("cart-footer")
        shoppingCartFooter.style.justifyContent = "center"
        let linkButton = document.getElementById("link-btn")
        linkButton.href = "index.html"
        form.style.display = "none"
        total.style.display="none"
        label.style.display = "none"
    }
}

//mise en place méthode fetch POST qui envoie des données au serveur
//Les valeurs des données envoyées sont formatées selon un format qui était donné dans la documentation fournie. Si les données sont valides alors la page confirmation.html s'ouvre avec un récapitulatif de commande. Ce dernier comprend l'orderId, le nom, prénom, adresse, ville et email de l'acheteur. 
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
            
            window.location = "/confirmation.html"

            let contact = {
                firstName: datas.contact.firstName,
                lastName: datas.contact.lastName,
                address: datas.contact.address,
                city: datas.contact.city,
                email: datas.contact.email,
            }
            contact = JSON.stringify(contact)
            let cartCost = localStorage.getItem('totalCost')
            cartCost = parseInt(cartCost)

            //Stocke les données acheteur dans le localStorage
            localStorage.setItem("orderId", datas.orderId)
            localStorage.setItem("contact", contact)
        })

    })
}

onLoadCartnumbers();
displayCart();
clearBasket();
post();

