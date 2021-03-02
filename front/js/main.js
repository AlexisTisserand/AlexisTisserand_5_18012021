import {api} from "./api.js";

const productList = document.getElementById('productList');

//Constante qui correspond à l'url de l'Api sur laquelle on souhaite utiliser fetch()
const url = `http://localhost:3000/api/teddies/`;

//Fonction showProducts() qui permet de faire apparaitre les différents produits de l'Api si la requête fetch() a fonctionné et renvoie erreur 404 si échec
const showProducts = () => {
    api.fetchEndPoint(url)
    .then(products => {
        products.forEach(product => {

        productList.innerHTML += 
            `
            <div class="container page-wrapper">
                <div class="page-inner">
                    <div class="row">
                        <div class="el-wrapper">
                            <div class="box-up">
                            <img class="card-img-product" src="${product.imageUrl}" width="100%">
                            <div class="img-info">
                                <div class="info-inner">
                                <span class="p-name">${product.name}</span>
                                
                                </div>
                                <div class="a-size">Couleurs disponibles : <span class="size">${product.colors}</span></div>
                            </div>
                        </div>

                        <div class="box-down">
                            <div class="h-bg">
                                <div class="h-bg-inner"></div>
                            </div>

                            <a class="cart" href="/produit.html?id=${product._id}">
                                <span class="price-product">${(product.price) / 100 + ".00 €"}</span>
                                <span class="add-to-cart">
                                <span class="txt">En savoir plus</span>
                                </span>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            `;
        });
    });
};
showProducts();

//Quand on recharge la page le panier reste à jour
//Récupère le nombre de produits dans le panier et affiche son nombre dans la span prévue à cet effet ("panier")
function onLoadCartnumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.productNumbers').innerHTML = productNumbers;
    }
}

onLoadCartnumbers();
