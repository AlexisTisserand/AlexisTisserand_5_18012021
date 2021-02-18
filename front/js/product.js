import {api} from "./api.js";

let addedToCart = document.querySelector('.addToCart')

//Récupérer l'URL et l'ID produit

const urlActuelle = window.location.href;
const productUrl = new URL(urlActuelle);
const productId = productUrl.searchParams.get("id");


function displayProduct() {
    api.fetchEndPoint(`http://localhost:3000/api/teddies/${productId}`)
        .then(product => {
            try {

                let modal = document.getElementById("myModal");
                let btn = document.getElementById("btn-modal");
                let spanCloseModal = document.getElementsByClassName("close")[0];
                
                //Quand l'utilisateur clicks sur le btn, open modal
                btn.onclick = function() {
                    modal.style.display = "block"
                    let teddyName = document.getElementById("teddy-name-modal")
                    
                    teddyName.innerText = " " + product.name
                }
                //Quand l'utilisateur clicks la span x, close modal
                spanCloseModal.onclick = function () {
                    modal.style.display = "none"
                }
            
                window.onclick = function (event) {
                    if(event.target == modal) {
                        modal.style.display = "none"
                    }
                }

                const productName = document.getElementById('productName');
                const productImage = document.getElementById('productImage');
                const productDescription = document.getElementById('productDescription');
                const productColors = document.getElementById('productColors');
                const productPrice = document.getElementById('productPrice');
                const productId = document.getElementById('productId')


                //MISE EN PLACE SELECT COLOR
                const selectColor = document.getElementById('selectColor');
                
                productColors.appendChild(selectColor);

                const askColor = document.createElement('option')
                askColor.setAttribute("value", "")
                selectColor.appendChild(askColor)
                askColor.innerHTML = "Choisissez une couleur"

                for(let i = 0; i < product.colors.length; i++) {
            
                    let choiceColor = document.createElement('option');
                    choiceColor.setAttribute("value", product.colors[i]);
                    selectColor.appendChild(choiceColor);
                    choiceColor.innerHTML = product.colors[i];
                }

                productName.innerHTML = product.name
                productImage.src = product.imageUrl;
                productPrice.innerText = `${(product.price) / 100 + ".00€"}`; 
                productDescription.innerText = product.description; 
                productId.innerHTML = product._id;

            }

            catch {

                
            }
        })
        .catch((err => console.log('Erreur ' + err)));
}

displayProduct()



//fetch
function addToCart() {
    api.fetchEndPoint(`http://localhost:3000/api/teddies/${productId}`)//créer fonction ajouter au panier
    .then(product => {
        //console.log(product);
        try {

            product.inCart = 0
            
            addedToCart.addEventListener('click', () => {
                cartNumbers(product)
                totalCost(product)

            })
                    
            //Quand on recharge la page le panier reste à jour
            function onLoadCartnumbers () {
                let productNumbers = localStorage.getItem('cartNumbers');
            
                if(productNumbers) {
                    document.querySelector('span').textContent = productNumbers;
                }
            }
            
            //Fonction qui affiche le nombre de produits dans le panier
            function cartNumbers (product) {

                console.log("Le produit envoyé au panier est", product); //Affiche le produit que j'ai choisi
                let productNumbers = localStorage.getItem('cartNumbers');
            
                productNumbers = parseInt(productNumbers)               
            
                if (productNumbers) {
                    localStorage.setItem('cartNumbers', productNumbers + 1);
                    document.querySelector('span').textContent = productNumbers + 1;
                } else {
                    localStorage.setItem('cartNumbers', 1);
                    document.querySelector('span').textContent = 1;
                }

                //Ajouter les données du produit choisi dans le localStorage
                setItems(product);
            }
            
            //Fonction qui affiche les données du produit choisi sous format JSON
            function setItems(product) {

                //check s'il existe déjà des items dans le panier
                let cartItems = localStorage.getItem('productsInCart')
                cartItems = JSON.parse(cartItems)
                
                //console.log(cartItems);
                
                if (cartItems != null) { 
                    if ( cartItems[product.name] == null) {
                        cartItems = {
                            ...cartItems,
                            [product.name]: product
                        }
                    }
                    cartItems[product.name].inCart += 1 ;
                    console.log(cartItems[product.name].inCart);
                    
                } else { //Première fois que je clique
                    
                    product.inCart = 1;
                    cartItems = {
                        [product.name]: product //Pareil que "Arnold"
                    }
                }
                
                localStorage.setItem("productsInCart", JSON.stringify(cartItems))
                
            }           

            //Fonction qui affiche le prix total et le stock dans localStorage
            function totalCost(product) {

                console.log("Le prix du produit est", product.price);

                let cartCost = localStorage.getItem('totalCost')
                
                if(cartCost != null) {

                    cartCost = parseInt(cartCost) //cartCost est string il faut le convertir en number
                    localStorage.setItem("totalCost", cartCost + product.price) 

                } else {
                    localStorage.setItem('totalCost', product.price)
                }
            }
            onLoadCartnumbers()
        }

        catch {

        }
    })
    .catch((err => console.log('Erreur ' + err)));
}

addToCart()

