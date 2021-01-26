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
            <a id="productLink" href="/produit.html?id=${product._id}">
                    <img id="productImage" src="${product.imageUrl}" height="auto"/>
                    <h2 id="productName">${product.name}</h2>
                    <h3 id="productPrice">${(product.price) / 100 + ".00 €"}</h3>
                    <input type="button" onclick="location.href='panier.html'" value="Ajouter au panier"/>
            </a>
            `
        })
    }
        catch {
                
    }
}) 
.catch ((err => console.log('Erreur ' + err)))
}
showProducts()



