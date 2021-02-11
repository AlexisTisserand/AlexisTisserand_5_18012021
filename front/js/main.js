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
            /*<section class="product">
            <div class="product__photo">
                <div class="photo-container">
                    <div class="photo-main">
                        <img src="${product.imageUrl}">
                    </div>
                </div>
            </div>
            <div class="product__info">
                <div class="title">
                    <h1>${product.name}</h1>
                    <span>Ref : ${product._id}</span>
                </div>
                <div class="price">
                    Prix <span>${(product.price) / 100 + ".00€"}</span>
                </div>
                <div class="variant">
                    <h3>DIFFÉRENTES COULEURS</h3>
                    <ul>
                        <li>${product.colors}
                    </ul>
                </div>
                <div class="description">
                    <h3>Description</h3>
                    <p>${product.description}</p>
                </div>
                    <button id="addToCart" class="learn-more">
                    <a id="productLink" href="/produit.html?id=${product._id}">
                        <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">EN SAVOIR PLUS</span>
                        </a>
                    </button>
                </div>
        </section>*/

            /*A VOIR SI ON PREND LUI OU PAS POUR LA PAGE D'ACCUEIL
            <a id="productLink" href="/produit.html?id=${product._id}">
                <img id="productImage" src="${product.imageUrl}" height="auto" alt="${product.description}" class="cover"/>
                <h2 id="productName">${product.name}</h2>
                <h3 id="productPrice">${(product.price) / 100 + ".00 €"}</h3>
                <div id="more-infos">
                    <button id="addToCart" class="learn-more">
                        <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">EN SAVOIR PLUS</span>
                    </button>
                </div>
            </a>*/
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
        document.querySelector('.navbar-cart--icon span').innerHTML = productNumbers;
    }
}

onLoadCartnumbers()




/*
`
<a id="productLink" href="/produit.html?id=${product._id}">
    <img id="productImage" src="${product.imageUrl}" height="auto" alt="${product.description}/>
    <h2 id="productName">${product.name}</h2>
    <h3 id="productPrice">${(product.price) / 100 + ".00 €"}</h3>
</a>
    <a href="#" id="addToCart">Ajouter au panier</a>
*/