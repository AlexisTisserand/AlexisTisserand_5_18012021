import {api} from "./api.js";

let addedToCart = document.getElementById('addToCart')

//Récupérer l'URL et l'ID produit

const urlActuelle = window.location.href;
const productUrl = new URL(urlActuelle);
const productId = productUrl.searchParams.get("id");

//fetch
export function cart() {
    api.fetchEndPoint(`http://localhost:3000/api/teddies/${productId}`)
    .then(product => {
        //console.log(product);
        try {
            addedToCart.addEventListener('click', () => {
                cartNumbers(product)
                totalCost(product)
            })
                    
            //Quand on recharge la page le panier reste à jour
            function onLoadCartnumbers () {
                let productNumbers = localStorage.getItem('cartNumbers');
            
                if(productNumbers) {
                    document.querySelector('.navbar-cart--icon span').textContent = productNumbers;
                }
            }
            
            //Fonction qui affiche le nombre de produits dans le panier
            function cartNumbers () {

                console.log("Le produit envoyé au panier est", product); //Affiche le produit que j'ai choisi
                let productNumbers = localStorage.getItem('cartNumbers');
            
                productNumbers = parseInt(productNumbers)
            
                if (productNumbers) {
                    localStorage.setItem('cartNumbers', productNumbers + 1);
                    document.querySelector('.navbar-cart--icon span').textContent = productNumbers + 1;
                } else {
                    localStorage.setItem('cartNumbers', 1);
                    document.querySelector('.navbar-cart--icon span').textContent = 1;
                }

                //Ajouter les données du produit choisi dans le localStorage
                setItems(product);
            }
            
            //Fonction qui affiche les données du produit choisi sous format JSON
            function setItems(product) {

                let cartItems = localStorage.getItem("productsInCart")
                cartItems = JSON.parse(cartItems)

                
                    if(cartItems !== null && cartItems[product.name] !== undefined) {
                        cartItems = {
                            ...cartItems, //Conserver les autres données produits
                            [product.name]: product
                        }
                    cartItems[product.name].inCart += 1
                    } else {
                        product.inCart = 1;
                        cartItems = {
                            ...cartItems,
                            [product.name]: product
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

cart()




