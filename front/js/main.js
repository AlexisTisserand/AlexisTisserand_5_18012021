import {api} from "./api.js"

const productList = document.getElementById('productList')

//Requete API
const url = `http://localhost:3000/api/teddies`;

//FONCTION POUR MONTRER LES PRODUITS

const showProducts = () => {
    api.fetchEndPoint(url)
    .then(products => {
        try {
        console.log(products);
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
        
            `
        })
    }
        catch {
                
    }
}) 
.catch ((err => console.log('Erreur ' + err)))
}
showProducts()

//Quand on recharge la page le panier reste à jour
function onLoadCartnumbers () {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('span').innerHTML = productNumbers;
    }
}

onLoadCartnumbers()
