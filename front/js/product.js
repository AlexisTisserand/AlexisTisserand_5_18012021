import {api} from "./api.js";

let addedToCart = document.getElementById('form-add-product');
let modal = document.getElementById("myModal");
let cartItems = localStorage.getItem("productsInCart");
cartItems = JSON.parse(cartItems);

//Récupérer l'URL et l'ID produit
const urlActuelle = window.location.href;
const productUrl = new URL(urlActuelle);
const productId = productUrl.searchParams.get("id");

//Fonction displayProduct() qui affiche la page produit du produit sélectionné en effectuant un appel fetch de l'url du produit. 
function displayProduct() {
    api.fetchEndPoint(`http://localhost:3000/api/teddies/${productId}`)
        .then(product => {

            const productName = document.getElementById('productName');
            const productImage = document.getElementById('productImage');
            const productDescription = document.getElementById('productDescription');
            const productColors = document.getElementById('productColors');
            const productPrice = document.getElementById('productPrice');

            //MISE EN PLACE SELECT COLOR
            //Incorpore un select avec pour option les couleurs du produit choisi
            const selectColor = document.getElementById('selectColor');
            
            productColors.appendChild(selectColor);

            for(let i = 0; i < product.colors.length; i++) {
                let choiceColor = document.createElement('option');
                choiceColor.setAttribute("value", product.colors[i]);
                selectColor.appendChild(choiceColor);
                choiceColor.innerHTML = product.colors[i];
            }

            productName.innerHTML = product.name;
            productImage.src = product.imageUrl;
            productPrice.innerText = `${(product.price) / 100 + ".00€"}`; 
            productDescription.innerText = product.description; 
        });
}
//Fait appraitre le modal sur la page produit lorsqu'on clique sur ajouter au panier
function initModal() {
    
    let spanCloseModal = document.getElementsByClassName("close")[0];

    spanCloseModal.onclick = () => {
        modal.style.display = "none";
    };
    window.onclick = event => {
        if(event.target == modal) {
            modal.style.display = "none";
        }
    };
}

//Fonction addToCart() qui permet d'ajouter un produit au panier. Appelle la fonction cartNumbers() et totalCost(). Si la requête fetch n'aboutit pas, fait apparaitre la page erreur 404
// Initialise product.inCart et le met à 0
// Tant que l'utilisateur n'ajoute pas de produit au panier, le modal est en display none.
function addToCart() {
    api.fetchEndPoint(`http://localhost:3000/api/teddies/${productId}`)
    .then(product => {
        product.inCart = 0;
        cartNumbers(product);
        totalCost(product);
        modal.style.display = "block";
        let teddyName = document.getElementById("teddy-name-modal");
        teddyName.innerText = " " + product.name;
    });
}

 //Quand on recharge la page le panier reste à jour
function onLoadCartnumbers () {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.productNumbers').textContent = productNumbers;
    }
}

//Fonction qui affiche le nombre de produits dans le panier et qui crée une key dans le localStorage ("productNumbers"). Les données du produit en question sont rajoutées grâce à la fonction setItems(), appelée dans cette fonction.
//S'il existe déjà un produit dans le localStorage alors on stocke dans le localStorage la key "cartNumbers" qui correspond au nombre de produits dans le panier et on lui rajoute 1.
//S'il n'y a aucun produits dans le panier alors on stocke dans le localStorage le key "cartNumbers" et on lui assène la valeur de 1.
function cartNumbers (product) {

    //console.log("Le produit envoyé au panier est", product.name); //Affiche le produit que j'ai choisi
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);            

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.productNumbers').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.productNumbers').textContent = 1;
    }

    //Ajouter les données du produit choisi dans le localStorage
    setItems(product);
}

//Fonction qui affiche les données du produit choisi sous format JSON
//S'il existe des produits dans le localStorage alors cartItems devient un objet JSON. On utilise les paramètres du reste (...) pour représenter les arguments sous forme d'un tableau et on rajoute + 1 à inCart du produit sélectionné
//S'il n'existe aucun produit dans le panier alors on initialise la valeur inCart du produit à 1
function setItems(product) {

    //check s'il existe déjà des items dans le panier
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if (cartItems != null) { 
        if ( cartItems[product.name] == null) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            };
        }
        cartItems[product.name].inCart += 1 ;
       //console.log(cartItems[product.name].inCart);
        
    } else { //Première fois que je clique
        
        product.inCart = 1;
        cartItems = {
            [product.name]: product //Pareil que "Arnold"
        };
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    
}           

//Fonction qui affiche le prix total et le stock dans localStorage
function totalCost(product) {

    console.log("Le prix du produit est", product.price);

    let cartCost = localStorage.getItem('totalCost');
    
    if(cartCost != null) {
        cartCost = parseInt(cartCost); //cartCost est string il faut le convertir en number
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {
        localStorage.setItem('totalCost', product.price);
    }
}
//Lorsque l'action submit est provoquée par le click de l'utilisateur sur le bouton alors la fonction addToCart() est lancée et le produit est envoyé au panier
addedToCart.addEventListener('submit', (e) => {
    e.preventDefault();
    addToCart();
});

displayProduct();
initModal();
onLoadCartnumbers();