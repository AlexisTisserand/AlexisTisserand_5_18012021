//quand je CLIQUE sur une IMAGE
    //ALORS la page produit s'ouvre  grâce à l'ID du produit dans l'URL

//Récupérer l'URL et l'ID produit

const urlActuelle = window.location.href
console.log(urlActuelle);

const productUrl = new URL(urlActuelle)
const productId = productUrl.searchParams.get("id")
console.log(productId); //Affiche l'ID de l'url du produit sur lequel j'ai cliqué




import { api } from "./api.js";

//fetch
function displayProduct() {
    api.fetchEndPoint(`http://localhost:3000/api/teddies/${productId}`)
        .then(productDatas => {
            try {
                const productName = document.getElementById('productName')
                const productImage = document.getElementById('productImage')
                const productDescription = document.getElementById('productDescription')
                const productColors = document.getElementById('productColors')
                const productPrice = document.getElementById('productPrice')

                productName.innerHTML = productDatas.name
                productImage.src = productDatas.imageUrl;
                productDescription.innerText = productDatas.description;
                productColors.innerText = productDatas.colors;
                productPrice.innerText = `${(productDatas.price) / 100 + ".00€"}`;        
            }

            catch {
            }
        })
        .catch((err => console.log('Erreur ' + err)));
}

displayProduct()





/*console.log(productDatas);
productDatasList.innerHTML +=
`
<img id="productImage" src="${productDatas.imageUrl}">
<div id="description">
<h2 id="productName">${productDatas.name}</h2>
<h3 id="productDescription">${productData.description}</h3>
</div>
<div id="choix">
<div id="productColors"></div>
<input id="addToCart" type="button" onclick="location.href='panier.html'" value="Ajouter au panier"></button>
</div>

`;
}*/